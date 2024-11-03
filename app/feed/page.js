"use client";
import { useState } from "react";
import Image from "next/image";
import FeedItem from "@/components/social/FeedItem";
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
  const [activeTab, setActiveTab] = useState("following");
  const [showPostModal, setShowPostModal] = useState(false);

  // Mock user achievements
  const userAchievements = {
    level: 12,
    metalPoints: 2450,
    badges: [
      {
        id: 1,
        name: "Early Adopter",
        icon: "🌟",
        description: "Joined during platform launch",
      },
      {
        id: 2,
        name: "Trading Pro",
        icon: "💎",
        description: "Completed 100 successful trades",
      },
      {
        id: 3,
        name: "Community Leader",
        icon: "👑",
        description: "Helped 50 members",
      },
    ],
    recentMilestones: [
      {
        id: 1,
        title: "Reached Level 10",
        reward: "250 Metal Points",
        date: "2 days ago",
      },
      {
        id: 2,
        title: "100th Trade",
        reward: "Exclusive Badge",
        date: "1 week ago",
      },
    ],
  };

  // Mock feed items
  const feedItems = [
    {
      id: 1,
      type: "achievement",
      user: {
        name: "John Smith",
        username: "johnsmith",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        verified: true,
      },
      achievement: "Gold Trader Status Achieved! 🏆",
      description: "Completed 100 successful trades with perfect feedback",
      timestamp: "2h ago",
      likes: 124,
      comments: 18,
      metalPoints: 500,
    },
    {
      id: 2,
      type: "listing",
      user: {
        name: "Silver Expert",
        username: "silverexpert",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        verified: true,
      },
      title: "1oz Silver Eagle MS70",
      price: 75.0,
      image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
      timestamp: "3h ago",
      likes: 45,
      comments: 8,
      metalPoints: 100,
    },
    {
      id: 3,
      type: "market_update",
      user: {
        name: "Market Analyst",
        username: "analyst",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        verified: true,
      },
      title: "Gold Hits New High",
      content: "Gold prices surge to record levels amid market uncertainty...",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      timestamp: "4h ago",
      likes: 256,
      comments: 42,
      metalPoints: 150,
    },
  ];

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
                Level {userAchievements.level}
              </h2>
              <div className="text-[#FFD700]">
                {userAchievements.metalPoints} Metal Points
              </div>
            </div>

            {/* Progress to Next Level */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-[#C0C0C0]/60 mb-2">
                <span>Progress to Level {userAchievements.level + 1}</span>
                <span>75%</span>
              </div>
              <div className="h-2 bg-[#333333] rounded-full">
                <div className="h-full w-3/4 bg-[#4169E1] rounded-full"></div>
              </div>
            </div>

            {/* Recent Badges */}
            <div className="space-y-4">
              <h3 className="text-[#FFD700] font-semibold">Recent Badges</h3>
              {userAchievements.badges.map((badge) => (
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
          <div className="space-y-6">
            {feedItems.map((item) => (
              <FeedItem key={item.id} item={item} />
            ))}
          </div>
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
