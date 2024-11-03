"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Enhanced mock data for featured items
  const featuredItems = [
    {
      id: 1,
      title: "Silver Canadian Maple x5 Lot",
      seller: "Nashemon007",
      price: 165,
      shipping: 5,
      rep: 128,
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356",
    },
    {
      id: 2,
      title: "American Silver Eagle 1oz",
      seller: "JamesinGym",
      price: 30,
      shipping: 4,
      rep: 15,
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
    },
    {
      id: 3,
      title: "$100FV 90% Junk Silver",
      seller: "ThatSilverGuy",
      price: 2100,
      shipping: 10,
      rep: 338,
      image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
    },
    {
      id: 4,
      title: "1oz Gold Canadian Maple",
      seller: "ChadGreen318",
      price: 2500,
      shipping: 5,
      rep: 69,
      image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
    },
  ];

  // Enhanced categories with images
  const categories = [
    {
      id: 1,
      name: "Gold Coins",
      count: 1234,
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      description: "Explore rare and investment-grade gold coins",
    },
    {
      id: 2,
      name: "Silver Bars",
      count: 567,
      image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
      description: "Find silver bars from trusted mints worldwide",
    },
    {
      id: 3,
      name: "Platinum",
      count: 89,
      image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
      description: "Discover premium platinum bullion products",
    },
    {
      id: 4,
      name: "Collectibles",
      count: 432,
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356",
      description: "Browse unique and rare numismatic pieces",
    },
  ];

  // Mock carousel slides
  const carouselSlides = [
    {
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      title: "Premium Gold Collection",
      description:
        "Explore our curated selection of investment-grade gold coins",
      link: "/marketplace?category=gold",
    },
    {
      image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
      title: "Silver Special",
      description: "Discover amazing deals on silver bars and coins",
      link: "/marketplace?category=silver",
    },
    {
      image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
      title: "Rare Collectibles",
      description: "Find unique pieces for your collection",
      link: "/marketplace?category=collectibles",
    },
  ];

  // Mock news items
  const newsItems = [
    {
      id: 1,
      title: "Market Update: Gold Reaches New High",
      content: "Gold prices continue to surge as demand increases...",
      timestamp: "2h ago",
      author: "Market Analyst",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
    },
    {
      id: 2,
      title: "Silver Shortage Concerns",
      content: "Industry experts discuss potential silver supply issues...",
      timestamp: "4h ago",
      author: "Industry Expert",
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356",
    },
  ];

  return (
    <div className="min-h-screen bg-[#333333]">
      {/* Hero Carousel */}
      <div className="relative aspect-[21/9] bg-[#C0C0C0]">
        <div className="absolute inset-0">
          <Image
            src={carouselSlides[activeSlide].image}
            alt="Featured"
            fill
            className="object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#333333]/70 to-transparent">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {carouselSlides[activeSlide].title}
                </h1>
                <p className="text-xl mb-8 text-[#C0C0C0]">
                  {carouselSlides[activeSlide].description}
                </p>
                <Link
                  href={carouselSlides[activeSlide].link}
                  className="inline-block bg-[#4169E1] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#4169E1]/80 transition-colors"
                >
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
            className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() =>
              setActiveSlide((prev) =>
                prev === carouselSlides.length - 1 ? 0 : prev + 1
              )
            }
            className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                activeSlide === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
            Browse Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/marketplace?category=${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-[#2A2A2A] border border-[#C0C0C0]/20"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#333333] via-[#333333]/60 to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-[#FFD700] font-semibold text-lg mb-1">
                        {category.name}
                      </h3>
                      <p className="text-[#C0C0C0] text-sm mb-2">
                        {category.description}
                      </p>
                      <span className="text-[#C0C0C0]/60 text-sm">
                        {category.count} items
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Listings */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
              Featured Listings
            </h2>
            <Link
              href="/marketplace"
              className="text-[#4169E1] hover:text-[#4169E1]/80 font-medium"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item) => (
              <Link
                key={item.id}
                href={`/listings/${item.id}`}
                className="bg-[#2A2A2A] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#C0C0C0]/20"
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[#50C878] text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1 text-[#C0C0C0]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#C0C0C0]/80 mb-2">
                    Sold By: {item.seller} •
                    <span className="text-[#FFD700]"> {item.rep} Rep</span>
                  </p>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-[#50C878]">
                      ${item.price}
                    </span>
                    <span className="text-sm text-[#C0C0C0]/60">
                      +${item.shipping} shipping
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Market Updates and News */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
              Latest Updates
            </h2>
            <Link
              href="/feed"
              className="text-[#4169E1] hover:text-[#4169E1]/80 font-medium"
            >
              View Feed
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Market Updates */}
            <div className="bg-[#2A2A2A] rounded-xl shadow-lg p-6 border border-[#C0C0C0]/20">
              <h3 className="font-semibold mb-6 text-[#FFD700]">
                Market Updates
              </h3>
              <div className="space-y-6">
                {newsItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-[#C0C0C0]/20 last:border-0"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-[#C0C0C0]">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[#C0C0C0]/80 mb-2">
                        {item.content}
                      </p>
                      <div className="text-xs text-[#C0C0C0]/60">
                        {item.timestamp} • by {item.author}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Activity */}
            <div className="bg-[#2A2A2A] rounded-xl shadow-lg p-6 border border-[#C0C0C0]/20">
              <h3 className="font-semibold mb-6 text-[#FFD700]">
                Community Activity
              </h3>
              <div className="space-y-4">
                {/* Add community feed items here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
