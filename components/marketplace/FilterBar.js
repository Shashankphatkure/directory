"use client";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function FilterBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    metalType: "",
    condition: "",
    minPrice: "",
    maxPrice: "",
  });

  const metalTypes = ["Gold", "Silver", "Platinum", "Palladium"];
  const conditions = [
    "Brand New",
    "Brilliant Uncirculated",
    "MS70",
    "XF",
    "VF-XF",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value === "" ? null : value,
    };
    setFilters(newFilters);

    // Convert price strings to numbers
    const processedFilters = {
      ...newFilters,
      minPrice: newFilters.minPrice ? parseFloat(newFilters.minPrice) : null,
      maxPrice: newFilters.maxPrice ? parseFloat(newFilters.maxPrice) : null,
    };

    onFilterChange(processedFilters);
  };

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-lg space-y-6">
      <div>
        <h3 className="text-[#C0C0C0] font-semibold mb-3">Metal Type</h3>
        <select
          name="metalType"
          value={filters.metalType || ""}
          onChange={handleChange}
          className="w-full bg-[#333333] text-[#C0C0C0] border border-[#C0C0C0]/20 rounded-lg px-4 py-2"
        >
          <option value="">All Types</option>
          {metalTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-[#C0C0C0] font-semibold mb-3">Condition</h3>
        <select
          name="condition"
          value={filters.condition || ""}
          onChange={handleChange}
          className="w-full bg-[#333333] text-[#C0C0C0] border border-[#C0C0C0]/20 rounded-lg px-4 py-2"
        >
          <option value="">All Conditions</option>
          {conditions.map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-[#C0C0C0] font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice || ""}
            onChange={handleChange}
            placeholder="Min Price"
            className="w-full bg-[#333333] text-[#C0C0C0] border border-[#C0C0C0]/20 rounded-lg px-4 py-2"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice || ""}
            onChange={handleChange}
            placeholder="Max Price"
            className="w-full bg-[#333333] text-[#C0C0C0] border border-[#C0C0C0]/20 rounded-lg px-4 py-2"
          />
        </div>
      </div>
    </div>
  );
}
