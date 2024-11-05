import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-6 card">
        <div>
          <h2 className="text-2xl font-bold text-center text-[#C0C0C0]">
            Create your account
          </h2>
        </div>
        <RegisterForm />
        <div className="text-center text-[#C0C0C0]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#4169E1] hover:text-[#4169E1]/80"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
