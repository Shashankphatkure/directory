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
      title: "1oz Gold American Eagle 2024",
      price: 1950.0,
      shipping: 15.0,
      seller: "GoldExpert",
      rep: 245,
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      featured: true,
      condition: "Brand New",
      year: "2024",
    },
    {
      id: 2,
      title: "Silver Canadian Maple Leaf (Tube of 25)",
      price: 725.5,
      shipping: 12.0,
      seller: "SilverTrader",
      rep: 128,
      image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
      condition: "Brand New",
      year: "2024",
    },
    {
      id: 3,
      title: "1oz Platinum Britannia",
      price: 975.0,
      shipping: 12.0,
      seller: "PreciousMetals",
      rep: 89,
      image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
      condition: "Brand New",
      year: "2024",
    },
    {
      id: 4,
      title: "100oz Silver Bar - Johnson Matthey",
      price: 2450.0,
      shipping: 25.0,
      seller: "BullionDealer",
      rep: 567,
      image: "https://images.unsplash.com/photo-1589787168422-e1c58b9c47e7",
      featured: true,
      condition: "Brand New",
    },
    {
      id: 5,
      title: "1/4oz Gold Krugerrand",
      price: 495.0,
      shipping: 8.0,
      seller: "AfricanGold",
      rep: 156,
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      condition: "Brilliant Uncirculated",
      year: "2023",
    },
    {
      id: 6,
      title: "10oz Silver Bar - PAMP Suisse",
      price: 285.0,
      shipping: 10.0,
      seller: "SwissBullion",
      rep: 423,
      image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
      condition: "Brand New",
    },
    {
      id: 7,
      title: "1oz Gold Buffalo MS70",
      price: 2100.0,
      shipping: 15.0,
      seller: "RareCoinTrader",
      rep: 892,
      image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
      featured: true,
      condition: "MS70",
      year: "2023",
    },
    {
      id: 8,
      title: "Silver Morgan Dollar 1921",
      price: 85.0,
      shipping: 5.0,
      seller: "VintageCoins",
      rep: 734,
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82",
      condition: "XF",
      year: "1921",
    },
    {
      id: 9,
      title: "1oz Palladium Canadian Maple",
      price: 1450.0,
      shipping: 15.0,
      seller: "RareMetals",
      rep: 167,
      image: "https://images.unsplash.com/photo-1589787168175-90e9e248fc0c",
      condition: "Brand New",
      year: "2024",
    },
    {
      id: 10,
      title: "Kilo Silver Bar - PAMP Suisse",
      price: 875.0,
      shipping: 20.0,
      seller: "EuropeanBullion",
      rep: 445,
      image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
      condition: "Brand New",
    },
    {
      id: 11,
      title: "1/2oz Gold Vienna Philharmonic",
      price: 975.0,
      shipping: 12.0,
      seller: "AustrianGold",
      rep: 234,
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      condition: "Brand New",
      year: "2024",
    },
    {
      id: 12,
      title: "Peace Silver Dollar Set 1922-1935",
      price: 1200.0,
      shipping: 15.0,
      seller: "CollectorsChoice",
      rep: 678,
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82",
      featured: true,
      condition: "VF-XF",
    },
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
