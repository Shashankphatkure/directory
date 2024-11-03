"use client";
import { useState } from "react";
import FeedItem from "@/components/social/FeedItem";
import { PencilSquareIcon, PhotoIcon } from "@heroicons/react/24/outline";

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("following");

  // Mock feed data
  const feedItems = [
    {
      id: 1,
      type: "listing",
      title: "1oz Gold American Eagle 2024",
      price: 1950.0,
      discount: 5,
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      user: {
        name: "Gold Expert",
        username: "goldexpert",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      },
      timestamp: "2h ago",
      likes: 124,
      comments: 8,
      topComments: [
        { user: "silvertrader", text: "Great price!" },
        { user: "coinfanatic", text: "Is this still available?" },
      ],
    },
    {
      id: 2,
      type: "achievement",
      achievement: "Top Seller Status Achieved!",
      description: "Completed 100 successful transactions",
      user: {
        name: "Silver Trader",
        username: "silvertrader",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      },
      timestamp: "4h ago",
      likes: 89,
      comments: 12,
    },
    {
      id: 3,
      type: "post",
      content:
        "Just added a beautiful collection of Morgan Silver Dollars to my inventory. Check them out!",
      image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
      user: {
        name: "Coin Collector",
        username: "coincollector",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      },
      timestamp: "6h ago",
      likes: 56,
      comments: 4,
    },
  ];

  const tabs = [
    { id: "following", label: "Following" },
    { id: "trending", label: "Trending" },
    { id: "recent", label: "Recent" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Create Post */}
      <div className="card p-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="Your avatar"
              fill
              className="object-cover"
            />
          </div>
          <input
            type="text"
            placeholder="Share something with the community..."
            className="flex-1 bg-[#333333] border border-[#C0C0C0]/20 rounded-lg px-4 py-2 text-[#C0C0C0]"
          />
          <button className="p-2 text-[#C0C0C0]/60 hover:text-[#4169E1] transition-colors">
            <PhotoIcon className="h-6 w-6" />
          </button>
          <button className="bg-[#4169E1] text-white px-4 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors">
            Post
          </button>
        </div>
      </div>

      {/* Feed Tabs */}
      <div className="flex gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? "bg-[#4169E1] text-white"
                : "text-[#C0C0C0] hover:bg-[#333333]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Feed Items */}
      <div className="grid gap-8">
        {feedItems.map((item) => (
          <FeedItem key={item.id} item={item} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <button className="bg-[#333333] text-[#C0C0C0] px-6 py-2 rounded-lg hover:bg-[#333333]/80 transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
}
