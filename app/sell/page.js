"use client";

import { useRouter } from "next/navigation";
import React from "react";

// Utility function to check location
const getLocation = () => {
  if (typeof window !== "undefined") {
    return window.location;
  }
  return null;
};

// Main page component
export default function SellPage() {
  const router = useRouter();

  // You can use the location here if needed
  const location = getLocation();

  return (
    <div>
      {/* Add your sell page content here */}
      <h1>Sell Page</h1>
    </div>
  );
}
