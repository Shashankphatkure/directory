"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "1oz Gold American Eagle",
      price: 1950.0,
      shipping: 15.0,
      quantity: 1,
      seller: "GoldExpert",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
    },
    {
      id: 2,
      title: "Silver Canadian Maple x5",
      price: 165.0,
      shipping: 8.0,
      quantity: 1,
      seller: "SilverTrader",
      image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingTotal = cartItems.reduce((sum, item) => sum + item.shipping, 0);
  const total = subtotal + shippingTotal;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
        Shopping Cart ({cartItems.length} items)
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="card divide-y divide-[#C0C0C0]/20">
            {cartItems.map((item) => (
              <div key={item.id} className="p-6">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-[#C0C0C0] font-medium mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#C0C0C0]/60 mb-2">
                      Sold by: {item.seller}
                    </p>
                    <div className="flex items-center gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded-full hover:bg-[#333333] text-[#C0C0C0]/60"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="text-[#C0C0C0] w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded-full hover:bg-[#333333] text-[#C0C0C0]/60"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-400 flex items-center gap-1"
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="text-[#50C878] font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-sm text-[#C0C0C0]/60">
                      +${item.shipping.toFixed(2)} shipping
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-[#C0C0C0]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#C0C0C0]">
                <span>Shipping</span>
                <span>${shippingTotal.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-[#C0C0C0]/20">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-[#C0C0C0]">Total</span>
                  <span className="text-[#50C878]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-[#4169E1] text-white py-3 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
              >
                Proceed to Checkout
              </button>

              <div className="text-center text-sm text-[#C0C0C0]/60">
                <p>✓ Secure Checkout</p>
                <p>✓ Protected by PeerMetals Guarantee</p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-4 card p-4">
            <div className="flex items-center justify-center gap-4">
              <Image src="/visa.png" alt="Visa" width={40} height={25} />
              <Image
                src="/mastercard.png"
                alt="Mastercard"
                width={40}
                height={25}
              />
              <Image
                src="/amex.png"
                alt="American Express"
                width={40}
                height={25}
              />
              <Image src="/paypal.png" alt="PayPal" width={40} height={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
