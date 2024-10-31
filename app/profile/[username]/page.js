"use client";
import { useState } from "react";
import Image from "next/image";
import {
  ChatBubbleLeftIcon,
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  CalendarIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

export default function ProfilePage({ params }) {
  const [activeTab, setActiveTab] = useState("listings");

  // Enhanced mock user data with more stock images
  const user = {
    username: params.username,
    name: "John Doe",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&size=128",
    banner: "https://images.unsplash.com/photo-1629451437390-1c07c07a2777",
    location: "Asheville, NC",
    joinDate: "January 2023",
    rating: 4.9,
    totalSales: 156,
    bio: "Precious metals enthusiast and collector. Always looking for rare pieces!",
    stats: {
      followers: 1234,
      following: 567,
      listings: 45,
      sales: 156,
    },
    badges: [
      { id: 1, name: "Verified Seller", icon: "🌟" },
      { id: 2, name: "Top Rated", icon: "⭐" },
      { id: 3, name: "Fast Shipper", icon: "🚚" },
      { id: 4, name: "Expert", icon: "🏆" },
    ],
    listings: [
      {
        id: 1,
        title: "2024 PCGS MS-70 First Strike ASE",
        price: 45.0,
        shipping: 5.0,
        image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
        likes: 12,
        comments: 3,
      },
      {
        id: 2,
        title: "1oz Gold Buffalo BU",
        price: 2150.0,
        shipping: 8.0,
        image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
        likes: 24,
        comments: 5,
      },
      {
        id: 3,
        title: "Silver Canadian Maple Lot",
        price: 165.0,
        shipping: 5.0,
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356",
        likes: 8,
        comments: 2,
      },
      {
        id: 4,
        title: "100oz Silver Bar PAMP",
        price: 2899.0,
        shipping: 12.0,
        image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
        likes: 15,
        comments: 4,
      },
      {
        id: 5,
        title: "1oz Platinum Eagle MS69",
        price: 1050.0,
        shipping: 7.0,
        image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
        likes: 19,
        comments: 6,
      },
      {
        id: 6,
        title: "1/4oz Gold Britannia",
        price: 550.0,
        shipping: 5.0,
        image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
        likes: 7,
        comments: 1,
      },
    ],
    reviews: [
      {
        id: 1,
        user: "SilverBug123",
        avatar: "https://ui-avatars.com/api/?name=SilverBug",
        rating: 5,
        date: "2024-02-15",
        comment: "Great seller! Fast shipping and item exactly as described.",
      },
      {
        id: 2,
        user: "GoldStacker",
        avatar: "https://ui-avatars.com/api/?name=GoldStacker",
        rating: 5,
        date: "2024-02-10",
        comment: "Excellent communication and quick shipping. Will buy again!",
      },
      {
        id: 3,
        user: "CoinCollector",
        avatar: "https://ui-avatars.com/api/?name=CoinCollector",
        rating: 4,
        date: "2024-02-05",
        comment: "Very professional seller. Item was well packaged.",
      },
      {
        id: 4,
        user: "PreciousMetalsFan",
        avatar: "https://ui-avatars.com/api/?name=PreciousMetalsFan",
        rating: 5,
        date: "2024-01-30",
        comment: "Outstanding service and beautiful coin. Highly recommended!",
      },
    ],
    stack: [
      {
        id: 1,
        title: "Gold Stack",
        items: [
          {
            name: "American Gold Eagle",
            quantity: 5,
            image:
              "https://images.unsplash.com/photo-1610375461246-83df859d849d",
          },
          {
            name: "Gold Buffalo",
            quantity: 3,
            image:
              "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
          },
        ],
      },
      {
        id: 2,
        title: "Silver Stack",
        items: [
          {
            name: "Silver Maples",
            quantity: 100,
            image:
              "https://images.unsplash.com/photo-1618761714954-0b8cd0026356",
          },
          {
            name: "100oz Bars",
            quantity: 2,
            image:
              "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative h-64">
        <Image
          src={user.banner}
          alt="Profile banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
      </div>

      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="relative -mt-32">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                      {user.name}
                      <span className="text-blue-500">✓</span>
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>Joined {user.joinDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4" />
                        <span>
                          {user.rating} ({user.totalSales} sales)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Follow
                    </button>
                    <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
                      Message
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {Object.entries(user.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-xl font-bold">{value}</div>
                      <div className="text-sm text-gray-500 capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-3 mt-6 pt-6 border-t">
              {user.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
                >
                  <span>{badge.icon}</span>
                  <span className="text-sm font-medium">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow-sm">
            {/* Tab Navigation */}
            <div className="flex border-b">
              {["listings", "reviews", "about"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-center font-medium capitalize ${
                    activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "listings" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.listings.map((listing) => (
                    <div
                      key={listing.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">{listing.title}</h3>
                        <div className="flex justify-between items-baseline mt-2">
                          <span className="text-lg font-bold">
                            ${listing.price}
                          </span>
                          <span className="text-sm text-gray-500">
                            +${listing.shipping} shipping
                          </span>
                        </div>
                        <div className="flex justify-between mt-4 pt-4 border-t">
                          <div className="flex gap-4">
                            <button className="flex items-center gap-1 text-gray-500">
                              <HeartIcon className="h-5 w-5" />
                              <span>{listing.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-500">
                              <ChatBubbleLeftIcon className="h-5 w-5" />
                              <span>{listing.comments}</span>
                            </button>
                          </div>
                          <button className="text-gray-500">
                            <ShareIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {user.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex gap-4 pb-6 border-b last:border-0"
                    >
                      <Image
                        src={review.avatar}
                        alt={review.user}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.user}</span>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className="h-4 w-4 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 mt-1">{review.comment}</p>
                        <div className="text-sm text-gray-500 mt-2">
                          {review.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "about" && (
                <div className="max-w-2xl">
                  <p className="text-gray-600">{user.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
