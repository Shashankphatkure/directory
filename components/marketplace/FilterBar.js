"use client";

import { useState } from "react";

export default function FilterBar({ onFilter }) {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ["Gold Coins", "Silver Bars", "Platinum", "Collectibles"];

  return (
    <div className="bg-[#2A2A2A] rounded-xl shadow-lg p-6 border border-[#C0C0C0]/20">
      <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">Filters</h2>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-[#C0C0C0] font-medium mb-3">Price Range</h3>
        <div className="flex gap-4">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
            placeholder="Min"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-[#C0C0C0] font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-2 text-[#C0C0C0]/80 hover:text-[#C0C0C0] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter((c) => c !== category)
                    );
                  }
                }}
                className="rounded border-[#C0C0C0]/20 text-[#4169E1] focus:ring-[#4169E1]"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={() => onFilter({ priceRange, selectedCategories })}
        className="w-full bg-[#4169E1] text-white py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
}
