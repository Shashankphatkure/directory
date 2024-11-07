"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result.error) {
        setError("Invalid credentials");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred during sign in");
    }
  };

  return (
    <div className="min-h-screen bg-[#333333] flex items-center justify-center">
      <div className="bg-[#2A2A2A] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#FFD700] mb-6">Sign In</h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#C0C0C0] mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1A1A1A] border border-[#C0C0C0]/20 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-[#C0C0C0] mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1A1A1A] border border-[#C0C0C0]/20 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFD700] text-[#1A1A1A] py-3 rounded-lg font-semibold hover:bg-[#F5C400] transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-[#C0C0C0]">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-[#4169E1] hover:text-[#4169E1]/80 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
