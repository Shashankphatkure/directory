"use client";
import { useRouter } from "next/navigation";
import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";
import Image from "next/image";

// Stock images for precious metals - updated with working URLs
const STOCK_IMAGES = {
  goldEagle: "https://images.unsplash.com/photo-1544427920-c49ccfb85579", // Gold Eagle
  goldBuffalo: "https://images.unsplash.com/photo-1605792657660-596af9009e82", // Gold Buffalo
  silverEagle: "https://images.unsplash.com/photo-1574607383476-f517f260d30b", // Silver Eagle
  platinumEagle: "https://images.unsplash.com/photo-1589787168175-90e9e248fc0c", // Platinum Eagle - Updated with a more platinum-looking image
  silverMaple: "https://images.unsplash.com/photo-1589787168422-e1c58b9c47e7", // Silver Maple
};

export default function CartPage() {
  const router = useRouter();

  // Mock data for similar items with updated images
  const similarItems = [
    {
      id: 1,
      title: "American Silver Eagle 1oz",
      price: 30.0,
      image: STOCK_IMAGES.silverEagle,
    },
    {
      id: 2,
      title: "Gold Buffalo 1oz",
      price: 1950.0,
      image: STOCK_IMAGES.goldBuffalo,
    },
    {
      id: 3,
      title: "Silver Canadian Maple",
      price: 28.0,
      image: STOCK_IMAGES.silverMaple,
    },
    {
      id: 4,
      title: "Platinum Eagle 1oz",
      price: 950.0,
      image: STOCK_IMAGES.platinumEagle, // Updated Platinum Eagle image
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
          Shopping Cart
        </h1>
        <span className="text-sm text-[#C0C0C0]/60">
          Send Us Your Feedback!
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="card p-6">
            <CartItems />
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:w-1/3">
          <div className="card p-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Items (2)</span>
                <span>$210.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping to 28704</span>
                <span>$10.00</span>
              </div>
              <div className="pt-4 border-t border-[#C0C0C0]/20 flex justify-between font-semibold">
                <span>Subtotal</span>
                <span className="text-[#50C878]">$210.00</span>
              </div>
            </div>

            <button
              className="w-full mt-6 px-6 py-3 bg-[#4169E1] text-white rounded-lg hover:bg-[#4169E1]/80 transition-colors"
              onClick={() => router.push("/checkout")}
            >
              Go to Checkout
            </button>

            <div className="mt-4 text-center text-sm text-[#C0C0C0]/60">
              <span>✓ Purchase protected by PeerMetals.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explore More Items */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6 text-[#FFD700]">
          Explore More Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarItems.map((item) => (
            <div key={item.id} className="card p-4">
              <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={item.title === "Platinum Eagle 1oz"}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-[#C0C0C0]">{item.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#50C878]">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    className="px-4 py-1 text-sm border border-[#C0C0C0]/20 rounded hover:bg-[#4169E1] hover:text-white transition-all duration-300"
                    onClick={() => {
                      console.log("Adding to cart:", item);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
