"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FilterBar from "@/components/marketplace/FilterBar";
import MarketplaceGrid from "@/components/marketplace/MarketplaceGrid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function MarketplacePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  // Mock categories data
  const categories = [
    { id: "all", name: "All Items", count: 2345 },
    { id: "gold", name: "Gold", count: 1234 },
    { id: "silver", name: "Silver", count: 567 },
    { id: "platinum", name: "Platinum", count: 89 },
    { id: "palladium", name: "Palladium", count: 45 },
    { id: "coins", name: "Coins", count: 890 },
    { id: "bars", name: "Bars", count: 456 },
    { id: "rounds", name: "Rounds", count: 234 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Marketplace</h1>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:bg-gray-50">
              Sort By
              <ChevronDownIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => router.push("/seller/listings/new")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Listing
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-left ${
                      selectedCategory === category.id
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm text-gray-500">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Filter Bar */}
            <div className="mb-6">
              <FilterBar />
            </div>

            {/* Results */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold">
                  {selectedCategory === "all"
                    ? "All Items"
                    : categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  Showing{" "}
                  {categories.find((c) => c.id === selectedCategory)?.count}{" "}
                  items
                </p>
              </div>

              {/* Grid */}
              <MarketplaceGrid />

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                    3
                  </button>
                  <span className="px-4 py-2">...</span>
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                    10
                  </button>
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
