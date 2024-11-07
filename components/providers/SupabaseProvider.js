"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionProvider, useSession } from "next-auth/react";

const SupabaseContext = createContext();

function SupabaseProviderInternal({ children }) {
  const supabase = createClientComponentClient();
  const { data: session } = useSession();

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export default function SupabaseProvider({ children }) {
  return (
    <SessionProvider>
      <SupabaseProviderInternal>{children}</SupabaseProviderInternal>
    </SessionProvider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
}
