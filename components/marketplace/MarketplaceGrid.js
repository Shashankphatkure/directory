import ProductCard from "./ProductCard";

export default function MarketplaceGrid() {
  // Mock data - replace with real data later
  const products = [
    {
      id: 1,
      title: "1oz Gold American Eagle",
      seller: "JohnDoe",
      price: 1899.99,
      shippingPrice: 4.99,
      image: "/products/gold-eagle.jpg",
      likes: 24,
      comments: 15,
      status: "new",
    },
    {
      id: 2,
      title: "1889-CC Morgan Silver Dollar",
      seller: "SilverCollector",
      price: 899.99,
      shippingPrice: 4.99,
      image: "/products/morgan-dollar.jpg",
      likes: 18,
      comments: 8,
      status: "featured",
    },
    // Add more mock products...
  ];

  return (
    <div>
      {/* Grid Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600">
          Showing <span className="font-medium">{products.length}</span> items
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select className="text-sm border rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Most Recent</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
}
