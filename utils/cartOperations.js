export const getOrCreateCart = async () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  return { id: localStorage.getItem("tempCartId"), items: cart };
};

export const updateCartItem = async (cartId, item) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existingItemIndex = cart.findIndex(
    (i) => i.listing_id === item.listing_id
  );

  if (existingItemIndex > -1) {
    cart[existingItemIndex] = { ...cart[existingItemIndex], ...item };
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

export const removeCartItem = async (cartId, itemId) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const updatedCart = cart.filter((item) => item.listing_id !== itemId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  return updatedCart;
};

export const getCartItems = async () => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const clearCart = async () => {
  localStorage.removeItem("cart");
  localStorage.removeItem("tempCartId");
};
