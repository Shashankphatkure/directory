"use client";
import { useState } from "react";
import Image from "next/image";
import { PlusIcon, ChartBarIcon, ScaleIcon } from "@heroicons/react/24/outline";

export default function PersonalStack({ stackItems = [] }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [view, setView] = useState("grid"); // grid or list

  const totalValue = stackItems.reduce(
    (sum, item) => sum + (item.value || 0),
    0
  );

  const metalCategories = {
    gold: { color: "text-[#FFD700]", label: "Gold" },
    silver: { color: "text-[#C0C0C0]", label: "Silver" },
    platinum: { color: "text-[#E5E4E2]", label: "Platinum" },
    palladium: { color: "text-[#CED0DD]", label: "Palladium" },
  };

  const getMetalDistribution = () => {
    const distribution = {};
    stackItems.forEach((item) => {
      if (!distribution[item.metal]) {
        distribution[item.metal] = 0;
      }
      distribution[item.metal] += item.value || 0;
    });
    return distribution;
  };

  return (
    <div className="space-y-6">
      {/* Stack Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-[#C0C0C0]/60 text-sm">Total Stack Value</div>
          <div className="text-2xl font-bold text-[#50C878] mt-1">
            ${totalValue.toLocaleString()}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-[#C0C0C0]/60 text-sm">Total Items</div>
          <div className="text-2xl font-bold text-[#C0C0C0] mt-1">
            {stackItems.length}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-[#C0C0C0]/60 text-sm">Metal Types</div>
          <div className="text-2xl font-bold text-[#FFD700] mt-1">
            {Object.keys(getMetalDistribution()).length}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1 rounded-lg ${
              view === "grid"
                ? "bg-[#4169E1] text-white"
                : "text-[#C0C0C0] hover:bg-[#333333]"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 rounded-lg ${
              view === "list"
                ? "bg-[#4169E1] text-white"
                : "text-[#C0C0C0] hover:bg-[#333333]"
            }`}
          >
            List
          </button>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#50C878] text-white px-4 py-2 rounded-lg hover:bg-[#50C878]/80 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          Add Item
        </button>
      </div>

      {/* Stack Items */}
      {stackItems.length > 0 ? (
        <div
          className={
            view === "grid" ? "grid md:grid-cols-3 gap-4" : "space-y-4"
          }
        >
          {stackItems.map((item) => (
            <div
              key={item.id}
              className="card p-4 hover:border-[#4169E1] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    className={`font-semibold ${
                      metalCategories[item.metal]?.color
                    }`}
                  >
                    {item.name}
                  </h3>
                  <div className="text-[#C0C0C0]/60 text-sm mt-1">
                    {item.quantity} • {item.purity}
                  </div>
                </div>
                {item.value && (
                  <div className="text-[#50C878] font-bold">
                    ${item.value.toLocaleString()}
                  </div>
                )}
              </div>
              {view === "list" && (
                <div className="mt-4 pt-4 border-t border-[#C0C0C0]/20">
                  <div className="flex justify-between text-sm text-[#C0C0C0]/60">
                    <div>Purchase Date: {item.purchaseDate}</div>
                    <div>Premium: {item.premium}%</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#333333] mb-4">
            <ScaleIcon className="h-8 w-8 text-[#C0C0C0]/60" />
          </div>
          <p className="text-[#C0C0C0]/60 mb-4">No items in your stack yet</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
          >
            Add Your First Item
          </button>
        </div>
      )}

      {/* Distribution Chart */}
      {stackItems.length > 0 && (
        <div className="card p-6">
          <h3 className="text-[#FFD700] font-semibold mb-4">
            Metal Distribution
          </h3>
          <div className="h-4 rounded-full bg-[#333333] overflow-hidden flex">
            {Object.entries(getMetalDistribution()).map(
              ([metal, value], index) => {
                const percentage = (value / totalValue) * 100;
                return (
                  <div
                    key={metal}
                    className={`h-full ${metalCategories[metal]?.color}`}
                    style={{ width: `${percentage}%` }}
                    title={`${
                      metalCategories[metal]?.label
                    }: ${percentage.toFixed(1)}%`}
                  />
                );
              }
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            {Object.entries(getMetalDistribution()).map(([metal, value]) => (
              <div key={metal} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${metalCategories[metal]?.color}`}
                />
                <span className="text-[#C0C0C0]/60 text-sm">
                  {metalCategories[metal]?.label}:{" "}
                  {((value / totalValue) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
