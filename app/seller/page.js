"use client";
import { useRouter } from "next/navigation";
import {
  ChartBarIcon,
  TruckIcon,
  CurrencyDollarIcon,
  TagIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  StarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import AnalyticsDashboard from "@/components/seller/AnalyticsDashboard";
import QuickActions from "@/components/seller/QuickActions";
import RecentActivity from "@/components/seller/RecentActivity";
import Link from "next/link";

export default function SellerDashboard() {
  const router = useRouter();

  const dashboardStats = [
    {
      title: "Total Sales",
      value: "$12,450.00",
      change: "+12.5%",
      trend: "up",
      icon: CurrencyDollarIcon,
      color: "text-[#50C878]",
    },
    {
      title: "Active Listings",
      value: "24",
      change: "+3",
      trend: "up",
      icon: TagIcon,
      color: "text-[#4169E1]",
    },
    {
      title: "Pending Shipments",
      value: "5",
      change: "-2",
      trend: "down",
      icon: TruckIcon,
      color: "text-[#FFD700]",
    },
    {
      title: "Seller Rating",
      value: "4.9",
      change: "+0.2",
      trend: "up",
      icon: StarIcon,
      color: "text-[#FFD700]",
    },
  ];

  const quickLinks = [
    {
      title: "Listings",
      description: "Manage your product listings",
      icon: TagIcon,
      href: "/seller/listings",
      color: "bg-[#4169E1]",
    },
    {
      title: "Shipping",
      description: "Track and manage shipments",
      icon: TruckIcon,
      href: "/seller/shipping",
      color: "bg-[#FFD700]",
    },
    {
      title: "Payments",
      description: "View earnings and payouts",
      icon: CurrencyDollarIcon,
      href: "/seller/payments",
      color: "bg-[#50C878]",
    },
    {
      title: "Analytics",
      description: "View detailed performance metrics",
      icon: ChartBarIcon,
      href: "/seller/analytics",
      color: "bg-[#4169E1]",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
          Seller Dashboard
        </h1>
        <button
          onClick={() => router.push("/seller/listings/new")}
          className="bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
        >
          Create Listing
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#C0C0C0]/60 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold text-[#C0C0C0] mt-1">
                  {stat.value}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    stat.trend === "up" ? "text-[#50C878]" : "text-red-500"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full bg-[#333333] ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="card p-6 hover:transform hover:translate-y-[-4px] transition-all duration-200"
          >
            <div
              className={`${link.color} w-12 h-12 rounded-full flex items-center justify-center text-white mb-4`}
            >
              <link.icon className="h-6 w-6" />
            </div>
            <h3 className="text-[#C0C0C0] font-semibold mb-2">{link.title}</h3>
            <p className="text-[#C0C0C0]/60 text-sm">{link.description}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Overview */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#FFD700]">
                Sales Analytics
              </h2>
              <select className="bg-[#333333] text-[#C0C0C0] border border-[#C0C0C0]/20 rounded px-3 py-1">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <AnalyticsDashboard />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-[#FFD700] mb-6">
              Recent Activity
            </h2>
            <RecentActivity />
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#FFD700] mb-6">
          Performance Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#C0C0C0]">Response Rate</h3>
              <ClockIcon className="h-5 w-5 text-[#4169E1]" />
            </div>
            <div className="text-2xl font-bold text-[#C0C0C0]">98%</div>
            <div className="mt-2 text-sm text-[#C0C0C0]/60">
              Average response time: 2 hours
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#C0C0C0]">Customer Satisfaction</h3>
              <StarIcon className="h-5 w-5 text-[#FFD700]" />
            </div>
            <div className="text-2xl font-bold text-[#C0C0C0]">4.9/5.0</div>
            <div className="mt-2 text-sm text-[#C0C0C0]/60">
              Based on 156 reviews
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#C0C0C0]">Repeat Buyers</h3>
              <UserGroupIcon className="h-5 w-5 text-[#50C878]" />
            </div>
            <div className="text-2xl font-bold text-[#C0C0C0]">45%</div>
            <div className="mt-2 text-sm text-[#C0C0C0]/60">
              78 returning customers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
