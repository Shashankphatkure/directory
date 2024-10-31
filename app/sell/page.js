"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AnalyticsDashboard from "../../components/seller/AnalyticsDashboard";
import RecentActivity from "../../components/seller/RecentActivity";
import ListingsFilter from "../../components/seller/listings/ListingsFilter";
import SocialLinks from "../../components/profile/SocialLinks";

export default function SellPage() {
  const router = useRouter();

  // Example social links - replace with actual data from your backend/state
  const socialLinks = {
    twitter: "https://twitter.com/yourusername",
    instagram: "https://instagram.com/yourusername",
    // Add other social links as needed
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Analytics Section */}
        <div className="md:col-span-8">
          <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>
          <AnalyticsDashboard />
        </div>

        {/* Recent Activity Section */}
        <div className="md:col-span-4">
          <RecentActivity />
        </div>

        {/* Listings Section */}
        <div className="md:col-span-12">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
            <ListingsFilter />
          </div>
        </div>

        {/* Social Links Section */}
        <div className="md:col-span-12">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Social Links</h2>
            <SocialLinks links={socialLinks} />
          </div>
        </div>
      </div>
    </div>
  );
}
