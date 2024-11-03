"use client";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function FilterBar({ onFilter }) {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    metalTypes: [],
    conditions: [],
    certifications: [],
    sellers: [],
    availability: [],
  });

  const filterOptions = {
    metalTypes: [
      { id: "gold", label: "Gold" },
      { id: "silver", label: "Silver" },
      { id: "platinum", label: "Platinum" },
      { id: "palladium", label: "Palladium" },
      { id: "copper", label: "Copper" },
    ],
    conditions: [
      { id: "new", label: "Brand New" },
      { id: "ms70", label: "MS70" },
      { id: "ms69", label: "MS69" },
      { id: "proof", label: "Proof" },
      { id: "uncirculated", label: "Uncirculated" },
      { id: "circulated", label: "Circulated" },
    ],
    certifications: [
      { id: "pcgs", label: "PCGS" },
      { id: "ngc", label: "NGC" },
      { id: "anacs", label: "ANACS" },
      { id: "icg", label: "ICG" },
    ],
    sellers: [
      { id: "verified", label: "Verified Sellers" },
      { id: "top_rated", label: "Top Rated" },
      { id: "trusted", label: "Trusted Dealers" },
    ],
    availability: [
      { id: "in_stock", label: "In Stock" },
      { id: "pre_order", label: "Pre-Order" },
      { id: "backorder", label: "Backorder" },
    ],
  };

  const toggleFilter = (category, id) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(id)
        ? prev[category].filter((item) => item !== id)
        : [...prev[category], id],
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onFilter?.({ searchQuery, priceRange, ...filters });
  };

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setSearchQuery("");
    setFilters({
      metalTypes: [],
      conditions: [],
      certifications: [],
      sellers: [],
      availability: [],
    });
  };

  return (
    <div className="bg-[#2A2A2A] rounded-xl shadow-lg p-6 border border-[#C0C0C0]/20">
      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search listings..."
            className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded-lg pl-10 pr-4 py-2 text-[#C0C0C0] focus:outline-none focus:border-[#4169E1]"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C0C0C0]/60" />
        </div>
      </form>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-[#C0C0C0] font-medium mb-3">Price Range</h3>
        <div className="space-y-4">
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
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full accent-[#4169E1]"
          />
        </div>
      </div>

      {/* Metal Types */}
      <div className="mb-6">
        <h3 className="text-[#C0C0C0] font-medium mb-3">Metal Type</h3>
        <div className="space-y-2">
          {filterOptions.metalTypes.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-2 text-[#C0C0C0]/80 hover:text-[#C0C0C0] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.metalTypes.includes(option.id)}
                onChange={() => toggleFilter("metalTypes", option.id)}
                className="rounded border-[#C0C0C0]/20 text-[#4169E1] focus:ring-[#4169E1]"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div className="mb-6">
        <h3 className="text-[#C0C0C0] font-medium mb-3">Condition</h3>
        <div className="space-y-2">
          {filterOptions.conditions.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-2 text-[#C0C0C0]/80 hover:text-[#C0C0C0] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.conditions.includes(option.id)}
                onChange={() => toggleFilter("conditions", option.id)}
                className="rounded border-[#C0C0C0]/20 text-[#4169E1] focus:ring-[#4169E1]"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Certification */}
      <div className="mb-6">
        <h3 className="text-[#C0C0C0] font-medium mb-3">Certification</h3>
        <div className="space-y-2">
          {filterOptions.certifications.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-2 text-[#C0C0C0]/80 hover:text-[#C0C0C0] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.certifications.includes(option.id)}
                onChange={() => toggleFilter("certifications", option.id)}
                className="rounded border-[#C0C0C0]/20 text-[#4169E1] focus:ring-[#4169E1]"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Seller Type */}
      <div className="mb-6">
        <h3 className="text-[#C0C0C0] font-medium mb-3">Seller Type</h3>
        <div className="space-y-2">
          {filterOptions.sellers.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-2 text-[#C0C0C0]/80 hover:text-[#C0C0C0] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.sellers.includes(option.id)}
                onChange={() => toggleFilter("sellers", option.id)}
                className="rounded border-[#C0C0C0]/20 text-[#4169E1] focus:ring-[#4169E1]"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h3 className="text-[#C0C0C0] font-medium mb-3">Availability</h3>
        <div className="space-y-2">
          {filterOptions.availability.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-2 text-[#C0C0C0]/80 hover:text-[#C0C0C0] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.availability.includes(option.id)}
                onChange={() => toggleFilter("availability", option.id)}
                className="rounded border-[#C0C0C0]/20 text-[#4169E1] focus:ring-[#4169E1]"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleSearch}
          className="w-full bg-[#4169E1] text-white py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="w-full border border-[#C0C0C0]/20 text-[#C0C0C0] py-2 rounded-lg hover:bg-[#333333] transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
