import ProductCard from "../marketplace/ProductCard";

export default function ListingsGrid({ username }) {
  // Mock data - replace with real data later
  const listings = [
    {
      id: 1,
      title: "1oz Gold American Eagle",
      seller: username,
      price: 1899.99,
      shippingPrice: 9.99,
      image: "/products/gold-eagle.jpg",
      likes: 15,
      dislikes: 0,
      comments: 3,
    },
    // Add more mock listings...
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ProductCard key={listing.id} product={listing} />
      ))}
    </div>
  );
}
