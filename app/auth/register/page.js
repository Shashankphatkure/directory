"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    fullName: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Check if username already exists
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", formData.username)
        .single();

      if (existingUser) {
        setError("Username already taken");
        setIsLoading(false);
        return;
      }

      // Register with Supabase
      const {
        data: { user },
        error: signUpError,
      } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
            full_name: formData.fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (user) {
        try {
          // Create profile record
          const { error: profileError } = await supabase
            .from("profiles")
            .upsert(
              {
                id: user.id,
                username: formData.username,
                full_name: formData.fullName,
                reputation: 0,
                is_verified: false,
              },
              { onConflict: "id" }
            );

          if (profileError) throw profileError;

          // Sign in automatically after registration
          const result = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
          });

          if (result.error) {
            setError("Error signing in after registration");
            return;
          }

          router.push("/");
          router.refresh();
        } catch (error) {
          // If profile creation fails, delete the auth user
          await supabase.auth.admin.deleteUser(user.id);
          throw error;
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.message.includes("duplicate key")) {
        if (error.message.includes("profiles_username_key")) {
          setError("Username already taken");
        } else if (error.message.includes("profiles_pkey")) {
          setError("An account with this email already exists");
        } else {
          setError("A user with these details already exists");
        }
      } else {
        setError(error.message || "An error occurred during registration");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#333333] flex items-center justify-center">
      <div className="bg-[#2A2A2A] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#FFD700] mb-6">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#C0C0C0] mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1A1A1A] border border-[#C0C0C0]/20 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-[#C0C0C0] mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1A1A1A] border border-[#C0C0C0]/20 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-[#C0C0C0] mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1A1A1A] border border-[#C0C0C0]/20 text-white"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FFD700] text-[#1A1A1A] py-3 rounded-lg font-semibold hover:bg-[#F5C400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-[#C0C0C0]">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-[#4169E1] hover:text-[#4169E1]/80 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
