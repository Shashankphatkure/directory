"use client";
import React from "react";
import { useRouter } from "next/navigation";
import AnalyticsDashboard from "@/components/seller/AnalyticsDashboard";
import RecentActivity from "@/components/seller/RecentActivity";
import ListingsFilter from "@/components/seller/listings/ListingsFilter";
import SocialLinks from "@/components/profile/SocialLinks";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function SellPage() {
  const router = useRouter();

  const socialLinks = {
    twitter: "https://twitter.com/yourusername",
    instagram: "https://instagram.com/yourusername",
  };

  const quickStats = [
    { label: "Active Listings", value: "12" },
    { label: "Total Sales", value: "$8,459" },
    { label: "Avg. Rating", value: "4.9" },
    { label: "Response Rate", value: "98%" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
          Seller Dashboard
        </h1>
        <button
          className="flex items-center gap-2 bg-[#50C878] text-white px-6 py-2 rounded-lg hover:bg-[#50C878]/80 transition-colors"
          onClick={() => router.push("/sell/new")}
        >
          <PlusIcon className="h-5 w-5" />
          New Listing
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="text-[#C0C0C0]/60 text-sm mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-[#FFD700]">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Analytics Section */}
        <div className="md:col-span-8">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
              Performance Analytics
            </h2>
            <AnalyticsDashboard />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="md:col-span-4">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
              Recent Activity
            </h2>
            <RecentActivity />
          </div>
        </div>

        {/* Listings Section */}
        <div className="md:col-span-12">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
              Your Listings
            </h2>
            <ListingsFilter />
          </div>
        </div>

        {/* Social Links Section */}
        <div className="md:col-span-12">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
              Social Links
            </h2>
            <SocialLinks links={socialLinks} />
          </div>
        </div>
      </div>
    </div>
  );
}
