"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { queries } from "../../../utils/supabase/queries";

export default function ListingPage({ params }) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    loadListing();
  }, [params.id]);

  const loadListing = async () => {
    try {
      setLoading(true);
      const data = await queries.fetchSingleListing(params.id);
      setListing(data);
    } catch (err) {
      console.error("Error loading listing:", err);
      setError("Failed to load listing");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      const tempCartId =
        localStorage.getItem("tempCartId") || "temp-" + Date.now();
      localStorage.setItem("tempCartId", tempCartId);

      const cartItem = {
        cart_id: tempCartId,
        title: listing.title,
        price: listing.price,
        shipping: 15.0,
        quantity: 1,
        seller: listing.profiles.username,
        image: listing.images?.[0] || "/placeholder.jpg",
        listing_id: listing.id,
      };

      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItemIndex = existingCart.findIndex(
        (item) => item.listing_id === listing.id
      );

      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        existingCart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));
      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-[#C0C0C0]">Loading...</div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          {error || "Listing not found"}
        </div>
      </div>
    );
  }

  // Calculate time since seller joined
  const joinDate = new Date(listing.profiles.created_at);
  const memberSince = `Member since ${joinDate.getFullYear()}`;

  return (
    <div className="container mx-auto px-4 py-8">
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
              src={listing.images?.[selectedImage] || "/placeholder.jpg"}
              alt={listing.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {listing.images?.map((image, index) => (
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
              {listing.year && (
                <>
                  <span>•</span>
                  <span>Year: {listing.year}</span>
                </>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="card p-6">
            <div className="flex justify-between items-baseline mb-4">
              <div className="text-3xl font-bold text-[#50C878]">
                ${listing.price.toFixed(2)}
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="w-full bg-[#4169E1] text-white py-3 rounded-lg hover:bg-[#4169E1]/80 transition-colors mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingToCart ? "Adding to Cart..." : "Add to Cart"}
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
                  {listing.profiles.username}
                </h3>
                {listing.profiles.reputation >= 100 && (
                  <ShieldCheckIcon className="h-5 w-5 text-[#50C878]" />
                )}
              </div>
              <Link
                href={`/profile/${listing.profiles.username}`}
                className="text-[#4169E1] hover:text-[#4169E1]/80"
              >
                View Profile
              </Link>
            </div>
            <div className="flex items-center gap-4 text-[#C0C0C0]/60 text-sm">
              <div className="flex items-center">
                <StarIcon className="h-4 w-4 text-[#FFD700] mr-1" />
                {listing.profiles.reputation} Reputation
              </div>
              <span>•</span>
              <div>{memberSince}</div>
            </div>
          </div>

          {/* Specifications */}
          <div className="card p-6">
            <h3 className="text-[#FFD700] font-semibold mb-4">
              Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4 text-[#C0C0C0]/80">
              <div>
                <span className="text-[#C0C0C0]">Weight: </span>
                {listing.weight} {listing.weight_unit}
              </div>
              <div>
                <span className="text-[#C0C0C0]">Metal: </span>
                {listing.metal_type}
              </div>
              {listing.year && (
                <div>
                  <span className="text-[#C0C0C0]">Year: </span>
                  {listing.year}
                </div>
              )}
              <div>
                <span className="text-[#C0C0C0]">Condition: </span>
                {listing.condition}
              </div>
            </div>
          </div>

          {/* Description */}
          {listing.description && (
            <div className="card p-6">
              <h3 className="text-[#FFD700] font-semibold mb-4">Description</h3>
              <p className="text-[#C0C0C0]/80 whitespace-pre-wrap">
                {listing.description}
              </p>
            </div>
          )}

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
                <span>{listing.likes || 0}</span>
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
    </div>
  );
}
