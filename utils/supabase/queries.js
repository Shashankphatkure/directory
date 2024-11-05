import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function fetchListings({
  sortBy = "created_at",
  metalType = null,
  condition = null,
  minPrice = null,
  maxPrice = null,
  page = 1,
  limit = 12,
}) {
  const supabase = createClientComponentClient();

  // Start building the query
  let query = supabase
    .from("listings")
    .select(
      `
      *,
      profiles:user_id (
        username,
        reputation
      )
    `
    )
    .eq("status", "active");

  // Apply filters
  if (metalType) {
    query = query.eq("metal_type", metalType);
  }
  if (condition) {
    query = query.eq("condition", condition);
  }
  if (minPrice) {
    query = query.gte("price", minPrice);
  }
  if (maxPrice) {
    query = query.lte("price", maxPrice);
  }

  // Apply sorting
  switch (sortBy) {
    case "price-low":
      query = query.order("price", { ascending: true });
      break;
    case "price-high":
      query = query.order("price", { ascending: false });
      break;
    case "popular":
      query = query.order("views", { ascending: false });
      break;
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
  }

  // Apply pagination
  const from = (page - 1) * limit;
  query = query.range(from, from + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return { data, count };
}

export async function fetchSingleListing(listingId) {
  const supabase = createClientComponentClient();

  const { data: listing, error } = await supabase
    .from("listings")
    .select(
      `
      *,
      profiles:user_id (
        id,
        username,
        reputation,
        created_at
      )
    `
    )
    .eq("id", listingId)
    .single();

  if (error) {
    throw error;
  }

  return listing;
}
