"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  getCartItems,
  updateCartItem,
  removeCartItem,
} from "@/utils/cartOperations";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const items = await getCartItems();
      setCartItems(items);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (listing_id, change) => {
    const updatedItems = cartItems.map((item) =>
      item.listing_id === listing_id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );

    const updatedItem = updatedItems.find(
      (item) => item.listing_id === listing_id
    );

    if (updatedItem) {
      setCartItems(updatedItems); // Update UI first
      try {
        await updateCartItem(null, updatedItem);
      } catch (error) {
        console.error("Error updating quantity:", error);
        // Revert on error
        setCartItems(cartItems);
      }
    }
  };

  const removeItem = async (listing_id) => {
    setCartItems((items) =>
      items.filter((item) => item.listing_id !== listing_id)
    ); // Update UI first
    try {
      await removeCartItem(null, listing_id);
    } catch (error) {
      console.error("Error removing item:", error);
      // Revert on error
      loadCart();
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-[#C0C0C0]">Loading cart...</div>
      </div>
    );
  }

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
          {cartItems.length === 0 ? (
            <div className="card p-6 text-center text-[#C0C0C0]/60">
              Your cart is empty
            </div>
          ) : (
            <div className="card divide-y divide-[#C0C0C0]/20">
              {cartItems.map((item) => (
                <div key={item.listing_id} className="p-6">
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
                            onClick={() => updateQuantity(item.listing_id, -1)}
                            className="p-1 rounded-full hover:bg-[#333333] text-[#C0C0C0]/60"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="text-[#C0C0C0] w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.listing_id, 1)}
                            className="p-1 rounded-full hover:bg-[#333333] text-[#C0C0C0]/60"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.listing_id)}
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
          )}
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
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>

              <div className="text-center text-sm text-[#C0C0C0]/60">
                <p>✓ Secure Checkout</p>
                <p>✓ Protected by PeerMetals Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
