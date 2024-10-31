"use client";
import { useState } from "react";

export default function ListingsFilter() {
  const [filters, setFilters] = useState({
    status: "all",
    metalType: "all",
    priceRange: "all",
    sortBy: "newest",
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-4 border-b">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="sold">Sold</option>
            <option value="draft">Draft</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Metal Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Metal Type
          </label>
          <select
            name="metalType"
            value={filters.metalType}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="all">All Metals</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="platinum">Platinum</option>
            <option value="palladium">Palladium</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="all">All Prices</option>
            <option value="0-100">$0 - $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500-2000">$500 - $2000</option>
            <option value="2000+">$2000+</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-4">
        <input
          type="search"
          placeholder="Search listings..."
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
    </div>
  );
}
