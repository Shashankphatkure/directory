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

export default function FeedPage() {
  const { supabase, session } = useSupabase();
  const [activeTab, setActiveTab] = useState("following");
  const [showPostModal, setShowPostModal] = useState(false);
  const [feedItems, setFeedItems] = useState([]);
  const [userAchievements, setUserAchievements] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchUserAchievementsAndAwards();
      fetchFeedItems();
    }
  }, [session, activeTab]);

  const fetchUserAchievementsAndAwards = async () => {
    try {
      // Fetch user achievements
      const { data: achievements, error: achievementsError } = await supabase
        .from("user_achievements")
        .select("*")
        .eq("user_id", session.user.id)
        .order("awarded_at", { ascending: false });

      if (achievementsError) throw achievementsError;

      // Fetch user awards
      const { data: awards, error: awardsError } = await supabase
        .from("user_awards")
        .select("*")
        .eq("user_id", session.user.id)
        .order("awarded_at", { ascending: false });

      if (awardsError) throw awardsError;

      // Calculate total achievements/awards for level
      const totalCount = (achievements?.length || 0) + (awards?.length || 0);
      const level = Math.floor(totalCount / 5) + 1; // Adjust the division number as needed

      // Calculate metal points (you may want to adjust this logic)
      const metalPoints = achievements.reduce((total, achievement) => {
        // Add points based on achievement type
        switch (achievement.achievement_type) {
          case "TRADE":
            return total + 100;
          case "SOCIAL":
            return total + 50;
          default:
            return total + 25;
        }
      }, 0);

      setUserAchievements({
        level: level,
        metalPoints: metalPoints,
        badges:
          awards?.map((award) => ({
            id: award.id,
            name: award.name,
            icon: award.icon,
            description: award.description || "Achievement unlocked!",
            awarded_at: award.awarded_at,
          })) || [],
        recentMilestones:
          achievements?.slice(0, 3).map((achievement) => ({
            id: achievement.id,
            title: achievement.title,
            description: achievement.description,
            icon: achievement.icon,
            awarded_at: achievement.awarded_at,
          })) || [],
      });
    } catch (error) {
      console.error("Error fetching user achievements:", error);
    }
  };

  const fetchFeedItems = async () => {
    try {
      setIsLoading(true);
      let query = supabase.from("user_achievements").select(`
          *,
          profiles:user_id (
            id,
            email,
            username,
            full_name,
            avatar_url
          ),
          post_likes(count),
          post_comments(count)
        `);

      // Apply filters based on active tab
      if (activeTab === "following") {
        // Get list of users that the current user follows
        const { data: followingData } = await supabase
          .from("follows")
          .select("following_id")
          .eq("follower_id", session.user.id);

        const followingIds = followingData?.map((f) => f.following_id) || [];

        // Include current user's ID to see their own posts
        followingIds.push(session.user.id);

        query = query.in("user_id", followingIds);
      } else if (activeTab === "trending") {
        // Order by engagement (likes + comments)
        query = query
          .order("post_likes(count)", { ascending: false })
          .order("post_comments(count)", { ascending: false });
      } else {
        // "recent" tab
        query = query.order("awarded_at", { ascending: false });
      }

      const { data, error } = await query.limit(10);

      if (error) throw error;

      const formattedFeedItems = await Promise.all(
        data.map(async (item) => {
          // Get like status for current user
          const { data: likeData } = await supabase
            .from("post_likes")
            .select("id")
            .eq("post_id", item.id)
            .eq("user_id", session.user.id)
            .single();

          // Get comment count
          const { count: commentCount } = await supabase
            .from("post_comments")
            .select("id", { count: true })
            .eq("post_id", item.id);

          return {
            id: item.id,
            type: "achievement",
            user: {
              id: item.profiles.id,
              name: item.profiles.full_name,
              username: item.profiles.username,
              avatar: item.profiles.avatar_url,
              verified: item.profiles.is_verified || false,
            },
            achievement: item.title,
            description: item.description,
            timestamp: toRelativeTime(item.awarded_at),
            likes: item.post_likes?.[0]?.count || 0,
            comments: commentCount || 0,
            isLiked: !!likeData,
            metalPoints: getPointsForAchievement(item.achievement_type),
          };
        })
      );

      setFeedItems(formattedFeedItems);
    } catch (error) {
      console.error("Error fetching feed items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (itemId) => {
    try {
      const { data: existingLike } = await supabase
        .from("post_likes")
        .select("id")
        .eq("post_id", itemId)
        .eq("user_id", session.user.id)
        .single();

      if (existingLike) {
        // Unlike
        await supabase.from("post_likes").delete().eq("id", existingLike.id);
      } else {
        // Like
        await supabase.from("post_likes").insert({
          post_id: itemId,
          user_id: session.user.id,
        });
      }

      // Refresh feed items
      fetchFeedItems();
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleComment = async (itemId, content) => {
    try {
      await supabase.from("post_comments").insert({
        post_id: itemId,
        user_id: session.user.id,
        content,
      });

      // Refresh feed items
      fetchFeedItems();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // Helper function to determine points based on achievement type
  const getPointsForAchievement = (type) => {
    const pointsMap = {
      TRADE: 100,
      SOCIAL: 50,
      BADGE: 75,
      MILESTONE: 150,
      DEFAULT: 25,
    };
    return pointsMap[type] || pointsMap.DEFAULT;
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
    </div>
  );
}
