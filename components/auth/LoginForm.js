"use client";
import { useState } from "react";
import { signInWithEmail } from "@/utils/supabase/auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await signInWithEmail(email, password);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/profile");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#C0C0C0]"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-[#333333] bg-[#2A2A2A] text-[#C0C0C0] px-3 py-2"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[#C0C0C0]"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border border-[#333333] bg-[#2A2A2A] text-[#C0C0C0] px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#4169E1] text-white px-4 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
      >
        Sign In
      </button>
    </form>
  );
}
