"use client";
import { useRouter } from "next/navigation";
import AnalyticsDashboard from "@/components/seller/AnalyticsDashboard";
import QuickActions from "@/components/seller/QuickActions";
import RecentActivity from "@/components/seller/RecentActivity";

export default function SellerDashboard() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        <button
          onClick={() => router.push("/seller/listings/new")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Listing
        </button>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <QuickActions />
      </div>

      {/* Analytics Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
        <AnalyticsDashboard />
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <RecentActivity />
      </div>
    </div>
  );
}
