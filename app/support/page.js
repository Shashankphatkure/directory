"use client";
import { useState } from "react";
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("buyer");

  const gettingStartedArticles = [
    {
      id: 1,
      title: "How to Buy on PeerMetals",
      icon: <QuestionMarkCircleIcon className="w-8 h-8 text-blue-600" />,
      description: "Learn the basics of making your first purchase safely.",
    },
    {
      id: 2,
      title: "Understanding Seller Ratings",
      icon: <QuestionMarkCircleIcon className="w-8 h-8 text-blue-600" />,
      description:
        "Know what seller ratings mean and how they help you make informed decisions.",
    },
    {
      id: 3,
      title: "Payment Methods & Security",
      icon: <QuestionMarkCircleIcon className="w-8 h-8 text-blue-600" />,
      description:
        "Discover our secure payment options and protection measures.",
    },
    {
      id: 4,
      title: "Shipping & Tracking",
      icon: <QuestionMarkCircleIcon className="w-8 h-8 text-blue-600" />,
      description:
        "Everything you need to know about shipping and tracking your orders.",
    },
  ];

  const topArticles = [
    {
      title: "Buyer Protection Program",
      description: "Learn how we protect your purchases",
      category: "buyer",
    },
    {
      title: "Return Policy",
      description: "Understanding our return process",
      category: "buyer",
    },
    {
      title: "Seller Fees & Pricing",
      description: "Complete breakdown of seller fees",
      category: "seller",
    },
    {
      title: "Shipping Guidelines",
      description: "How to ship items safely",
      category: "seller",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Customer Support
          </h1>
          <p className="text-xl text-blue-100">How can we help you today?</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("buyer")}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === "buyer"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Buyer
            </button>
            <button
              onClick={() => setActiveTab("seller")}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === "seller"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Seller
            </button>
          </div>
        </div>

        {/* Getting Started Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gettingStartedArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="mb-4">{article.icon}</div>
                <h3 className="font-semibold mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Top Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topArticles
              .filter((article) => article.category === activeTab)
              .map((article, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h3 className="font-semibold mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-600">{article.description}</p>
                </div>
              ))}
          </div>
        </section>

        {/* Get in Touch Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <ChatBubbleLeftRightIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-4">
              Chat with our support team in real-time
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start Chat
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <PaperAirplaneIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Open a Ticket</h3>
            <p className="text-sm text-gray-600 mb-4">
              Create a support ticket for detailed assistance
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Create Ticket
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <QuestionMarkCircleIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Send Us Feedback</h3>
            <p className="text-sm text-gray-600 mb-4">
              Help us improve your experience
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Send Feedback
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
