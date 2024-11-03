"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "market analysis",
    "investment tips",
    "precious metals",
    "industry news",
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Gold Market Outlook 2024: What to Expect",
      excerpt:
        "An in-depth analysis of gold market trends and predictions for the coming year...",
      category: "market analysis",
      author: "Sarah Johnson",
      date: "Feb 28, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      featured: true,
    },
    {
      id: 2,
      title: "Silver Investment Strategies for Beginners",
      excerpt:
        "A comprehensive guide to starting your silver investment journey...",
      category: "investment tips",
      author: "Michael Chen",
      date: "Feb 25, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
    },
    {
      id: 3,
      title: "Understanding Platinum Market Dynamics",
      excerpt:
        "Exploring the factors that influence platinum prices and market trends...",
      category: "precious metals",
      author: "David Williams",
      date: "Feb 23, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
    },
    {
      id: 4,
      title: "New Regulations in Precious Metals Trading",
      excerpt:
        "Recent regulatory changes affecting the precious metals market...",
      category: "industry news",
      author: "Emma Thompson",
      date: "Feb 20, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356",
    },
  ];

  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
        PeerMetals Blog
      </h1>

      {/* Featured Post */}
      {blogPosts.find((post) => post.featured) && (
        <div className="card p-6 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative aspect-[16/9] md:aspect-auto">
              <Image
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <span className="text-[#4169E1] text-sm font-medium">
                Featured Post
              </span>
              <h2 className="text-2xl font-bold text-[#FFD700]">
                {blogPosts[0].title}
              </h2>
              <p className="text-[#C0C0C0]/80">{blogPosts[0].excerpt}</p>
              <div className="flex items-center space-x-4 text-sm text-[#C0C0C0]/60">
                <span>{blogPosts[0].author}</span>
                <span>•</span>
                <span>{blogPosts[0].date}</span>
                <span>•</span>
                <span>{blogPosts[0].readTime}</span>
              </div>
              <Link
                href={`/blog/${blogPosts[0].id}`}
                className="inline-block bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                selectedCategory === category
                  ? "bg-[#4169E1] text-white"
                  : "bg-[#333333] text-[#C0C0C0] hover:bg-[#4169E1]/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts
          .filter((post) => !post.featured)
          .map((post) => (
            <article key={post.id} className="card overflow-hidden group">
              <div className="relative aspect-[16/9]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <span className="text-[#4169E1] text-sm font-medium capitalize">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-3 text-[#FFD700]">
                  {post.title}
                </h3>
                <p className="text-[#C0C0C0]/80 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-[#C0C0C0]/60">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16 card p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">Stay Updated</h2>
        <p className="text-[#C0C0C0]/80 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest market insights, trading
          tips, and precious metals news.
        </p>
        <div className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-[#333333] border border-[#C0C0C0]/20 rounded-l-lg px-4 py-2 text-[#C0C0C0]"
          />
          <button className="bg-[#4169E1] text-white px-6 py-2 rounded-r-lg hover:bg-[#4169E1]/80 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
