"use client";

import React from "react";
import Image from "next/image";

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D]">
      {/* Hero Section */}
      <div className="relative bg-black/40 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Press & Media Resources
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto text-center">
            Get the latest news, brand assets, and media information about our
            company
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Latest News Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
            Latest News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* News Items */}
            <div className="backdrop-blur-sm bg-black/30 rounded-xl p-6 hover:transform hover:scale-[1.02] transition-all duration-300">
              <p className="text-[#4169E1] text-sm font-medium mb-2">
                March 15, 2024
              </p>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Company Launches New Marketplace Features
              </h3>
              <p className="text-white/70">
                Exciting new features added to enhance user experience and
                seller capabilities...
              </p>
            </div>

            <div className="backdrop-blur-sm bg-black/30 rounded-xl p-6 hover:transform hover:scale-[1.02] transition-all duration-300">
              <p className="text-[#4169E1] text-sm font-medium mb-2">
                March 10, 2024
              </p>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Expanding Our Global Reach
              </h3>
              <p className="text-white/70">
                New partnerships and international market expansion
                announcements...
              </p>
            </div>

            <div className="backdrop-blur-sm bg-black/30 rounded-xl p-6 hover:transform hover:scale-[1.02] transition-all duration-300">
              <p className="text-[#4169E1] text-sm font-medium mb-2">
                March 5, 2024
              </p>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Q1 2024 Growth Report
              </h3>
              <p className="text-white/70">
                Record-breaking quarter with exceptional growth in user base and
                transactions...
              </p>
            </div>
          </div>
        </section>

        {/* Brand Assets Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
            Brand Assets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="backdrop-blur-sm bg-black/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Logo Package
              </h3>
              <p className="text-white/70 mb-4">
                Download our official logos in various formats
              </p>
              <button className="bg-gradient-to-r from-[#4169E1] to-[#5179F1] text-white px-6 py-3 rounded-xl hover:scale-[1.02] transition-transform font-semibold">
                Download Logo Pack
              </button>
            </div>
            <div className="backdrop-blur-sm bg-black/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Brand Guidelines
              </h3>
              <p className="text-white/70 mb-4">
                Access our comprehensive brand guidelines
              </p>
              <button className="bg-gradient-to-r from-[#4169E1] to-[#5179F1] text-white px-6 py-3 rounded-xl hover:scale-[1.02] transition-transform font-semibold">
                View Guidelines
              </button>
            </div>
          </div>
        </section>

        {/* Media Contact Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
            Media Contact
          </h2>
          <div className="backdrop-blur-sm bg-black/30 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Press Inquiries
            </h3>
            <p className="text-white/70 mb-4">
              For press inquiries, please contact:
            </p>
            <div className="space-y-2">
              <p className="text-[#4169E1]">press@yourdomain.com</p>
              <p className="text-white/70">+1 (555) 123-4567</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
