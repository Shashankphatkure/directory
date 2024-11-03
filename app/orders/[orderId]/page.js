"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircleIcon,
  TruckIcon,
  PackageIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

export default function OrderTrackingPage({ params }) {
  const { orderId } = params;

  // Mock order data
  const orderDetails = {
    orderId: orderId,
    status: "in_transit",
    date: "2024-02-28",
    estimatedDelivery: "2024-03-02",
    trackingNumber: "1Z999AA1234567890",
    carrier: "UPS",
    items: [
      {
        id: 1,
        title: "1oz Gold American Eagle",
        price: 1950.0,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      },
      {
        id: 2,
        title: "Silver Canadian Maple x5",
        price: 165.0,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
      },
    ],
    shipping: {
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    timeline: [
      {
        status: "Order Placed",
        date: "Feb 28, 2024 9:30 AM",
        completed: true,
      },
      {
        status: "Payment Confirmed",
        date: "Feb 28, 2024 9:31 AM",
        completed: true,
      },
      {
        status: "Processing",
        date: "Feb 28, 2024 10:15 AM",
        completed: true,
      },
      {
        status: "Shipped",
        date: "Feb 28, 2024 2:45 PM",
        completed: true,
      },
      {
        status: "Out for Delivery",
        date: "Estimated Mar 2, 2024",
        completed: false,
      },
      {
        status: "Delivered",
        date: "Pending",
        completed: false,
      },
    ],
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Order Placed":
        return <ClockIcon className="h-6 w-6" />;
      case "Payment Confirmed":
        return <CheckCircleIcon className="h-6 w-6" />;
      case "Processing":
        return <PackageIcon className="h-6 w-6" />;
      case "Shipped":
      case "Out for Delivery":
        return <TruckIcon className="h-6 w-6" />;
      case "Delivered":
        return <CheckCircleIcon className="h-6 w-6" />;
      default:
        return <ClockIcon className="h-6 w-6" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
          Order Details
        </h1>
        <div className="text-right">
          <p className="text-[#C0C0C0]/60">Order #{orderDetails.orderId}</p>
          <p className="text-[#C0C0C0]/60">Placed on {orderDetails.date}</p>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
          Order Status
        </h2>
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[#333333]" />

          {/* Timeline Items */}
          <div className="space-y-8">
            {orderDetails.timeline.map((item, index) => (
              <div key={index} className="relative flex items-start">
                <div
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                    item.completed ? "bg-[#50C878]" : "bg-[#333333]"
                  }`}
                >
                  {getStatusIcon(item.status)}
                </div>
                <div className="ml-4">
                  <h3
                    className={`font-medium ${
                      item.completed ? "text-[#C0C0C0]" : "text-[#C0C0C0]/60"
                    }`}
                  >
                    {item.status}
                  </h3>
                  <p className="text-sm text-[#C0C0C0]/60">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Info */}
        {orderDetails.trackingNumber && (
          <div className="mt-8 pt-8 border-t border-[#C0C0C0]/20">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[#C0C0C0]">Tracking Number:</p>
                <p className="text-[#4169E1]">{orderDetails.trackingNumber}</p>
              </div>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4169E1] text-white px-4 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
              >
                Track Package
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
          Order Items
        </h2>
        <div className="space-y-6">
          {orderDetails.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 border-b border-[#C0C0C0]/20 last:border-0 pb-6 last:pb-0"
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-[#C0C0C0] font-medium">{item.title}</h3>
                <p className="text-[#C0C0C0]/60">Quantity: {item.quantity}</p>
                <p className="text-[#50C878] font-bold">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
          Shipping Address
        </h2>
        <div className="text-[#C0C0C0]">
          <p>{orderDetails.shipping.address}</p>
          <p>
            {orderDetails.shipping.city}, {orderDetails.shipping.state}{" "}
            {orderDetails.shipping.zip}
          </p>
          <p>{orderDetails.shipping.country}</p>
        </div>
      </div>

      {/* Need Help */}
      <div className="mt-8 text-center">
        <p className="text-[#C0C0C0]/60 mb-4">Need help with your order?</p>
        <Link
          href="/contact"
          className="text-[#4169E1] hover:text-[#4169E1]/80 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
