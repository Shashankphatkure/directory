"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeartIcon,
  ShareIcon,
  ShieldCheckIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  TruckIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

export default function ListingPage({ params }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Mock listing data
  const listing = {
    id: params.id,
    title: "1oz Gold American Eagle 2024",
    price: 1950.0,
    shipping: 15.0,
    condition: "Brand New",
    certification: "NGC MS70",
    seller: {
      name: "GoldExpert",
      rating: 4.9,
      sales: 1234,
      verified: true,
      joinDate: "Member since 2020",
    },
    description:
      "2024 American Gold Eagle 1 oz $50 NGC MS70 Early Releases. Perfect condition, straight from the mint. Includes original packaging and certification.",
    specifications: {
      weight: "1 oz (31.1g)",
      purity: ".9999 fine gold",
      diameter: "32.7mm",
      thickness: "2.87mm",
      mint: "U.S. Mint",
      year: "2024",
    },
    images: [
      "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
      "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
    ],
    likes: 156,
    views: 789,
    location: "New York, USA",
    shippingOptions: [
      { method: "Standard Shipping", price: 15.0, time: "3-5 business days" },
      { method: "Express Shipping", price: 25.0, time: "1-2 business days" },
    ],
    similarItems: [
      {
        id: 2,
        title: "1oz Gold Buffalo 2024",
        price: 1975.0,
        image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      },
      // Add more similar items...
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/marketplace"
        className="inline-flex items-center text-[#C0C0C0] hover:text-[#4169E1] mb-6 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Marketplace
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <Image
              src={listing.images[selectedImage]}
              alt={listing.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {listing.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-[#4169E1]"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#C0C0C0] mb-2">
              {listing.title}
            </h1>
            <div className="flex items-center gap-4 text-[#C0C0C0]/60">
              <span>Condition: {listing.condition}</span>
              <span>•</span>
              <span>{listing.certification}</span>
            </div>
          </div>

          {/* Price */}
          <div className="card p-6">
            <div className="flex justify-between items-baseline mb-4">
              <div className="text-3xl font-bold text-[#50C878]">
                ${listing.price.toFixed(2)}
              </div>
              <div className="text-[#C0C0C0]/60">
                + ${listing.shipping.toFixed(2)} shipping
              </div>
            </div>
            <button className="w-full bg-[#4169E1] text-white py-3 rounded-lg hover:bg-[#4169E1]/80 transition-colors mb-3">
              Add to Cart
            </button>
            <button className="w-full border border-[#C0C0C0]/20 text-[#C0C0C0] py-3 rounded-lg hover:bg-[#333333] transition-colors">
              Make Offer
            </button>
          </div>

          {/* Seller Info */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-[#C0C0C0] font-semibold">
                  {listing.seller.name}
                </h3>
                {listing.seller.verified && (
                  <ShieldCheckIcon className="h-5 w-5 text-[#50C878]" />
                )}
              </div>
              <Link
                href={`/profile/${listing.seller.name}`}
                className="text-[#4169E1] hover:text-[#4169E1]/80"
              >
                View Profile
              </Link>
            </div>
            <div className="flex items-center gap-4 text-[#C0C0C0]/60 text-sm">
              <div className="flex items-center">
                <StarIcon className="h-4 w-4 text-[#FFD700] mr-1" />
                {listing.seller.rating} Rating
              </div>
              <span>•</span>
              <div>{listing.seller.sales} Sales</div>
              <span>•</span>
              <div>{listing.seller.joinDate}</div>
            </div>
          </div>

          {/* Specifications */}
          <div className="card p-6">
            <h3 className="text-[#FFD700] font-semibold mb-4">
              Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4 text-[#C0C0C0]/80">
              {Object.entries(listing.specifications).map(([key, value]) => (
                <div key={key}>
                  <span className="text-[#C0C0C0] capitalize">{key}: </span>
                  {value}
                </div>
              ))}
            </div>
          </div>

          {/* Shipping */}
          <div className="card p-6">
            <h3 className="text-[#FFD700] font-semibold mb-4">
              Shipping Options
            </h3>
            <div className="space-y-3">
              {listing.shippingOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-[#C0C0C0]/80"
                >
                  <div className="flex items-center gap-2">
                    <TruckIcon className="h-5 w-5" />
                    <div>
                      <div>{option.method}</div>
                      <div className="text-sm text-[#C0C0C0]/60">
                        {option.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-[#50C878]">
                    ${option.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-2 text-[#C0C0C0]/60 hover:text-[#4169E1] transition-colors"
              >
                {isLiked ? (
                  <HeartSolidIcon className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartIcon className="h-6 w-6" />
                )}
                <span>{listing.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-[#C0C0C0]/60 hover:text-[#4169E1] transition-colors">
                <ChatBubbleLeftIcon className="h-6 w-6" />
                <span>Message</span>
              </button>
            </div>
            <button className="text-[#C0C0C0]/60 hover:text-[#4169E1] transition-colors">
              <ShareIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Similar Items */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-[#FFD700] mb-6">Similar Items</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {listing.similarItems.map((item) => (
            <Link
              key={item.id}
              href={`/listings/${item.id}`}
              className="card overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-[#C0C0C0] font-medium mb-2">
                  {item.title}
                </h3>
                <div className="text-[#50C878] font-bold">
                  ${item.price.toFixed(2)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
