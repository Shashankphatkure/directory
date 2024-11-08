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
  const { session } = useSupabase();
  const [activeTab, setActiveTab] = useState("following");
  const [showPostModal, setShowPostModal] = useState(false);
  const [feedItems, setFeedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        type: "achievement",
        user: {
          id: "user1",
          name: "Sarah Johnson",
          username: "silverguru",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          verified: true,
        },
        achievement: "Gold Trading Master",
        description:
          "Just completed my 100th gold trade! 🎉 The market's been volatile but holding strong. #PreciousMetals #Trading",
        timestamp: "2 hours ago",
        likes: 142,
        comments: 23,
        isLiked: false,
        metalPoints: 100,
      },
      {
        id: 2,
        type: "achievement",
        user: {
          id: "user2",
          name: "Michael Chen",
          username: "metaltrader",
          avatar:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
          verified: true,
        },
        achievement: "Silver Stack Milestone",
        description:
          "Hit 1000 oz of silver in my portfolio! 🥈 Remember: slow and steady wins the race. #SilverStacking",
        timestamp: "5 hours ago",
        likes: 89,
        comments: 12,
        isLiked: true,
        metalPoints: 75,
      },
      {
        id: 3,
        type: "achievement",
        user: {
          id: "user3",
          name: "Emma Davis",
          username: "preciousmetals",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
          verified: false,
        },
        achievement: "First Platinum Purchase",
        description:
          "Finally took the plunge into platinum! 💫 The industrial demand looks promising. What do you all think? #Platinum #Investment",
        timestamp: "1 day ago",
        likes: 234,
        comments: 45,
        isLiked: false,
        metalPoints: 150,
      },
      {
        id: 4,
        type: "achievement",
        user: {
          id: "user4",
          name: "Alex Thompson",
          username: "goldstacker",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
          verified: true,
        },
        achievement: "Market Analysis Expert",
        description:
          "Just published my 50th market analysis report! 📊 Check out my latest thoughts on the gold/silver ratio. #Analysis #PreciousMetals",
        timestamp: "2 days ago",
        likes: 167,
        comments: 28,
        isLiked: true,
        metalPoints: 90,
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
