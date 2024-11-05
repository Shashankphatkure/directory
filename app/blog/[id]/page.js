"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function BlogPost({ params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchBlogPost() {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [params.id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">Blog post not found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/blog"
        className="text-[#4169E1] mb-8 inline-block hover:underline"
      >
        ← Back to Blog
      </Link>

      <article className="max-w-4xl mx-auto">
        <div className="relative aspect-[16/9] mb-8">
          <Image
            src={post.image_url || "/placeholder-image.jpg"}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
            }}
          />
        </div>

        <div className="space-y-4">
          <span className="text-[#4169E1] text-sm font-medium capitalize">
            {post.category}
          </span>

          <h1 className="text-4xl font-bold text-[#FFD700]">{post.title}</h1>

          <div className="flex items-center space-x-4 text-sm text-[#C0C0C0]/60">
            <span>{post.author}</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{post.read_time}</span>
          </div>

          <div className="prose prose-invert max-w-none mt-8">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  );
}
