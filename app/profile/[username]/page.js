"use client";
import Image from "next/image";
import { useState } from "react";
import { StarIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("listings");

  const userProfile = {
    name: "John Smith",
    username: "metaltrader",
    joinDate: "Member since Jan 2024",
    reputation: 156,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    listings: 24,
    sales: 89,
    rating: 4.9,
  };

  const tabs = [
    { id: "listings", label: "Active Listings" },
    { id: "sales", label: "Sales History" },
    { id: "reviews", label: "Reviews" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="relative w-32 h-32">
            <Image
              src={userProfile.avatar}
              alt={userProfile.name}
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-[#C0C0C0]">
                {userProfile.name}
              </h1>
              {userProfile.verified && (
                <ShieldCheckIcon className="h-6 w-6 text-[#50C878]" />
              )}
            </div>
            <p className="text-[#C0C0C0]/60 mb-4">@{userProfile.username}</p>
            <div className="flex flex-wrap gap-6 text-[#C0C0C0]/80">
              <div>
                <span className="font-bold text-[#FFD700]">
                  {userProfile.listings}
                </span>{" "}
                Listings
              </div>
              <div>
                <span className="font-bold text-[#FFD700]">
                  {userProfile.sales}
                </span>{" "}
                Sales
              </div>
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-[#FFD700] mr-1" />
                <span className="font-bold">{userProfile.rating}</span>
              </div>
              <div>
                <span className="font-bold text-[#50C878]">
                  {userProfile.reputation}
                </span>{" "}
                Rep
              </div>
            </div>
          </div>
          <button className="bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#C0C0C0]/20 mb-8">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-[#FFD700] border-b-2 border-[#FFD700]"
                  : "text-[#C0C0C0]/60 hover:text-[#C0C0C0]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="card p-6">
        {activeTab === "listings" && (
          <div className="text-center text-[#C0C0C0]/60">
            No active listings to display
          </div>
        )}
        {activeTab === "sales" && (
          <div className="text-center text-[#C0C0C0]/60">
            No sales history to display
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="text-center text-[#C0C0C0]/60">
            No reviews to display
          </div>
        )}
        {activeTab === "settings" && (
          <div className="text-center text-[#C0C0C0]/60">
            Settings panel coming soon
          </div>
        )}
      </div>
    </div>
  );
}
