"use client";
import { useState } from "react";
import Image from "next/image";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [preferences, setPreferences] = useState({
    marketUpdates: true,
    newListings: false,
    communityNews: false,
    priceAlerts: true,
  });

  const benefits = [
    {
      title: "Market Insights",
      description:
        "Get daily precious metals market analysis and price updates",
      icon: "📈",
    },
    {
      title: "Exclusive Deals",
      description: "Be the first to know about special offers and new listings",
      icon: "💎",
    },
    {
      title: "Expert Tips",
      description:
        "Receive trading tips and investment strategies from experts",
      icon: "🎯",
    },
    {
      title: "Community Updates",
      description: "Stay connected with the latest from our trading community",
      icon: "🤝",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
        Newsletter Subscription
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Subscription Form */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
            Stay Updated
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-[#C0C0C0] mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-[#C0C0C0] mb-2">
                Select Your Interests
              </label>
              <div className="space-y-3">
                {Object.entries(preferences).map(([key, value]) => (
                  <label
                    key={key}
                    className="flex items-center space-x-2 text-[#C0C0C0]/80 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() =>
                        setPreferences({ ...preferences, [key]: !value })
                      }
                      className="rounded border-[#C0C0C0]/20 text-[#4169E1] focus:ring-[#4169E1]"
                    />
                    <span className="capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full bg-[#4169E1] text-white py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors">
              Subscribe Now
            </button>

            <p className="text-sm text-[#C0C0C0]/60 text-center">
              You can unsubscribe at any time. View our Privacy Policy.
            </p>
          </form>
        </div>

        {/* Benefits */}
        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{benefit.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-[#FFD700] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[#C0C0C0]/80">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Newsletter */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
          Latest Newsletter
        </h2>
        <div className="card p-6">
          <div className="prose prose-invert max-w-none">
            <h3 className="text-[#C0C0C0]">Market Update - February 2024</h3>
            <div className="text-[#C0C0C0]/80">
              <p>Preview of our latest newsletter content...</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Gold prices reach new highs amid market uncertainty</li>
                <li>Silver demand increases in industrial applications</li>
                <li>Expert analysis: Platinum market outlook for 2024</li>
                <li>Community spotlight: Top traders of the month</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
