"use client";
import Image from "next/image";
import { useState } from "react";
import {
  StarIcon,
  ShieldCheckIcon,
  PencilIcon,
  LinkIcon,
  UserPlusIcon,
  MapPinIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("listings");
  const [isEditing, setIsEditing] = useState(false);

  const userProfile = {
    name: "John Smith",
    username: "metaltrader",
    bio: "Precious metals enthusiast and collector for over 10 years. Specializing in rare gold coins and silver bullion.",
    location: "New York, USA",
    joinDate: "Member since Jan 2024",
    reputation: 156,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    banner: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
    listings: 24,
    sales: 89,
    rating: 4.9,
    followers: 128,
    following: 45,
    awards: [
      { id: 1, name: "Top Seller 2023", icon: "🏆" },
      { id: 2, name: "Trusted Trader", icon: "⭐" },
      { id: 3, name: "Quick Shipper", icon: "🚀" },
    ],
    socialLinks: {
      twitter: "https://twitter.com/metaltrader",
      instagram: "https://instagram.com/metaltrader",
      website: "https://metaltrader.com",
    },
    personalStack: [
      { id: 1, name: "Gold American Eagles", quantity: "5 oz" },
      { id: 2, name: "Silver Bars", quantity: "100 oz" },
      { id: 3, name: "Platinum Coins", quantity: "2 oz" },
    ],
  };

  const tabs = [
    { id: "listings", label: "Listings" },
    { id: "stack", label: "Personal Stack" },
    { id: "activity", label: "Activity Feed" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-64 w-full">
        <Image
          src={userProfile.banner}
          alt="Profile Banner"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#333333] to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        {/* Profile Header */}
        <div className="card p-6">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#2A2A2A]">
                <Image
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  fill
                  sizes="(max-width: 768px) 128px, 128px"
                  className="object-cover"
                  priority
                />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-[#4169E1] rounded-full text-white">
                  <PencilIcon className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-[#C0C0C0]">
                  {userProfile.name}
                </h1>
                {userProfile.verified && (
                  <ShieldCheckIcon className="h-6 w-6 text-[#50C878]" />
                )}
              </div>
              <p className="text-[#C0C0C0]/60 mb-2">@{userProfile.username}</p>

              {/* Location and Join Date */}
              <div className="flex items-center gap-4 text-sm text-[#C0C0C0]/60 mb-4">
                <span className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  {userProfile.location}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  {userProfile.joinDate}
                </span>
              </div>

              {/* Bio */}
              <p className="text-[#C0C0C0]/80 mb-4">{userProfile.bio}</p>

              {/* Stats */}
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
                <div>
                  <span className="font-bold text-[#C0C0C0]">
                    {userProfile.followers}
                  </span>{" "}
                  Followers
                </div>
                <div>
                  <span className="font-bold text-[#C0C0C0]">
                    {userProfile.following}
                  </span>{" "}
                  Following
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {isEditing ? (
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-[#50C878] text-white px-6 py-2 rounded-lg hover:bg-[#50C878]/80 transition-colors"
                >
                  Save Changes
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
                  >
                    Edit Profile
                  </button>
                  <button className="flex items-center gap-2 bg-[#333333] text-[#C0C0C0] px-6 py-2 rounded-lg hover:bg-[#333333]/80 transition-colors">
                    <UserPlusIcon className="h-5 w-5" />
                    Follow
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Awards Section */}
          {userProfile.awards.length > 0 && (
            <div className="mt-6 pt-6 border-t border-[#C0C0C0]/20">
              <h3 className="text-[#FFD700] font-semibold mb-3">Awards</h3>
              <div className="flex gap-4">
                {userProfile.awards.map((award, index) => (
                  <div
                    key={`${award.id}-${index}`}
                    className="flex items-center gap-2 bg-[#333333] px-3 py-1 rounded-full"
                  >
                    <span>{award.icon}</span>
                    <span className="text-sm text-[#C0C0C0]">{award.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          <div className="mt-6 pt-6 border-t border-[#C0C0C0]/20">
            <div className="flex gap-4">
              {Object.entries(userProfile.socialLinks).map(
                ([platform, url], index) => (
                  <a
                    key={`${platform}-${index}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#4169E1] hover:text-[#4169E1]/80 transition-colors"
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span className="capitalize">{platform}</span>
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-[#C0C0C0]/20">
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
        <div className="mt-8">
          {activeTab === "listings" && (
            <div className="text-center text-[#C0C0C0]/60">
              No active listings to display
            </div>
          )}
          {activeTab === "stack" && (
            <div className="grid md:grid-cols-3 gap-6">
              {userProfile.personalStack.map((item) => (
                <div key={item.id} className="card p-4">
                  <h3 className="text-[#FFD700] font-semibold">{item.name}</h3>
                  <p className="text-[#C0C0C0]">{item.quantity}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "activity" && (
            <div className="text-center text-[#C0C0C0]/60">
              No recent activity to display
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="text-center text-[#C0C0C0]/60">
              No reviews to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
