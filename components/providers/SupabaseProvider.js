"use client";
import { createContext, useContext } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const SupabaseContext = createContext();

export default function SupabaseProvider({ children }) {
  const supabase = createClientComponentClient();

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};
