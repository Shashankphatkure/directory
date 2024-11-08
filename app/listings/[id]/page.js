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
  CreditCardIcon,
  ChartBarIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { fetchSingleListing } from "@/utils/supabase/queries";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ListingPage({ params: { id } }) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [similarListings, setSimilarListings] = useState([]);
  const [sellerListings, setSellerListings] = useState([]);

  useEffect(() => {
    loadListing();
  }, [id]);

  const loadListing = async () => {
    try {
      setLoading(true);
      const data = await fetchSingleListing(id);
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

  // Demo reviews data
  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        verified: true,
      },
      rating: 5,
      date: "2024-02-15",
      content:
        "Excellent seller! The coin arrived quickly and was exactly as described. Very professional packaging and great communication throughout.",
      images: [
        "https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1",
        "https://images.unsplash.com/photo-1589656966895-2f33e7653819",
      ],
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
        verified: false,
      },
      rating: 4,
      date: "2024-02-10",
      content:
        "Good transaction overall. The silver bars were in great condition. Shipping took a bit longer than expected but seller kept me updated.",
    },
    {
      id: 3,
      user: {
        name: "Emma Davis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        verified: true,
      },
      rating: 5,
      date: "2024-02-05",
      content:
        "Outstanding experience! The gold coin was even more beautiful in person. Secure packaging and fast shipping.",
      images: ["https://images.unsplash.com/photo-1610375461246-83df859d849d"],
    },
  ];

  // Calculate review statistics
  const reviewStats = {
    average: 4.7,
    total: 127,
    distribution: {
      5: 85,
      4: 30,
      3: 8,
      2: 3,
      1: 1,
    },
  };

  // Render rating stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <StarSolidIcon
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-[#FFD700]" : "text-[#333333]"
        }`}
      />
    ));
  };

  // Demo price history data
  const priceHistoryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Price History",
        data: [1950, 1900, 2100, 2050, 1980, 2000],
        borderColor: "#4169E1",
        backgroundColor: "#4169E1",
      },
    ],
  };

  // Fetch similar listings
  const fetchSimilarListings = async () => {
    if (!listing) return;

    try {
      const { data } = await supabase
        .from("listings")
        .select(
          `
          *,
          profiles:user_id (username, full_name, avatar_url)
        `
        )
        .eq("metal_type", listing.metal_type)
        .neq("id", listing.id)
        .limit(4);

      setSimilarListings(data || []);
    } catch (error) {
      console.error("Error fetching similar listings:", error);
    }
  };

  // Fetch seller's other listings
  const fetchSellerListings = async () => {
    if (!listing) return;

    try {
      const { data } = await supabase
        .from("listings")
        .select(
          `
          *,
          profiles:user_id (username, full_name, avatar_url)
        `
        )
        .eq("user_id", listing.user_id)
        .neq("id", listing.id)
        .limit(4);

      setSellerListings(data || []);
    } catch (error) {
      console.error("Error fetching seller listings:", error);
    }
  };

  useEffect(() => {
    if (listing) {
      fetchSimilarListings();
      fetchSellerListings();
    }
  }, [listing]);

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

  // Add demo listings data
  const demoSimilarListings = [
    {
      id: 1,
      title: "1 oz Gold American Eagle BU",
      price: 2150.0,
      images: ["https://images.unsplash.com/photo-1610375461246-83df859d849d"],
      metal_type: "Gold",
      condition: "BU",
      year: "2024",
    },
    {
      id: 2,
      title: "1 oz Gold Buffalo Proof",
      price: 2250.0,
      images: ["https://images.unsplash.com/photo-1589656966895-2f33e7653819"],
      metal_type: "Gold",
      condition: "Proof",
      year: "2024",
    },
    {
      id: 3,
      title: "1 oz Gold Maple Leaf",
      price: 2100.0,
      images: ["https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1"],
      metal_type: "Gold",
      condition: "BU",
      year: "2024",
    },
    {
      id: 4,
      title: "1 oz Gold Krugerrand",
      price: 2050.0,
      images: ["https://images.unsplash.com/photo-1610375461246-83df859d849d"],
      metal_type: "Gold",
      condition: "BU",
      year: "2024",
    },
  ];

  const demoSellerListings = [
    {
      id: 5,
      title: "100 oz Silver Bar PAMP",
      price: 2850.0,
      images: ["https://images.unsplash.com/photo-1589656966895-2f33e7653819"],
      metal_type: "Silver",
      condition: "New",
      year: "2024",
    },
    {
      id: 6,
      title: "1 kg Gold Bar PAMP",
      price: 65000.0,
      images: ["https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1"],
      metal_type: "Gold",
      condition: "New",
      year: "2024",
    },
    {
      id: 7,
      title: "1 oz Platinum Eagle",
      price: 1050.0,
      images: ["https://images.unsplash.com/photo-1610375461246-83df859d849d"],
      metal_type: "Platinum",
      condition: "BU",
      year: "2024",
    },
    {
      id: 8,
      title: "10 oz Silver Bar RCM",
      price: 285.0,
      images: ["https://images.unsplash.com/photo-1589656966895-2f33e7653819"],
      metal_type: "Silver",
      condition: "New",
      year: "2024",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-10 bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-[#333333]">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/marketplace"
            className="inline-flex items-center text-[#C0C0C0] hover:text-[#4169E1] transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Marketplace
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Image Gallery */}
          <div className="lg:col-span-3 space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#2A2A2A]">
              <Image
                src={listing.images?.[selectedImage] || "/placeholder.jpg"}
                alt={listing.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnail Grid */}
            {listing.images?.length > 1 && (
              <div className="grid grid-cols-6 gap-2">
                {listing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? "ring-2 ring-[#4169E1]"
                        : "ring-1 ring-[#333333]"
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
            )}

            {/* Reviews Section */}
            <div className="mt-8">
              <div className="border-b border-[#333333] mb-6">
                <h3 className="text-xl font-semibold text-[#C0C0C0] pb-4">
                  Reviews ({reviewStats.total})
                </h3>
              </div>

              <div className="grid grid-cols-12 gap-6">
                {/* Reviews Summary - Left Column */}
                <div className="col-span-4">
                  <div className="sticky top-24">
                    <div className="card p-4">
                      {/* Overall Rating */}
                      <div className="text-center">
                        <div className="text-4xl font-bold text-[#C0C0C0] mb-2">
                          {reviewStats.average.toFixed(1)}
                        </div>
                        <div className="flex items-center justify-center mb-2">
                          {renderStars(Math.round(reviewStats.average))}
                        </div>
                        <div className="text-sm text-[#C0C0C0]/60 mb-4">
                          Based on {reviewStats.total} reviews
                        </div>
                      </div>

                      {/* Rating Distribution */}
                      <div className="space-y-2">
                        {Object.entries(reviewStats.distribution)
                          .reverse()
                          .map(([rating, count]) => (
                            <div
                              key={rating}
                              className="flex items-center gap-2"
                            >
                              <div className="w-8 text-xs text-[#C0C0C0]/60">
                                {rating}★
                              </div>
                              <div className="flex-1 h-1.5 bg-[#333333] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#4169E1]"
                                  style={{
                                    width: `${
                                      (count / reviewStats.total) * 100
                                    }%`,
                                  }}
                                />
                              </div>
                              <div className="w-8 text-right text-xs text-[#C0C0C0]/60">
                                {count}
                              </div>
                            </div>
                          ))}
                      </div>

                      {/* Review Button */}
                      <button className="w-full mt-4 px-4 py-2 bg-[#4169E1] text-white rounded-lg hover:bg-[#4169E1]/90 transition-colors">
                        Write a Review
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reviews List - Right Column */}
                <div className="col-span-8">
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="card p-4">
                        {/* Review Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                              <Image
                                src={review.user.avatar}
                                alt={review.user.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-sm text-[#C0C0C0]">
                                  {review.user.name}
                                </span>
                                {review.user.verified && (
                                  <ShieldCheckIcon className="h-4 w-4 text-[#50C878]" />
                                )}
                              </div>
                              <div className="text-xs text-[#C0C0C0]/60">
                                {new Date(review.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                        </div>

                        {/* Review Content */}
                        <p className="text-sm text-[#C0C0C0]/80 mb-3">
                          {review.content}
                        </p>

                        {/* Review Images */}
                        {review.images && review.images.length > 0 && (
                          <div className="grid grid-cols-4 gap-2 mb-3">
                            {review.images.map((image, index) => (
                              <div
                                key={index}
                                className="relative aspect-square rounded-lg overflow-hidden"
                              >
                                <Image
                                  src={image}
                                  alt={`Review image ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Review Actions */}
                        <div className="flex items-center gap-4 text-xs text-[#C0C0C0]/60">
                          <button className="hover:text-[#4169E1] transition-colors">
                            Helpful
                          </button>
                          <button className="hover:text-[#4169E1] transition-colors">
                            Report
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Load More Button */}
                    <button className="w-full py-2 border border-[#333333] rounded-lg text-[#C0C0C0] hover:bg-[#333333] transition-colors">
                      Load More Reviews
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Title & Price */}
            <div className="card p-6">
              <h1 className="text-2xl font-bold text-[#C0C0C0] mb-2">
                {listing.title}
              </h1>
              <div className="flex items-center gap-4 text-[#C0C0C0]/60 mb-4">
                <span>Condition: {listing.condition}</span>
                {listing.year && (
                  <>
                    <span>•</span>
                    <span>Year: {listing.year}</span>
                  </>
                )}
              </div>
              <div className="text-3xl font-bold text-[#50C878] mb-6">
                ${listing.price.toFixed(2)}
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
              <div className="grid grid-cols-2 gap-y-4 text-[#C0C0C0]/80">
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
                <h3 className="text-[#FFD700] font-semibold mb-4">
                  Description
                </h3>
                <p className="text-[#C0C0C0]/80 whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>
            )}

            {/* Additional Information Cards */}
            {/* ... (shipping, payment, buyer protection, and price history cards remain the same) */}
          </div>
        </div>

        {/* Similar Listings Section */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-[#C0C0C0] mb-6">
            Similar Listings
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {demoSimilarListings.map((item) => (
              <Link
                key={item.id}
                href={`/listings/${item.id}`}
                className="card group hover:border-[#4169E1] transition-colors"
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#C0C0C0] group-hover:text-[#4169E1] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[#C0C0C0]/60 mt-1">
                    <span>{item.metal_type}</span>
                    <span>•</span>
                    <span>{item.condition}</span>
                  </div>
                  <p className="text-[#FFD700] font-bold mt-2">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* More from Seller Section */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-[#C0C0C0] mb-6">
            More from this Seller
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {demoSellerListings.map((item) => (
              <Link
                key={item.id}
                href={`/listings/${item.id}`}
                className="card group hover:border-[#4169E1] transition-colors"
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#C0C0C0] group-hover:text-[#4169E1] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[#C0C0C0]/60 mt-1">
                    <span>{item.metal_type}</span>
                    <span>•</span>
                    <span>{item.condition}</span>
                  </div>
                  <p className="text-[#FFD700] font-bold mt-2">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
