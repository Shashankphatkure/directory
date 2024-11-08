"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import FeedItem from "@/components/social/FeedItem";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import {
  TrophyIcon,
  FireIcon,
  SparklesIcon,
  PlusIcon,
  PhotoIcon,
  VideoCameraIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";

export default function FeedPage() {
  const { supabase, session } = useSupabase();
  const [activeTab, setActiveTab] = useState("following");
  const [showPostModal, setShowPostModal] = useState(false);
  const [feedItems, setFeedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postType, setPostType] = useState("status");
  const [postContent, setPostContent] = useState("");
  const [postMedia, setPostMedia] = useState(null);
  const [postLink, setPostLink] = useState({
    url: "",
    title: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Demo user achievements data
  const [userAchievements] = useState({
    level: 12,
    metalPoints: 3450,
    badges: [
      {
        id: 1,
        name: "Silver Trader",
        icon: "🥈",
        description: "Completed 50 silver trades",
        awarded_at: "2024-03-15",
      },
      {
        id: 2,
        name: "Gold Pioneer",
        icon: "🏆",
        description: "First gold purchase",
        awarded_at: "2024-03-10",
      },
      {
        id: 3,
        name: "Community Leader",
        icon: "⭐",
        description: "100+ helpful comments",
        awarded_at: "2024-03-05",
      },
    ],
  });

  // Function to upload media to Supabase storage
  const uploadMedia = async (file) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${session.user.id}/${fileName}`;

      const { data, error } = await supabase.storage
        .from("post-media")
        .upload(filePath, file);

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("post-media").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  // Function to create a new post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let mediaUrl = null;
      let thumbnailUrl = null;

      // Handle media upload if present
      if (postMedia) {
        try {
          mediaUrl = await uploadMedia(postMedia);

          // For videos, use the first frame as thumbnail
          if (postType === "video") {
            thumbnailUrl = mediaUrl;
          }
        } catch (error) {
          console.error("Media upload error:", error);
          alert("Error uploading media. Please try again.");
          return;
        }
      }

      // Create post object
      const postData = {
        user_id: session.user.id,
        content: postContent,
        type: postType,
        media_url: mediaUrl,
        thumbnail_url: thumbnailUrl,
      };

      // Add link data if it's a link post
      if (postType === "link") {
        postData.link_url = postLink.url;
        postData.link_title = postLink.title;
        postData.link_description = postLink.description;
        postData.link_image = postLink.image;
      }

      // Insert into database
      const { data: newPost, error: insertError } = await supabase
        .from("posts")
        .insert([postData])
        .select(
          `
          *,
          profiles!posts_user_id_fkey (
            id,
            username,
            full_name,
            avatar_url,
            is_verified
          )
        `
        )
        .single();

      if (insertError) {
        console.error("Database insert error:", insertError);
        throw new Error(insertError.message);
      }

      if (!newPost) {
        throw new Error("No post data returned");
      }

      // Format the new post for the feed
      const formattedPost = {
        id: newPost.id,
        type: newPost.type,
        user: {
          id: newPost.profiles.id,
          name: newPost.profiles.full_name,
          username: newPost.profiles.username,
          avatar: newPost.profiles.avatar_url,
          verified: newPost.profiles.is_verified,
        },
        content: newPost.content,
        mediaUrl: newPost.media_url,
        thumbnail: newPost.thumbnail_url,
        link:
          newPost.type === "link"
            ? {
                url: newPost.link_url,
                title: newPost.link_title,
                description: newPost.link_description,
                image: newPost.link_image,
              }
            : null,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        isLiked: false,
      };

      // Add to feed items
      setFeedItems([formattedPost, ...feedItems]);

      // Reset form
      setPostContent("");
      setPostMedia(null);
      setPostLink({ url: "", title: "", description: "" });
      setShowPostModal(false);
    } catch (error) {
      console.error("Error creating post:", error);
      alert(`Error creating post: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to fetch posts from database
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from("posts")
        .select(
          `
          *,
          profiles!posts_user_id_fkey (
            id,
            username,
            full_name,
            avatar_url,
            is_verified
          ),
          post_likes(count),
          post_comments(count)
        `
        )
        .order("created_at", { ascending: false });

      // Apply filters based on active tab
      if (activeTab === "following") {
        // First get the following IDs
        const { data: followingData, error: followingError } = await supabase
          .from("follows")
          .select("following_id")
          .eq("follower_id", session.user.id);

        if (followingError) throw followingError;

        // Get the array of following IDs and include the user's own ID
        const followingIds = [
          ...(followingData?.map((f) => f.following_id) || []),
          session.user.id,
        ];

        // Filter posts by these user IDs
        query = query.in("user_id", followingIds);
      }

      const { data, error } = await query.limit(20);

      if (error) throw error;

      // Format posts for the feed
      const formattedPosts = data.map((post) => ({
        id: post.id,
        type: post.type,
        user: {
          id: post.profiles.id,
          name: post.profiles.full_name,
          username: post.profiles.username,
          avatar: post.profiles.avatar_url,
          verified: false,
        },
        content: post.content,
        mediaUrl: post.media_url,
        thumbnail: post.thumbnail_url,
        link:
          post.type === "link"
            ? {
                url: post.link_url,
                title: post.link_title,
                description: post.link_description,
                image: post.link_image,
              }
            : null,
        timestamp: new Date(post.created_at).toLocaleDateString(),
        likes: post.post_likes?.[0]?.count || 0,
        comments: post.post_comments?.[0]?.count || 0,
        isLiked: false, // You'll need to check this against current user
      }));

      setFeedItems(formattedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch posts when tab changes
  useEffect(() => {
    if (session?.user) {
      fetchPosts();
    }
  }, [session, activeTab]);

  const handleLike = async (itemId) => {
    setFeedItems(
      feedItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            isLiked: !item.isLiked,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1,
          };
        }
        return item;
      })
    );
  };

  const handleComment = async (itemId, content) => {
    setFeedItems(
      feedItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            comments: item.comments + 1,
          };
        }
        return item;
      })
    );
  };

  // Function to handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostMedia(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Sidebar - User Stats */}
        <div className="lg:col-span-3">
          <div className="card p-6 sticky top-24">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FFD700]/10 mb-4">
                <TrophyIcon className="h-10 w-10 text-[#FFD700]" />
              </div>
              <h2 className="text-xl font-bold text-[#C0C0C0]">
                Level {userAchievements?.level}
              </h2>
              <div className="text-[#FFD700]">
                {userAchievements?.metalPoints} Metal Points
              </div>
            </div>

            {/* Progress to Next Level */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-[#C0C0C0]/60 mb-2">
                <span>Progress to Level {userAchievements?.level + 1}</span>
                <span>75%</span>
              </div>
              <div className="h-2 bg-[#333333] rounded-full">
                <div className="h-full w-3/4 bg-[#4169E1] rounded-full"></div>
              </div>
            </div>

            {/* Recent Badges */}
            <div className="space-y-4">
              <h3 className="text-[#FFD700] font-semibold">Recent Badges</h3>
              {userAchievements?.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 p-3 bg-[#333333] rounded-lg"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <div className="text-[#C0C0C0] font-medium">
                      {badge.name}
                    </div>
                    <div className="text-sm text-[#C0C0C0]/60">
                      {badge.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-6">
          {/* Create Post */}
          <div className="card p-4 mb-8">
            <div className="flex gap-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="Your avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                onClick={() => setShowPostModal(true)}
                className="flex-1 bg-[#333333] text-[#C0C0C0]/60 rounded-lg px-4 py-2 text-left hover:bg-[#333333]/80 transition-colors"
              >
                Share something with the community...
              </button>
            </div>
            <div className="flex gap-4 mt-4 border-t border-[#C0C0C0]/20 pt-4">
              <button className="flex items-center gap-2 text-[#C0C0C0]/60 hover:text-[#4169E1] transition-colors">
                <PhotoIcon className="h-5 w-5" />
                <span>Photo</span>
              </button>
              <button className="flex items-center gap-2 text-[#C0C0C0]/60 hover:text-[#4169E1] transition-colors">
                <VideoCameraIcon className="h-5 w-5" />
                <span>Video</span>
              </button>
              <button className="flex items-center gap-2 text-[#C0C0C0]/60 hover:text-[#4169E1] transition-colors">
                <LinkIcon className="h-5 w-5" />
                <span>Link</span>
              </button>
            </div>
          </div>

          {/* Feed Tabs */}
          <div className="flex gap-4 mb-8">
            {["following", "trending", "recent"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  activeTab === tab
                    ? "bg-[#4169E1] text-white"
                    : "text-[#C0C0C0] hover:bg-[#333333]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Feed Items */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card p-4 animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {feedItems.map((item) => (
                <FeedItem
                  key={item.id}
                  item={item}
                  onLike={() => handleLike(item.id)}
                  onComment={(content) => handleComment(item.id, content)}
                  currentUser={session?.user}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar - Trending & Leaderboard */}
        <div className="lg:col-span-3">
          <div className="space-y-6 sticky top-24">
            {/* Trending Topics */}
            <div className="card p-6">
              <h3 className="text-[#FFD700] font-semibold mb-4">
                Trending Topics
              </h3>
              <div className="space-y-3">
                {[
                  { tag: "#GoldRush", posts: "2.4k posts" },
                  { tag: "#SilverSqueeze", posts: "1.8k posts" },
                  { tag: "#PlatinumHands", posts: "956 posts" },
                ].map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-[#4169E1]">{topic.tag}</span>
                    <span className="text-sm text-[#C0C0C0]/60">
                      {topic.posts}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Traders */}
            <div className="card p-6">
              <h3 className="text-[#FFD700] font-semibold mb-4">Top Traders</h3>
              <div className="space-y-4">
                {[
                  { name: "GoldMaster", points: "12,450 MP", rank: 1 },
                  { name: "SilverKing", points: "10,280 MP", rank: 2 },
                  { name: "MetalPro", points: "9,875 MP", rank: 3 },
                ].map((trader, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#333333] flex items-center justify-center text-[#FFD700]">
                      #{trader.rank}
                    </div>
                    <div>
                      <div className="text-[#C0C0C0]">{trader.name}</div>
                      <div className="text-sm text-[#C0C0C0]/60">
                        {trader.points}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <Dialog
        open={showPostModal}
        onClose={() => setShowPostModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-[#1A1A1A] rounded-xl shadow-xl">
            <div className="border-b border-[#333333] p-4 flex items-center justify-between">
              <Dialog.Title className="text-lg font-semibold text-[#C0C0C0]">
                Create Post
              </Dialog.Title>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-[#C0C0C0]/60 hover:text-[#C0C0C0] transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-4 space-y-4">
              {/* Post Type Selector */}
              <div className="flex gap-2 border-b border-[#333333] pb-4">
                {[
                  {
                    type: "status",
                    icon: <PlusIcon className="h-5 w-5" />,
                    label: "Status",
                  },
                  {
                    type: "image",
                    icon: <PhotoIcon className="h-5 w-5" />,
                    label: "Photo",
                  },
                  {
                    type: "video",
                    icon: <VideoCameraIcon className="h-5 w-5" />,
                    label: "Video",
                  },
                  {
                    type: "link",
                    icon: <LinkIcon className="h-5 w-5" />,
                    label: "Link",
                  },
                ].map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setPostType(item.type)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
                      postType === item.type
                        ? "bg-[#4169E1] text-white"
                        : "text-[#C0C0C0]/60 hover:bg-[#333333]"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Post Content */}
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full h-32 bg-[#333333] rounded-lg px-4 py-2 text-[#C0C0C0] placeholder-[#C0C0C0]/60 focus:outline-none focus:ring-2 focus:ring-[#4169E1] resize-none"
              />

              {/* Media Upload */}
              {(postType === "image" || postType === "video") && (
                <div className="space-y-2">
                  <input
                    type="file"
                    accept={postType === "image" ? "image/*" : "video/*"}
                    onChange={handleFileSelect}
                    className="hidden"
                    id="media-upload"
                  />
                  <label
                    htmlFor="media-upload"
                    className="block w-full p-4 border-2 border-dashed border-[#333333] rounded-lg text-center text-[#C0C0C0]/60 hover:border-[#4169E1] hover:text-[#4169E1] transition-colors cursor-pointer"
                  >
                    {postMedia ? (
                      <span>Selected: {postMedia.name}</span>
                    ) : (
                      <span>Click to upload {postType}</span>
                    )}
                  </label>
                </div>
              )}

              {/* Link Input */}
              {postType === "link" && (
                <div className="space-y-2">
                  <input
                    type="url"
                    value={postLink.url}
                    onChange={(e) =>
                      setPostLink({ ...postLink, url: e.target.value })
                    }
                    placeholder="Enter URL"
                    className="w-full bg-[#333333] rounded-lg px-4 py-2 text-[#C0C0C0] placeholder-[#C0C0C0]/60 focus:outline-none focus:ring-2 focus:ring-[#4169E1]"
                  />
                  <input
                    type="text"
                    value={postLink.title}
                    onChange={(e) =>
                      setPostLink({ ...postLink, title: e.target.value })
                    }
                    placeholder="Link title"
                    className="w-full bg-[#333333] rounded-lg px-4 py-2 text-[#C0C0C0] placeholder-[#C0C0C0]/60 focus:outline-none focus:ring-2 focus:ring-[#4169E1]"
                  />
                  <textarea
                    value={postLink.description}
                    onChange={(e) =>
                      setPostLink({ ...postLink, description: e.target.value })
                    }
                    placeholder="Link description"
                    className="w-full h-20 bg-[#333333] rounded-lg px-4 py-2 text-[#C0C0C0] placeholder-[#C0C0C0]/60 focus:outline-none focus:ring-2 focus:ring-[#4169E1] resize-none"
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !postContent.trim()}
                  className="px-6 py-2 bg-[#4169E1] text-white rounded-lg hover:bg-[#4169E1]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
