"use client";
import { useState } from "react";
import FilterBar from "@/components/marketplace/FilterBar";
import ProductCard from "@/components/marketplace/ProductCard";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function MarketplacePage() {
  const [sortBy, setSortBy] = useState("newest");

  const products = [
    {
      id: 1,
      title: "1oz Gold American Eagle",
      price: 1950.0,
      shipping: 15,
      seller: "GoldExpert",
      rep: 245,
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      featured: true,
    },
    {
      id: 2,
      title: "Silver Canadian Maple Leaf",
      price: 28.5,
      shipping: 5,
      seller: "SilverTrader",
      rep: 128,
      image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
    },
    {
      id: 3,
      title: "1oz Platinum Britannia",
      price: 975.0,
      shipping: 12,
      seller: "PreciousMetals",
      rep: 89,
      image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
    },
    // Add more products as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
          Marketplace
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-[#C0C0C0]/60">Sort by:</span>
          <select
            className="bg-[#333333] text-[#C0C0C0] border border-[#C0C0C0]/20 rounded-lg px-4 py-2 appearance-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="lg:w-1/4">
          <FilterBar />
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <button className="bg-[#4169E1] text-white px-8 py-3 rounded-lg hover:bg-[#4169E1]/80 transition-colors">
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
