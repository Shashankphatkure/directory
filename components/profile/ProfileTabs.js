"use client";
import { useState } from "react";
import Image from "next/image";
import { StarIcon, ClockIcon } from "@heroicons/react/24/solid";
import PersonalStack from "./PersonalStack";

export default function ProfileTabs({ defaultTab = "listings", userData }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = [
    { id: "listings", label: "Listings" },
    { id: "stack", label: "Personal Stack" },
    { id: "activity", label: "Activity Feed" },
    { id: "reviews", label: "Reviews" },
  ];

  // Demo listings data
  const demoListings = [
    {
      id: 1,
      title: "1oz Gold American Eagle 2024",
      price: 1950.0,
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      status: "active",
      date: "2 days ago",
      views: 156,
    },
    {
      id: 2,
      title: "100oz Silver Bar - Johnson Matthey",
      price: 2450.0,
      image: "https://images.unsplash.com/photo-1589787168422-e1c58b9c47e7",
      status: "active",
      date: "3 days ago",
      views: 89,
    },
    {
      id: 3,
      title: "1oz Platinum Britannia",
      price: 975.0,
      image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
      status: "active",
      date: "5 days ago",
      views: 234,
    },
  ];

  // Demo personal stack data
  const demoStack = [
    {
      id: 1,
      name: "Gold American Eagles",
      quantity: "5 oz",
      metal: "gold",
      purity: ".9999 fine gold",
      value: 9750.0,
      purchaseDate: "Jan 15, 2024",
      premium: 5.5,
    },
    {
      id: 2,
      name: "Silver Bars",
      quantity: "100 oz",
      metal: "silver",
      purity: ".999 fine silver",
      value: 2450.0,
      purchaseDate: "Feb 1, 2024",
      premium: 2.8,
    },
    {
      id: 3,
      name: "Platinum Coins",
      quantity: "2 oz",
      metal: "platinum",
      purity: ".9995 fine platinum",
      value: 1950.0,
      purchaseDate: "Feb 10, 2024",
      premium: 4.2,
    },
    {
      id: 4,
      name: "Gold Krugerrands",
      quantity: "3 oz",
      metal: "gold",
      purity: ".9167 fine gold",
      value: 5850.0,
      purchaseDate: "Dec 20, 2023",
      premium: 3.5,
    },
  ];

  // Demo activity feed data
  const demoActivity = [
    {
      id: 1,
      type: "purchase",
      description: "Purchased 1oz Gold American Eagle",
      timestamp: "2 hours ago",
      amount: 1950.0,
      icon: "💰",
    },
    {
      id: 2,
      type: "sale",
      description: "Sold 50oz Silver Bar",
      timestamp: "1 day ago",
      amount: 1225.0,
      icon: "📈",
    },
    {
      id: 3,
      type: "achievement",
      description: "Earned Gold Trader Badge",
      timestamp: "2 days ago",
      icon: "🏆",
    },
    {
      id: 4,
      type: "listing",
      description: "Listed 1oz Platinum Britannia",
      timestamp: "3 days ago",
      amount: 975.0,
      icon: "📋",
    },
  ];

  // Demo reviews data
  const demoReviews = [
    {
      id: 1,
      reviewer: {
        name: "John Smith",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      },
      rating: 5,
      comment: "Excellent seller! Fast shipping and item exactly as described.",
      date: "Feb 25, 2024",
      transaction: "1oz Gold American Eagle",
    },
    {
      id: 2,
      reviewer: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      },
      rating: 5,
      comment: "Great communication and secure packaging. Will buy from again!",
      date: "Feb 20, 2024",
      transaction: "100oz Silver Bar",
    },
    {
      id: 3,
      reviewer: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
      rating: 4,
      comment: "Very professional trader. Smooth transaction.",
      date: "Feb 15, 2024",
      transaction: "1oz Platinum Britannia",
    },
  ];

  const renderListings = () => {
    if (!demoListings?.length) {
      return (
        <div className="text-center py-12">
          <p className="text-[#C0C0C0]/60">No active listings to display</p>
          <button className="mt-4 bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors">
            Create Listing
          </button>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoListings.map((listing) => (
          <div key={listing.id} className="card overflow-hidden group">
            <div className="relative aspect-square">
              <Image
                src={listing.image}
                alt={listing.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-[#C0C0C0] font-medium mb-2">
                {listing.title}
              </h3>
              <div className="flex justify-between items-baseline">
                <span className="text-[#50C878] font-bold">
                  ${listing.price.toFixed(2)}
                </span>
                <span className="text-sm text-[#C0C0C0]/60">
                  Listed {listing.date}
                </span>
              </div>
              <div className="mt-2 text-sm text-[#C0C0C0]/60">
                {listing.views} views
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderActivityFeed = () => {
    if (!demoActivity?.length) {
      return (
        <div className="text-center py-12">
          <p className="text-[#C0C0C0]/60">No recent activity to display</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {demoActivity.map((activity) => (
          <div key={activity.id} className="card p-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-[#333333] text-2xl">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="text-[#C0C0C0]">{activity.description}</p>
                {activity.amount && (
                  <p className="text-[#50C878] font-medium mt-1">
                    ${activity.amount.toFixed(2)}
                  </p>
                )}
                <span className="text-sm text-[#C0C0C0]/60">
                  {activity.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderReviews = () => {
    if (!demoReviews?.length) {
      return (
        <div className="text-center py-12">
          <p className="text-[#C0C0C0]/60">No reviews to display</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {demoReviews.map((review) => (
          <div key={review.id} className="card p-4">
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={review.reviewer.avatar}
                  alt={review.reviewer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-[#C0C0C0]">
                      {review.reviewer.name}
                    </h4>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-[#FFD700]"
                              : "text-[#333333]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-[#C0C0C0]/60">
                    {review.date}
                  </span>
                </div>
                <p className="mt-2 text-[#C0C0C0]/80">{review.comment}</p>
                {review.transaction && (
                  <div className="mt-2 text-sm text-[#C0C0C0]/60">
                    Transaction: {review.transaction}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "listings":
        return renderListings();
      case "stack":
        return <PersonalStack stackItems={demoStack} />;
      case "activity":
        return renderActivityFeed();
      case "reviews":
        return renderReviews();
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="border-b border-[#C0C0C0]/20 mb-6">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-[#FFD700] border-b-2 border-[#FFD700]"
                  : "text-[#C0C0C0]/60 hover:text-[#C0C0C0]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {renderContent()}
    </div>
  );
}
