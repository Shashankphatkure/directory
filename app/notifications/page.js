"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ShoppingBagIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  TrophyIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "order",
      title: "Order Shipped",
      message: "Your order #12345 has been shipped and is on its way!",
      time: "2 hours ago",
      icon: ShoppingBagIcon,
      color: "text-[#50C878]",
      bgColor: "bg-[#50C878]/10",
      read: false,
      link: "/orders/12345",
    },
    {
      id: 2,
      type: "achievement",
      title: "New Achievement Unlocked",
      message: "Congratulations! You've earned the 'Gold Trader' badge",
      time: "5 hours ago",
      icon: TrophyIcon,
      color: "text-[#FFD700]",
      bgColor: "bg-[#FFD700]/10",
      read: false,
      link: "/profile#achievements",
    },
    {
      id: 3,
      type: "social",
      title: "New Comment",
      message: "John Smith commented on your listing",
      time: "1 day ago",
      icon: ChatBubbleLeftIcon,
      color: "text-[#4169E1]",
      bgColor: "bg-[#4169E1]/10",
      read: true,
      link: "/listings/1#comments",
    },
    {
      id: 4,
      type: "transaction",
      title: "Payment Received",
      message: "You received a payment of $1,950.00",
      time: "2 days ago",
      icon: CurrencyDollarIcon,
      color: "text-[#50C878]",
      bgColor: "bg-[#50C878]/10",
      read: true,
      link: "/wallet",
    },
    {
      id: 5,
      type: "social",
      title: "New Like",
      message: "Sarah liked your listing",
      time: "3 days ago",
      icon: HeartIcon,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      read: true,
      link: "/listings/2",
    },
  ];

  const tabs = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "order", label: "Orders" },
    { id: "social", label: "Social" },
    { id: "achievement", label: "Achievements" },
    { id: "transaction", label: "Transactions" },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.type === activeTab;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
            Notifications
          </h1>
          <button className="text-[#4169E1] hover:text-[#4169E1]/80 transition-colors">
            Mark all as read
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-[#4169E1] text-white"
                  : "text-[#C0C0C0] hover:bg-[#333333]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Link
              key={notification.id}
              href={notification.link}
              className={`card p-4 flex items-start gap-4 transition-all hover:transform hover:translate-x-2 ${
                !notification.read ? "border-l-4 border-l-[#4169E1]" : ""
              }`}
            >
              <div
                className={`p-3 rounded-full ${notification.bgColor} ${notification.color}`}
              >
                <notification.icon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[#C0C0C0] font-medium">
                      {notification.title}
                    </h3>
                    <p className="text-[#C0C0C0]/60 mt-1">
                      {notification.message}
                    </p>
                  </div>
                  <span className="text-sm text-[#C0C0C0]/40 whitespace-nowrap ml-4">
                    {notification.time}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <BellIcon className="h-12 w-12 text-[#C0C0C0]/40 mx-auto mb-4" />
            <h3 className="text-[#C0C0C0] font-medium mb-2">
              No notifications yet
            </h3>
            <p className="text-[#C0C0C0]/60">
              We'll notify you when something important happens
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 text-center">
            <button className="text-[#4169E1] hover:text-[#4169E1]/80 transition-colors">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
