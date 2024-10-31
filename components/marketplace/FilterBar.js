"use client";

import { useState } from "react";
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

export default function FilterBar() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Search and Toggle */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FunnelIcon className="h-5 w-5" />
            <span className="font-medium">Filters</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
            <span className="font-medium">Sort</span>
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="p-4 bg-gray-50 border-b space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Metal Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Metal Type
              </label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Metals</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="platinum">Platinum</option>
                <option value="palladium">Palladium</option>
              </select>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Conditions</option>
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="used">Used</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-sm text-gray-600">Showing 150 items</div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
