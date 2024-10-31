"use client";
import { useState } from "react";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import Image from "next/image";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("wallet");

  // Mock data
  const walletBalance = 3827.12;
  const shippingAddress = {
    name: "John Smith",
    street: "1234 Candy Cane Lane",
    city: "Asheville",
    state: "NC",
    zip: "28801",
    country: "United States",
    phone: "(828)222-2222",
  };

  const orderItems = [
    {
      id: 1,
      title: "2024 PCGS MS-70 First Strike ASE",
      seller: "Slabz4Dayz",
      price: 45.0,
      shipping: 5.0,
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
    },
    {
      id: 2,
      title: "Silver Canadian Maple x5 Lot",
      seller: "Nashemon007",
      price: 165.0,
      shipping: 5.0,
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Payment and Shipping */}
            <div className="space-y-6">
              {/* Payment Method Selection */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Pay With</h2>

                {/* Wallet Option */}
                <div className="mb-6">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wallet"
                      checked={paymentMethod === "wallet"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Wallet Balance</div>
                      <div className="text-2xl font-bold">
                        ${walletBalance.toFixed(2)}
                      </div>
                      <button className="text-blue-600 text-sm hover:text-blue-700">
                        Reload Wallet
                      </button>
                    </div>
                  </label>
                </div>

                {/* Other Payment Methods */}
                <div className="space-y-3">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="visa"
                      checked={paymentMethod === "visa"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div>Pay with Visa x1234</div>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ach"
                      checked={paymentMethod === "ach"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div>Pay with ACH Transfer x1234</div>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bitcoin"
                      checked={paymentMethod === "bitcoin"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div>Pay with Bitcoin</div>
                  </label>

                  <button className="w-full p-4 border rounded-lg text-left hover:bg-gray-50">
                    + Add Another Method
                  </button>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">Ship To</h2>
                  <button className="text-blue-600 hover:text-blue-700">
                    Change Address
                  </button>
                </div>
                <div className="text-gray-600">
                  <p className="font-medium text-gray-900">
                    {shippingAddress.name}
                  </p>
                  <p>{shippingAddress.street}</p>
                  <p>
                    {shippingAddress.city}, {shippingAddress.state}{" "}
                    {shippingAddress.zip}
                  </p>
                  <p>{shippingAddress.country}</p>
                  <p className="mt-2">{shippingAddress.phone}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600">
                          Sold by: {item.seller}
                        </p>
                        <div className="flex justify-between mt-2">
                          <span>${item.price.toFixed(2)}</span>
                          <span className="text-gray-500">
                            +${item.shipping.toFixed(2)} shipping
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Items (2)</span>
                    <span>$210.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>$10.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>$220.00</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Confirm and Pay
                </button>

                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>✓ Purchase protected by PeerMetals.com</p>
                  <p className="mt-2">
                    By placing your order, you agree to PeerMetals's{" "}
                    <a href="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
