"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChatBubbleLeftIcon,
  HeartIcon,
  ShareIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

export default function ListingPage({ params }) {
  const [showMakeOffer, setShowMakeOffer] = useState(false);

  // Mock data - replace with real data fetch
  const listing = {
    id: params.id,
    title: "2024 PCGS MS-70 First Strike ASE",
    price: 45.0,
    shippingPrice: 5.0,
    available: 12,
    description:
      "You know it... you've seen it... you know I got it.\nAmerican Silver Eagle 2024 MS-40 First Strike PCGS Graded Coin.\nPerfect for adding to your collection or for stacking.",
    seller: {
      username: "Slabz4Dayz",
      avatar: "https://ui-avatars.com/api/?name=Slabz4Dayz",
      reputation: 665,
      verified: true,
      avgShipping: "1 Day",
      ordersFulfilled: 400,
    },
    images: [
      "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
      // Add more images...
    ],
    specifications: {
      category: "Graded Coins",
      weight: "1 Troy Ounce",
      shape: "Round",
      mint: "United States Mint",
    },
    comments: [
      {
        id: 1,
        user: {
          username: "ThatSilverGuy",
          avatar: "https://ui-avatars.com/api/?name=ThatSilverGuy",
          reputation: 338,
        },
        content:
          "Hey man, I see you are selling these for $45, but I see them on eBay for $40 plus ship. Do you think we could work out a deal?",
        timestamp: "2h ago",
      },
      {
        id: 2,
        user: {
          username: "MAGAMan",
          avatar: "https://ui-avatars.com/api/?name=MAGAMan",
          reputation: 167,
        },
        content: "These are really nice coins. Good luck with sales!",
        timestamp: "1h ago",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/profile"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Go Back To Profile
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              {/* Main Image */}
              <div className="relative aspect-square mb-4">
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              {/* Thumbnail Grid */}
              <div className="grid grid-cols-5 gap-2">
                {listing.images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover rounded-lg cursor-pointer hover:opacity-75"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="mt-6 grid grid-cols-4 gap-4">
              {Object.entries(listing.specifications).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-3xl mb-2">
                    {key === "category" && "📑"}
                    {key === "weight" && "⚖️"}
                    {key === "shape" && "⭕"}
                    {key === "mint" && "🏛️"}
                  </div>
                  <div className="text-sm font-medium">{value}</div>
                  <div className="text-xs text-gray-500 capitalize">{key}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            {/* Seller Info */}
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={listing.seller.avatar}
                alt={listing.seller.username}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  {listing.seller.username}
                  {listing.seller.verified && (
                    <span className="text-blue-500">✓</span>
                  )}
                </h2>
                <p className="text-sm text-gray-600">
                  {listing.seller.reputation} Rep
                </p>
              </div>
            </div>

            {/* Listing Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold">${listing.price}</span>
                <span className="text-gray-500 ml-2">
                  + ${listing.shippingPrice} Shipping
                </span>
              </div>
              <p className="text-gray-600 mb-6">{listing.description}</p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                  Buy It Now
                </button>
                <button
                  onClick={() => setShowMakeOffer(true)}
                  className="w-full bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50"
                >
                  Make A Offer
                </button>
                <button className="w-full bg-white border text-gray-700 py-3 rounded-lg hover:bg-gray-50">
                  Follow Seller
                </button>
              </div>

              {/* Social Interactions */}
              <div className="flex justify-between mt-6 pt-6 border-t">
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    <HeartIcon className="h-5 w-5" />
                    <span>Like</span>
                  </button>
                </div>
                <button className="text-gray-500 hover:text-blue-600">
                  <ShareIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Comments</h3>
              <div className="space-y-4">
                {listing.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white rounded-lg shadow-sm p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Image
                        src={comment.user.avatar}
                        alt={comment.user.username}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <span className="font-medium">
                          {comment.user.username}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          {comment.user.reputation} Rep
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      {comment.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
