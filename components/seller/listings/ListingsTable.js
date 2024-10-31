"use client";
import { useState } from "react";
import Image from "next/image";

export default function ListingsTable() {
  // Mock data - replace with real data later
  const [listings, setListings] = useState([
    {
      id: 1,
      image: "/products/gold-eagle.jpg",
      title: "1oz Gold American Eagle",
      price: 1899.99,
      status: "active",
      views: 245,
      likes: 12,
      created: "2024-02-15",
      metalType: "Gold",
    },
    {
      id: 2,
      image: "/products/silver-morgan.jpg",
      title: "1889-CC Morgan Silver Dollar",
      price: 899.99,
      status: "sold",
      views: 189,
      likes: 8,
      created: "2024-02-14",
      metalType: "Silver",
    },
    // Add more mock listings...
  ]);

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      sold: "bg-blue-100 text-blue-800",
      draft: "bg-gray-100 text-gray-800",
      inactive: "bg-red-100 text-red-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stats
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {listings.map((listing) => (
            <tr key={listing.id}>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-16 w-16 relative flex-shrink-0">
                    <Image
                      src={listing.image}
                      alt={listing.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {listing.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {listing.metalType}
                    </div>
                    <div className="text-xs text-gray-500">
                      Listed on {listing.created}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                    listing.status
                  )}`}
                >
                  {listing.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                ${listing.price.toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {listing.views} views
                </div>
                <div className="text-sm text-gray-500">
                  {listing.likes} likes
                </div>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
