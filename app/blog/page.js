"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  const categories = [
    "all",
    "market analysis",
    "investment tips",
    "precious metals",
    "industry news",
  ];

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("date", { ascending: false });

        if (error) throw error;
        setBlogPosts(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
        PeerMetals Blog
      </h1>

      {/* Featured Post */}
      {blogPosts.find((post) => post.featured) && (
        <div className="card p-6 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <Link
              href={`/blog/${blogPosts[0].id}`}
              className="relative aspect-[16/9] md:aspect-auto"
            >
              <Image
                src={blogPosts[0].image_url || "/placeholder-image.jpg"}
                alt={blogPosts[0].title}
                fill
                className="object-cover rounded-lg hover:opacity-90 transition-opacity"
              />
            </Link>
            <div className="space-y-4">
              <span className="text-[#4169E1] text-sm font-medium">
                Featured Post
              </span>
              <Link href={`/blog/${blogPosts[0].id}`}>
                <h2 className="text-2xl font-bold text-[#FFD700] hover:text-[#FFD700]/80 transition-colors">
                  {blogPosts[0].title}
                </h2>
              </Link>
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
              <Link href={`/blog/${post.id}`} className="block">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={post.image_url || "/placeholder-image.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                </div>
              </Link>
              <div className="p-6">
                <span className="text-[#4169E1] text-sm font-medium capitalize">
                  {post.category}
                </span>
                <Link href={`/blog/${post.id}`}>
                  <h3 className="text-xl font-bold mt-2 mb-3 text-[#FFD700] hover:text-[#FFD700]/80 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-[#C0C0C0]/80 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-[#C0C0C0]/60">
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}
