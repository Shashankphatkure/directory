"use client";
import { SessionProvider } from "next-auth/react";

export default function SupabaseProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
