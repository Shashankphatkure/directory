"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const orderNumber = "PM" + Math.random().toString().slice(2, 10);

  // Mock order details
  const orderDetails = {
    date: new Date().toLocaleDateString(),
    total: 2138.0,
    shipping: 23.0,
    items: [
      {
        title: "1oz Gold American Eagle",
        price: 1950.0,
        quantity: 1,
      },
      {
        title: "Silver Canadian Maple x5",
        price: 165.0,
        quantity: 1,
      },
    ],
    shippingAddress: {
      name: "John Smith",
      address: "123 Main St",
      city: "New York",
      zip: "10001",
      country: "United States",
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Message */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#50C878]/20 rounded-full mb-4">
          <CheckCircleIcon className="h-10 w-10 text-[#50C878]" />
        </div>
        <h1 className="text-3xl font-bold text-[#C0C0C0] mb-2">
          Order Confirmed!
        </h1>
        <p className="text-[#C0C0C0]/80">
          Thank you for your purchase. Your order number is{" "}
          <span className="text-[#FFD700] font-semibold">{orderNumber}</span>
        </p>
      </div>

      {/* Order Details */}
      <div className="max-w-3xl mx-auto">
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
            Order Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between text-[#C0C0C0]">
              <span>Order Date:</span>
              <span>{orderDetails.date}</span>
            </div>
            <div className="flex justify-between text-[#C0C0C0]">
              <span>Order Number:</span>
              <span>{orderNumber}</span>
            </div>
            <div className="border-t border-[#C0C0C0]/20 pt-4">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between mb-2">
                  <span className="text-[#C0C0C0]">
                    {item.title} x{item.quantity}
                  </span>
                  <span className="text-[#50C878]">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#C0C0C0]/20 pt-4">
              <div className="flex justify-between text-[#C0C0C0]">
                <span>Shipping:</span>
                <span>${orderDetails.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-2">
                <span className="text-[#C0C0C0]">Total:</span>
                <span className="text-[#50C878]">
                  ${orderDetails.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
            Shipping Information
          </h2>
          <div className="text-[#C0C0C0]/80">
            <p className="font-medium text-[#C0C0C0]">
              {orderDetails.shippingAddress.name}
            </p>
            <p>{orderDetails.shippingAddress.address}</p>
            <p>
              {orderDetails.shippingAddress.city},{" "}
              {orderDetails.shippingAddress.zip}
            </p>
            <p>{orderDetails.shippingAddress.country}</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="card p-6 text-center">
          <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
            What's Next?
          </h2>
          <p className="text-[#C0C0C0]/80 mb-6">
            You will receive an email confirmation with tracking information
            once your order ships.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/marketplace"
              className="bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href={`/orders/${orderNumber}`}
              className="border border-[#C0C0C0]/20 text-[#C0C0C0] px-6 py-2 rounded-lg hover:bg-[#333333] transition-colors"
            >
              View Order Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
