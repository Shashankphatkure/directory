import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export async function getOrCreateCart(userId) {
  // First, try to find an existing active cart
  const { data: existingCart, error: fetchError } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116 is "no rows returned"
    throw fetchError;
  }

  if (existingCart) {
    return existingCart;
  }

  // If no active cart exists, create a new one
  const { data: newCart, error: insertError } = await supabase
    .from("carts")
    .insert([
      {
        user_id: userId,
        status: "active",
      },
    ])
    .select()
    .single();

  if (insertError) {
    throw insertError;
  }

  return newCart;
}

export async function getCartItems(cartId) {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
      *,
      listings (
        title,
        price,
        image_url,
        shipping_price,
        user_id,
        profiles (
          username,
          full_name
        )
      )
    `
    )
    .eq("cart_id", cartId);

  if (error) {
    throw error;
  }

  return data.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    title: item.listings.title,
    price: item.listings.price,
    image: item.listings.image_url,
    shipping: item.listings.shipping_price,
    seller: item.listings.profiles.full_name || item.listings.profiles.username,
  }));
}

export async function updateCartItem(cartId, item) {
  const { error } = await supabase
    .from("cart_items")
    .update({ quantity: item.quantity })
    .eq("id", item.id)
    .eq("cart_id", cartId);

  if (error) {
    throw error;
  }
}

export async function removeCartItem(itemId) {
  const { error } = await supabase.from("cart_items").delete().eq("id", itemId);

  if (error) {
    throw error;
  }
}
