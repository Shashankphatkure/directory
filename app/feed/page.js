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

export default function FeedPage() {
  const { session } = useSupabase();
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

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setFeedItems(getDemoFeedItems());
      setIsLoading(false);
    }, 1000);
  }, [activeTab]);

  const getDemoFeedItems = () => {
    const demoItems = [
      {
        id: 1,
        type: "image",
        user: {
          id: "user1",
          name: "Sarah Johnson",
          username: "silverguru",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          verified: true,
        },
        content:
          "Just received my latest silver delivery! Check out these beautiful American Eagles 🦅",
        mediaUrl:
          "https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1",
        timestamp: "2 hours ago",
        likes: 142,
        comments: 23,
        isLiked: false,
        metalPoints: 100,
      },
      {
        id: 2,
        type: "video",
        user: {
          id: "user2",
          name: "Michael Chen",
          username: "metaltrader",
          avatar:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
          verified: true,
        },
        content:
          "New video! Breaking down this week's gold market analysis and price predictions 📈",
        mediaUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail:
          "https://images.unsplash.com/photo-1610375461246-83df859d849d",
        timestamp: "5 hours ago",
        likes: 89,
        comments: 12,
        isLiked: true,
        metalPoints: 75,
      },
      {
        id: 3,
        type: "link",
        user: {
          id: "user3",
          name: "Emma Davis",
          username: "preciousmetals",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
          verified: false,
        },
        content:
          "Great article on the future of platinum in the green energy sector. Must read! 💫",
        link: {
          url: "https://example.com/platinum-analysis",
          title: "Platinum's Role in Green Energy Revolution",
          description:
            "Analysis of platinum demand in hydrogen fuel cells and renewable energy",
          image: "https://images.unsplash.com/photo-1578256415817-4d3d49418e4e",
        },
        timestamp: "1 day ago",
        likes: 234,
        comments: 45,
        isLiked: false,
        metalPoints: 150,
      },
      {
        id: 4,
        type: "status",
        user: {
          id: "user4",
          name: "Alex Thompson",
          username: "goldstacker",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
          verified: true,
        },
        content:
          "Just hit my yearly gold accumulation goal! 🎯 Remember folks: it's not about timing the market, it's about time IN the market. #Gold #Investment",
        timestamp: "2 days ago",
        likes: 167,
        comments: 28,
        isLiked: true,
        metalPoints: 90,
      },
      {
        id: 5,
        type: "image",
        user: {
          id: "user5",
          name: "Jessica Williams",
          username: "silverstack",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
          verified: true,
        },
        content:
          "My silver stack organization system! Swipe for before/after 📦✨",
        mediaUrl:
          "https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1",
        additionalImages: [
          "https://images.unsplash.com/photo-1589656966895-2f33e7653819",
          "https://images.unsplash.com/photo-1589656966895-2f33e7653819",
        ],
        timestamp: "3 days ago",
        likes: 321,
        comments: 56,
        isLiked: false,
        metalPoints: 85,
      },
      {
        id: 6,
        type: "link",
        user: {
          id: "user6",
          name: "Robert Chen",
          username: "metalmarket",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          verified: true,
        },
        content:
          "My latest market research report is out! Deep dive into silver industrial demand 🔍",
        link: {
          url: "https://example.com/silver-research",
          title: "Silver Industrial Demand 2024 Outlook",
          description:
            "Comprehensive analysis of silver's industrial applications and market trends",
          image: "https://images.unsplash.com/photo-1578255321543-cd4a6ca5271c",
        },
        timestamp: "4 days ago",
        likes: 198,
        comments: 34,
        isLiked: true,
        metalPoints: 120,
      },
    ];

    // Filter based on activeTab
    if (activeTab === "trending") {
      return [...demoItems].sort(
        (a, b) => b.likes + b.comments - (a.likes + a.comments)
      );
    } else if (activeTab === "recent") {
      return demoItems.reverse();
    }
    return demoItems;
  };

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

  // Function to create a new post
  const createPost = async (postData) => {
    try {
      const { data, error } = await supabase
        .from("feed_posts")
        .insert([
          {
            user_id: session.user.id,
            ...postData,
          },
        ])
        .select();

      if (error) throw error;

      // Refresh feed items
      fetchFeedItems();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Function to handle post creation
  const handleCreatePost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create new post object
      const newPost = {
        id: feedItems.length + 1,
        type: postType,
        user: {
          id: "current_user",
          name: "Current User",
          username: "currentuser",
          avatar: currentUser?.avatar || "/default-avatar.png",
          verified: false,
        },
        content: postContent,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        isLiked: false,
        metalPoints: 0,
      };

      // Add type-specific data
      if (postType === "image" && postMedia) {
        newPost.mediaUrl = URL.createObjectURL(postMedia);
      } else if (postType === "video" && postMedia) {
        newPost.mediaUrl = URL.createObjectURL(postMedia);
        newPost.thumbnail = "/video-thumbnail.jpg"; // You'd want to generate this
      } else if (postType === "link") {
        newPost.link = postLink;
      }

      // Add to feed items
      setFeedItems([newPost, ...feedItems]);

      // Reset form
      setPostContent("");
      setPostMedia(null);
      setPostLink({ url: "", title: "", description: "" });
      setShowPostModal(false);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
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
