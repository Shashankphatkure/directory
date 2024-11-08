"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";

export default function ListingsManagement() {
  const router = useRouter();
  const { supabase, session } = useSupabase();
  const [selectedListings, setSelectedListings] = useState([]);
  const [sortField, setSortField] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMetalType, setFilterMetalType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [stats, setStats] = useState({
    activeListings: 0,
    totalViews: 0,
    averagePrice: 0,
    soldItems: 0,
  });

  // Fetch listings and calculate stats
  const fetchListings = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("user_id", session.user.id)
        .order(sortField, { ascending: sortDirection === "asc" });

      if (error) throw error;

      // Apply filters
      let filteredData = data;

      if (searchQuery) {
        filteredData = filteredData.filter(
          (listing) =>
            listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }

      if (filterStatus !== "all") {
        filteredData = filteredData.filter(
          (listing) => listing.status === filterStatus
        );
      }

      if (filterMetalType !== "all") {
        filteredData = filteredData.filter(
          (listing) => listing.metal_type === filterMetalType
        );
      }

      setListings(filteredData);

      // Calculate stats
      const activeCount = filteredData.filter(
        (l) => l.status === "active"
      ).length;
      const totalViews = filteredData.reduce(
        (sum, l) => sum + (l.views || 0),
        0
      );
      const avgPrice =
        filteredData.reduce((sum, l) => sum + l.price, 0) / filteredData.length;
      const soldCount = filteredData.filter((l) => l.status === "sold").length;

      setStats({
        activeListings: activeCount,
        totalViews: totalViews,
        averagePrice: avgPrice || 0,
        soldItems: soldCount,
      });
    } catch (error) {
      console.error("Error fetching listings:", error);
      alert("Error fetching listings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchListings();
    }
  }, [
    session,
    sortField,
    sortDirection,
    searchQuery,
    filterStatus,
    filterMetalType,
  ]);

  const handleDeleteListing = async (listingId) => {
    try {
      const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", listingId);

      if (error) throw error;

      // Remove listing images from storage
      const listing = listings.find((l) => l.id === listingId);
      if (listing?.images?.length) {
        await Promise.all(
          listing.images.map(async (imageUrl) => {
            const path = imageUrl.split("/").pop();
            await supabase.storage.from("listing-images").remove([path]);
          })
        );
      }

      setListings(listings.filter((l) => l.id !== listingId));
      setShowDeleteConfirm(false);
      setListingToDelete(null);
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Error deleting listing. Please try again.");
    }
  };

  const handleUpdateStatus = async (listingId, newStatus) => {
    try {
      const { error } = await supabase
        .from("listings")
        .update({ status: newStatus })
        .eq("id", listingId);

      if (error) throw error;

      setListings(
        listings.map((listing) =>
          listing.id === listingId ? { ...listing, status: newStatus } : listing
        )
      );
    } catch (error) {
      console.error("Error updating listing status:", error);
      alert("Error updating listing status. Please try again.");
    }
  };

  const handleMassAction = async (action) => {
    try {
      if (action === "delete") {
        await Promise.all(
          selectedListings.map((id) => handleDeleteListing(id))
        );
      } else if (action === "activate" || action === "deactivate") {
        const newStatus = action === "activate" ? "active" : "inactive";
        await Promise.all(
          selectedListings.map((id) => handleUpdateStatus(id, newStatus))
        );
      }
      setSelectedListings([]);
    } catch (error) {
      console.error(`Error performing mass ${action}:`, error);
      alert(`Error performing mass ${action}. Please try again.`);
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
      {/* Header */}
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#C0C0C0]/60">Active Listings</p>
              <h3 className="text-2xl font-bold text-[#C0C0C0] mt-1">
                {stats.activeListings}
              </h3>
            </div>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#C0C0C0]/60">Total Views</p>
              <h3 className="text-2xl font-bold text-[#C0C0C0] mt-1">
                {stats.totalViews.toLocaleString()}
              </h3>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <EyeIcon className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#C0C0C0]/60">Average Price</p>
              <h3 className="text-2xl font-bold text-[#C0C0C0] mt-1">
                ${stats.averagePrice.toFixed(2)}
              </h3>
            </div>
            <div className="p-2 bg-[#FFD700]/10 rounded-lg">
              <ArrowPathIcon className="h-6 w-6 text-[#FFD700]" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#C0C0C0]/60">Sold Items</p>
              <h3 className="text-2xl font-bold text-[#C0C0C0] mt-1">
                {stats.soldItems}
              </h3>
            </div>
            <div className="p-2 bg-[#50C878]/10 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-[#50C878]" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search listings..."
                className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded-lg pl-10 pr-4 py-2 text-[#C0C0C0]"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C0C0C0]/60" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-[#C0C0C0] hover:text-[#4169E1] transition-colors"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {selectedListings.length > 0 && (
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleMassAction("activate")}
                className="flex items-center gap-2 text-[#50C878] hover:text-[#50C878]/80 transition-colors"
              >
                <CheckCircleIcon className="h-5 w-5" />
                <span>Activate Selected</span>
              </button>
              <button
                onClick={() => handleMassAction("deactivate")}
                className="flex items-center gap-2 text-[#C0C0C0] hover:text-[#C0C0C0]/80 transition-colors"
              >
                <PencilIcon className="h-5 w-5" />
                <span>Deactivate Selected</span>
              </button>
              <button
                onClick={() => handleMassAction("delete")}
                className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
              >
                <TrashIcon className="h-5 w-5" />
                <span>Delete Selected</span>
              </button>
            </div>
          )}
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-[#333333] grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[#C0C0C0]/60 mb-1">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded-lg px-4 py-2 text-[#C0C0C0]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="sold">Sold</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#C0C0C0]/60 mb-1">
                Metal Type
              </label>
              <select
                value={filterMetalType}
                onChange={(e) => setFilterMetalType(e.target.value)}
                className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded-lg px-4 py-2 text-[#C0C0C0]"
              >
                <option value="all">All Metals</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Platinum">Platinum</option>
                <option value="Palladium">Palladium</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#C0C0C0]/60 mb-1">
                Sort By
              </label>
              <select
                value={`${sortField}-${sortDirection}`}
                onChange={(e) => {
                  const [field, direction] = e.target.value.split("-");
                  setSortField(field);
                  setSortDirection(direction);
                }}
                className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded-lg px-4 py-2 text-[#C0C0C0]"
              >
                <option value="created_at-desc">Newest First</option>
                <option value="created_at-asc">Oldest First</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="views-desc">Most Viewed</option>
                <option value="likes-desc">Most Liked</option>
              </select>
            </div>
          </div>
        )}
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
                    onChange={() => {
                      if (selectedListings.length === listings.length) {
                        setSelectedListings([]);
                      } else {
                        setSelectedListings(listings.map((l) => l.id));
                      }
                    }}
                    className="rounded border-[#C0C0C0]/20 text-[#4169E1] focus:ring-[#4169E1]"
                  />
                </th>
                <th className="p-4 text-left text-[#C0C0C0]/60">Listing</th>
                <th className="p-4 text-left text-[#C0C0C0]/60">Details</th>
                <th className="p-4 text-left text-[#C0C0C0]/60">Price</th>
                <th className="p-4 text-left text-[#C0C0C0]/60">Status</th>
                <th className="p-4 text-left text-[#C0C0C0]/60">Stats</th>
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
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={listing.images?.[0] || "/placeholder.jpg"}
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
                          ID: {listing.id.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-[#C0C0C0]/80">
                      <div>{listing.metal_type}</div>
                      <div>
                        {listing.weight} {listing.weight_unit}
                      </div>
                      <div>{listing.condition}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-[#50C878] font-medium">
                      ${listing.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={listing.status}
                      onChange={(e) =>
                        handleUpdateStatus(listing.id, e.target.value)
                      }
                      className="bg-transparent text-sm"
                    >
                      <option value="active" className="bg-[#1A1A1A]">
                        Active
                      </option>
                      <option value="inactive" className="bg-[#1A1A1A]">
                        Inactive
                      </option>
                      <option value="sold" className="bg-[#1A1A1A]">
                        Sold
                      </option>
                      <option value="pending" className="bg-[#1A1A1A]">
                        Pending
                      </option>
                    </select>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-4 text-sm text-[#C0C0C0]/60">
                      <div className="flex items-center gap-1">
                        <EyeIcon className="h-4 w-4" />
                        {listing.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <HeartIcon className="h-4 w-4" />
                        {listing.likes}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          router.push(`/seller/listings/edit/${listing.id}`)
                        }
                        className="p-2 text-[#4169E1] hover:bg-[#333333] rounded-lg transition-colors"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setListingToDelete(listing);
                          setShowDeleteConfirm(true);
                        }}
                        className="p-2 text-red-500 hover:bg-[#333333] rounded-lg transition-colors"
                      >
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

      {/* Delete Confirmation Modal */}
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-[#1A1A1A] rounded-xl p-6 max-w-md w-full">
            <Dialog.Title className="text-lg font-semibold text-[#C0C0C0] mb-4">
              Confirm Delete
            </Dialog.Title>
            <p className="text-[#C0C0C0]/80 mb-6">
              Are you sure you want to delete "{listingToDelete?.title}"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-[#C0C0C0] hover:bg-[#333333] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteListing(listingToDelete?.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
