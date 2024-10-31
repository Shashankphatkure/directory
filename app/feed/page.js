"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function FeedPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Mock data for featured categories
  const categories = [
    {
      id: 1,
      name: "Popular Category 1",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
    },
    {
      id: 2,
      name: "Popular Category 2",
      image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
    },
    {
      id: 3,
      name: "Popular Category 3",
      image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
    },
    {
      id: 4,
      name: "Popular Category 4",
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356",
    },
  ];

  const categories2 = [
    {
      id: 5,
      name: "Popular Category 5",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
    },
    {
      id: 6,
      name: "Popular Category 6",
      image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
    },
    {
      id: 7,
      name: "Popular Category 7",
      image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
    },
    {
      id: 8,
      name: "Popular Category 8",
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <div className="relative aspect-[21/9] bg-gray-200">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1610375461246-83df859d849d"
            alt="Featured"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
            className="p-2 rounded-full bg-white/80 hover:bg-white"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => setActiveSlide((prev) => prev + 1)}
            className="p-2 rounded-full bg-white/80 hover:bg-white"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[0, 1, 2].map((dot) => (
            <button
              key={dot}
              className={`w-2 h-2 rounded-full ${
                activeSlide === dot ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setActiveSlide(dot)}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header 1 Categories */}
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map((category) => (
            <div
              key={category.id}
              className="aspect-square relative rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <h3 className="text-white font-medium">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Header 2 Categories */}
        <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories2.map((category) => (
            <div
              key={category.id}
              className="aspect-square relative rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <h3 className="text-white font-medium">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Live Feed and Marketplace Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Live Feed */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Latest News Feed</h3>
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Feed content will go here */}
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="pb-4 border-b last:border-0">
                    <p className="text-gray-600">Sample feed item {item}...</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium">
                View Feed
              </button>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Featured Listings</h3>
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Marketplace content will go here */}
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="pb-4 border-b last:border-0">
                    <p className="text-gray-600">Featured listing {item}...</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium">
                Shop Marketplace
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
