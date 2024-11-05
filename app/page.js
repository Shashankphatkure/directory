"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [featuredListings, setFeaturedListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [marketUpdates, setMarketUpdates] = useState([]);
  const [communityActivity, setCommunityActivity] = useState([]);

  useEffect(() => {
    fetchFeaturedListings();
    fetchCommunityActivity();
  }, []);

  async function fetchFeaturedListings() {
    try {
      // Fetch featured listings with seller information
      const { data: listings, error } = await supabase
        .from("listings")
        .select(
          `
          *,
          profiles:user_id (
            username,
            reputation,
            avatar_url
          )
        `
        )
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) throw error;

      // Transform the data to match your frontend structure
      const transformedListings = listings.map((listing) => ({
        id: listing.id,
        title: listing.title,
        seller: listing.profiles.username,
        price: listing.price,
        shipping: 5, // You might want to add this to your schema
        rep: listing.profiles.reputation,
        image: listing.images[0], // Using the first image from the images array
      }));

      setFeaturedListings(transformedListings);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  }

  async function fetchCommunityActivity() {
    try {
      // Fetch recent transactions and reviews
      const { data: activities, error } = await supabase
        .from("transactions")
        .select(
          `
          id,
          amount,
          created_at,
          listings (title),
          profiles:seller_id (
            username,
            avatar_url,
            is_verified
          )
        `
        )
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;

      // Transform the data
      const transformedActivities = activities.map((activity) => ({
        id: activity.id,
        type: "sale",
        user: {
          name: activity.profiles.username,
          avatar:
            activity.profiles.avatar_url ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
          badge: activity.profiles.is_verified ? "Verified Seller" : "Member",
        },
        action: `Completed a $${activity.amount} sale`,
        item: activity.listings.title,
        timestamp: getRelativeTime(new Date(activity.created_at)),
        icon: "💰",
      }));

      setCommunityActivity(transformedActivities);
    } catch (error) {
      console.error("Error fetching community activity:", error);
    }
  }

  // Helper function to format relative time
  function getRelativeTime(date) {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 1000 / 60);

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }

  // Keep the carousel slides as is for now
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
            {featuredListings.map((item) => (
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

        {/* Market Updates and Community Activity */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Market Updates */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-6 text-[#FFD700]">
              Market Updates
            </h3>
            <div className="space-y-6">
              {marketUpdates.map((update) => (
                <div
                  key={update.id}
                  className="flex gap-4 pb-4 border-b border-[#C0C0C0]/20 last:border-0"
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={update.image}
                      alt={update.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-[#C0C0C0]">
                        {update.title}
                      </h4>
                      <span
                        className={`text-sm ${
                          update.trend === "up"
                            ? "text-[#50C878]"
                            : "text-red-500"
                        }`}
                      >
                        {update.change}
                      </span>
                    </div>
                    <p className="text-sm text-[#C0C0C0]/80 mt-1">
                      {update.content}
                    </p>
                    <div className="flex justify-between items-center mt-2 text-xs text-[#C0C0C0]/60">
                      <div>
                        <span className="font-medium">{update.author}</span>
                        <span className="mx-1">•</span>
                        <span>{update.authorRole}</span>
                      </div>
                      <span>{update.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-[#4169E1] hover:text-[#4169E1]/80 transition-colors">
              View All Updates
            </button>
          </div>

          {/* Community Activity */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-6 text-[#FFD700]">
              Community Activity
            </h3>
            <div className="space-y-4">
              {communityActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#333333] transition-colors"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={activity.user.avatar}
                        alt={activity.user.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 text-xl">
                      {activity.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#C0C0C0]">
                        {activity.user.name}
                      </span>
                      <span className="text-xs px-2 py-1 bg-[#4169E1]/10 text-[#4169E1] rounded-full">
                        {activity.user.badge}
                      </span>
                    </div>
                    <p className="text-sm text-[#C0C0C0]/80 mt-1">
                      {activity.action}
                      {activity.item && (
                        <span className="text-[#FFD700]"> {activity.item}</span>
                      )}
                      {activity.price && (
                        <span className="text-[#50C878]">
                          {" "}
                          {activity.price}
                        </span>
                      )}
                    </p>
                    <span className="text-xs text-[#C0C0C0]/60">
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-[#4169E1] hover:text-[#4169E1]/80 transition-colors">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
