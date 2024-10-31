"use client";
import { useState } from "react";

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState("7d");

  // Mock data - replace with real data later
  const stats = {
    revenue: {
      total: 12499.99,
      change: "+15%",
      isPositive: true,
    },
    orders: {
      total: 28,
      change: "+23%",
      isPositive: true,
    },
    views: {
      total: 1243,
      change: "-5%",
      isPositive: false,
    },
    conversion: {
      total: "2.3%",
      change: "+0.5%",
      isPositive: true,
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Timeframe Selector */}
      <div className="flex justify-end mb-6">
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-3 py-1 border rounded-lg"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, data]) => (
          <div key={key} className="p-4 border rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 uppercase">
              {key}
            </h3>
            <div className="mt-2 flex justify-between items-end">
              <div className="text-2xl font-semibold">
                {key === "revenue" ? "$" : ""}
                {data.total}
              </div>
              <div
                className={`text-sm ${
                  data.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {data.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="mt-8 h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
        Chart will be implemented here
      </div>
    </div>
  );
}
