"use client";

import Image from "next/image";
import { useState } from "react";

// Stock images for the app - updated with working URLs
const STOCK_IMAGES = {
  goldCoin1: "https://images.unsplash.com/photo-1544427920-c49ccfb85579", // Gold coin
  goldCoin2: "https://images.unsplash.com/photo-1605792657660-596af9009e82", // Another gold coin
  silverCoin1: "https://images.unsplash.com/photo-1610375461246-83df859d849d", // Silver coin
  silverCoin2: "https://images.unsplash.com/photo-1574607383476-f517f260d30b", // Another silver coin
  goldBars: "https://images.unsplash.com/photo-1589787168422-e1c58b9c47e7", // Gold bars
  silverBars: "https://images.unsplash.com/photo-1589787168175-90e9e248fc0c", // Silver bars
};

export default function CartItems() {
  // Mock data with updated images
  const [items, setItems] = useState([
    {
      id: 1,
      title: "1oz Gold American Eagle",
      seller: "JohnDoe",
      price: 1899.99,
      shippingPrice: 9.99,
      image: STOCK_IMAGES.goldCoin1,
      quantity: 1,
    },
    {
      id: 2,
      title: "1889-CC Morgan Silver Dollar",
      seller: "JaneSmith",
      price: 899.99,
      shippingPrice: 7.99,
      image: STOCK_IMAGES.silverCoin1,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-sm p-4 flex gap-4"
        >
          <div className="relative w-24 h-24">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">Sold by: {item.seller}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Qty:</label>
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                  className="border rounded px-2 py-1"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-right">
                <div className="font-semibold">${item.price.toFixed(2)}</div>
                <div className="text-sm text-gray-600">
                  + ${item.shippingPrice.toFixed(2)} shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500">Your cart is empty</div>
      )}
    </div>
  );
}
