"use client";
import { useState, useEffect } from "react";
import FilterBar from "@/components/marketplace/FilterBar";
import ProductCard from "@/components/marketplace/ProductCard";
import { fetchListings } from "@/utils/supabase/queries";

export default function MarketplacePage() {
  const [sortBy, setSortBy] = useState("newest");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    metalType: null,
    condition: null,
    minPrice: null,
    maxPrice: null,
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadListings();
  }, [sortBy, filters, page]);

  const loadListings = async (reset = false) => {
    try {
      setLoading(true);
      const { data, count } = await fetchListings({
        sortBy,
        ...filters,
        page: reset ? 1 : page,
      });

      if (reset) {
        setListings(data);
        setPage(1);
      } else {
        setListings((prev) => [...prev, ...data]);
      }

      setHasMore(data.length === 12); // Assuming limit is 12
    } catch (error) {
      console.error("Error loading listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    loadListings(true); // Reset listings when filters change
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
          Marketplace
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-[#C0C0C0]/60">Sort by:</span>
          <select
            className="bg-[#333333] text-[#C0C0C0] border border-[#C0C0C0]/20 rounded-lg px-4 py-2 appearance-none"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              loadListings(true);
            }}
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="lg:w-1/4">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {loading && listings.length === 0 ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <ProductCard
                    key={listing.id}
                    product={{
                      id: listing.id,
                      title: listing.title,
                      price: listing.price,
                      shipping: 0, // Add shipping cost if you have it in your database
                      seller: listing.profiles.username,
                      rep: listing.profiles.reputation,
                      image: listing.images?.[0] || "/placeholder.jpg",
                      condition: listing.condition,
                      year: listing.year,
                    }}
                  />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="mt-8 text-center">
                  <button
                    className="bg-[#4169E1] text-white px-8 py-3 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
                    onClick={loadMore}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
