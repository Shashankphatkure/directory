import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getOrCreateCart(userId) {
  if (!userId) return null;

  // Try to find existing cart
  let { data: cart } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", userId)
    .single();

  // If no cart exists, create one
  if (!cart) {
    const { data: newCart, error } = await supabase
      .from("carts")
      .insert([{ user_id: userId }])
      .select()
      .single();

    if (error) throw error;
    cart = newCart;
  }

  return cart;
}

export async function getCartItems(cartId) {
  const { data: items, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cartId);

  if (error) throw error;
  return items;
}

export async function updateCartItem(cartId, item) {
  // First check if the item already exists in the cart
  const { data: existingItems } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cartId)
    .eq("listing_id", item.listing_id)
    .single();

  if (existingItems) {
    // If item exists, update the quantity
    const { error } = await supabase
      .from("cart_items")
      .update({
        quantity: existingItems.quantity + 1,
      })
      .eq("cart_id", cartId)
      .eq("listing_id", item.listing_id);

    if (error) throw error;
  } else {
    // If item doesn't exist, insert new item
    const { error } = await supabase.from("cart_items").insert({
      cart_id: cartId,
      title: item.title,
      price: item.price,
      shipping: item.shipping,
      quantity: item.quantity,
      seller: item.seller,
      image: item.image,
      listing_id: item.listing_id,
    });

    if (error) throw error;
  }
}

export async function removeCartItem(itemId) {
  const { error } = await supabase.from("cart_items").delete().eq("id", itemId);

  if (error) throw error;
}
