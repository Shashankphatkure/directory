"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartSummary() {
  const router = useRouter();
  const [promoCode, setPromoCode] = useState("");

  // Mock data - replace with real calculations later
  const summary = {
    subtotal: 1899.99,
    shipping: 9.99,
    tax: 114.0,
    total: 2023.98,
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${summary.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>${summary.shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated Tax</span>
          <span>${summary.tax.toFixed(2)}</span>
        </div>

        {/* Promo Code Input */}
        <div className="pt-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              Apply
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="pt-3 border-t">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${summary.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
