"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function SuccessPage() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Get the last order details
    const lastOrder = localStorage.getItem("lastOrder");

    if (!lastOrder) {
      // Only redirect if there's no order data at all
      router.push("/");
      return;
    }

    setOrderDetails(JSON.parse(lastOrder));
  }, []);

  if (!orderDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-[#C0C0C0]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="h-16 w-16 text-[#50C878]" />
        </div>

        <h1 className="text-3xl font-bold text-[#C0C0C0] mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-[#C0C0C0]/60 mb-8">
          Thank you for your purchase. We'll send you an email with your order
          details shortly.
        </p>

        <div className="card p-6 mb-8">
          <div className="text-[#C0C0C0]/80 space-y-2">
            <p>Your order has been confirmed and will be shipped soon.</p>
            <p>Order number: #{orderDetails.id}</p>
            <p>Order total: ${orderDetails.total.toFixed(2)}</p>
            <p>
              Order date: {new Date(orderDetails.date).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/marketplace"
            className="px-6 py-2 bg-[#4169E1] text-white rounded-lg hover:bg-[#4169E1]/80 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="px-6 py-2 border border-[#C0C0C0]/20 text-[#C0C0C0] rounded-lg hover:bg-[#333333] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
