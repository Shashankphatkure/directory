"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function ListingsManagement() {
  const router = useRouter();
  const [selectedListings, setSelectedListings] = useState([]);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  const listingStats = [
    { label: "Active Listings", value: 24, change: "+3", trend: "up" },
    { label: "Total Views", value: "2.4K", change: "+12%", trend: "up" },
    { label: "Average Price", value: "$1,450", change: "-2%", trend: "down" },
    { label: "Sold Items", value: 156, change: "+8", trend: "up" },
  ];

  const listings = [
    {
      id: 1,
      title: "1oz Gold American Eagle 2024",
      price: 1950.0,
      status: "active",
      views: 245,
      likes: 12,
      date: "2024-02-28",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
    },
    // Add more listings...
  ];

  const handleMassAction = (action) => {
    // Handle mass actions (delete, update, etc.)
    console.log(`Mass ${action}:`, selectedListings);
  };

  const toggleSelectAll = () => {
    if (selectedListings.length === listings.length) {
      setSelectedListings([]);
    } else {
      setSelectedListings(listings.map((listing) => listing.id));
    }
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
          Manage Listings
        </h1>
        <button
          onClick={() => router.push("/seller/listings/new")}
          className="bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
        >
          Create Listing
        </button>
      </div>

      {/* Listings Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {listingStats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#C0C0C0]/60">{stat.label}</p>
                <h3 className="text-2xl font-bold text-[#C0C0C0] mt-1">
                  {stat.value}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    stat.trend === "up" ? "text-[#50C878]" : "text-red-500"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Mass Actions */}
      <div className="card p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search listings..."
              className="bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
            />
            <button className="flex items-center gap-2 text-[#C0C0C0] hover:text-[#4169E1] transition-colors">
              <FunnelIcon className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Mass Actions */}
          <div className="flex items-center gap-4">
            {selectedListings.length > 0 && (
              <>
                <button
                  onClick={() => handleMassAction("edit")}
                  className="flex items-center gap-2 text-[#4169E1] hover:text-[#4169E1]/80 transition-colors"
                >
                  <PencilIcon className="h-5 w-5" />
                  <span>Edit Selected</span>
                </button>
                <button
                  onClick={() => handleMassAction("delete")}
                  className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
                >
                  <TrashIcon className="h-5 w-5" />
                  <span>Delete Selected</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Listings Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#333333]">
                <th className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedListings.length === listings.length}
                    onChange={toggleSelectAll}
                    className="rounded border-[#C0C0C0]/20 text-[#4169E1] focus:ring-[#4169E1]"
                  />
                </th>
                <th className="p-4 text-left text-[#C0C0C0]/60">Listing</th>
                <th
                  className="p-4 text-left text-[#C0C0C0]/60 cursor-pointer"
                  onClick={() => toggleSort("price")}
                >
                  <div className="flex items-center gap-2">
                    Price
                    {sortField === "price" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th className="p-4 text-left text-[#C0C0C0]/60">Status</th>
                <th className="p-4 text-left text-[#C0C0C0]/60">Views</th>
                <th className="p-4 text-left text-[#C0C0C0]/60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C0C0C0]/20">
              {listings.map((listing) => (
                <tr
                  key={listing.id}
                  className="hover:bg-[#333333]/50 transition-colors"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedListings.includes(listing.id)}
                      onChange={() => {
                        if (selectedListings.includes(listing.id)) {
                          setSelectedListings(
                            selectedListings.filter((id) => id !== listing.id)
                          );
                        } else {
                          setSelectedListings([
                            ...selectedListings,
                            listing.id,
                          ]);
                        }
                      }}
                      className="rounded border-[#C0C0C0]/20 text-[#4169E1] focus:ring-[#4169E1]"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-[#C0C0C0] font-medium">
                          {listing.title}
                        </div>
                        <div className="text-sm text-[#C0C0C0]/60">
                          Listed on {listing.date}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-[#50C878] font-medium">
                      ${listing.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-[#50C878]/10 text-[#50C878] rounded-full text-sm">
                      {listing.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-[#C0C0C0]/60">
                      <EyeIcon className="h-4 w-4" />
                      {listing.views}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-[#4169E1] hover:bg-[#333333] rounded-lg transition-colors">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-[#333333] rounded-lg transition-colors">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-[#C0C0C0]/60">Showing 1-10 of 24 listings</div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-[#C0C0C0]/20 rounded-lg text-[#C0C0C0] hover:bg-[#333333] transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 bg-[#4169E1] text-white rounded-lg hover:bg-[#4169E1]/80 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
