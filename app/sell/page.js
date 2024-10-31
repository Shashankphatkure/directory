"use client";
import { useRouter } from "next/navigation";

export default function SellPage() {
  const router = useRouter();

  // Redirect to create listing page
  router.push("/seller/listings/new");

  return null; // Return null since we're redirecting
}
