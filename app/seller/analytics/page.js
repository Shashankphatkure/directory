"use client";
import { useState } from "react";
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  EyeIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState("month");

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,678",
      change: "+12.5%",
      trend: "up",
      icon: CurrencyDollarIcon,
      color: "text-[#50C878]",
    },
    {
      title: "Total Orders",
      value: "234",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCartIcon,
      color: "text-[#4169E1]",
    },
    {
      title: "Page Views",
      value: "12.4K",
      change: "+24.3%",
      trend: "up",
      icon: EyeIcon,
      color: "text-[#FFD700]",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-0.8%",
      trend: "down",
      icon: ArrowTrendingUpIcon,
      color: "text-red-500",
    },
  ];

  // Sample data for charts
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [3000, 4500, 3800, 5200, 4800, 6000],
        borderColor: "#4169E1",
        backgroundColor: "rgba(65, 105, 225, 0.1)",
        fill: true,
      },
    ],
  };

  const productPerformance = {
    labels: [
      "Gold Eagles",
      "Silver Bars",
      "Platinum Coins",
      "Gold Bars",
      "Silver Eagles",
    ],
    datasets: [
      {
        label: "Sales Volume",
        data: [42, 35, 28, 25, 22],
        backgroundColor: "#FFD700",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(192, 192, 192, 0.1)",
        },
        ticks: {
          color: "#C0C0C0",
        },
      },
      x: {
        grid: {
          color: "rgba(192, 192, 192, 0.1)",
        },
        ticks: {
          color: "#C0C0C0",
        },
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
          Analytics Dashboard
        </h1>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-[#333333] text-[#C0C0C0] border border-[#C0C0C0]/20 rounded px-4 py-2"
        >
          <option value="week">Last 7 days</option>
          <option value="month">Last 30 days</option>
          <option value="year">Last 12 months</option>
        </select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Trend */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
            Sales Trend
          </h2>
          <Line data={salesData} options={chartOptions} />
        </div>

        {/* Product Performance */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
            Top Products
          </h2>
          <Bar data={productPerformance} options={chartOptions} />
        </div>
      </div>

      {/* Customer Analytics */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
            Customer Demographics
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#C0C0C0]">New Customers</span>
              <span className="text-[#50C878]">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#C0C0C0]">Returning Customers</span>
              <span className="text-[#4169E1]">55%</span>
            </div>
            <div className="h-4 bg-[#333333] rounded-full overflow-hidden">
              <div className="h-full w-[45%] bg-[#50C878]"></div>
              <div className="h-full w-[55%] bg-[#4169E1] -mt-4"></div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
            Traffic Sources
          </h2>
          <div className="space-y-4">
            {[
              { source: "Direct", value: "35%" },
              { source: "Search", value: "28%" },
              { source: "Referral", value: "22%" },
              { source: "Social", value: "15%" },
            ].map((source, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-[#C0C0C0]">{source.source}</span>
                <span className="text-[#C0C0C0]/60">{source.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { action: "New Order", time: "2 minutes ago" },
              { action: "Product View", time: "5 minutes ago" },
              { action: "Customer Review", time: "15 minutes ago" },
              { action: "Listing Update", time: "1 hour ago" },
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-[#C0C0C0]">{activity.action}</span>
                <span className="text-[#C0C0C0]/60">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
