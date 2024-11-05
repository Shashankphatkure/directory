"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function BankDetailsPage() {
  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    accountNumber: "",
    routingNumber: "",
    bankName: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;

        if (!user) {
          router.push("/login");
          return;
        }

        const { data, error } = await supabase
          .from("bank_details")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") throw error;

        if (data) {
          setBankDetails({
            accountName: data.account_name || "",
            accountNumber: data.account_number || "",
            routingNumber: data.routing_number || "",
            bankName: data.bank_name || "",
          });
        }
      } catch (error) {
        console.error("Error fetching bank details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBankDetails();
  }, [supabase, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("bank_details").upsert({
        user_id: user.id,
        account_name: bankDetails.accountName,
        account_number: bankDetails.accountNumber,
        routing_number: bankDetails.routingNumber,
        bank_name: bankDetails.bankName,
      });

      if (error) throw error;

      alert("Bank details saved successfully!");
      router.push("/wallet");
    } catch (error) {
      console.error("Error saving bank details:", error);
      alert("Failed to save bank details. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
            Bank Details
          </h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#333333] rounded-lg hover:bg-[#4169E1] transition-colors"
          >
            Back to Wallet
          </button>
        </div>

        <div className="card p-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Account Name
              </label>
              <input
                type="text"
                value={bankDetails.accountName}
                onChange={(e) =>
                  setBankDetails((prev) => ({
                    ...prev,
                    accountName: e.target.value,
                  }))
                }
                className="w-full p-3 bg-[#333333] border border-[#C0C0C0]/20 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={bankDetails.accountNumber}
                onChange={(e) =>
                  setBankDetails((prev) => ({
                    ...prev,
                    accountNumber: e.target.value,
                  }))
                }
                className="w-full p-3 bg-[#333333] border border-[#C0C0C0]/20 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Routing Number
              </label>
              <input
                type="text"
                value={bankDetails.routingNumber}
                onChange={(e) =>
                  setBankDetails((prev) => ({
                    ...prev,
                    routingNumber: e.target.value,
                  }))
                }
                className="w-full p-3 bg-[#333333] border border-[#C0C0C0]/20 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Bank Name
              </label>
              <input
                type="text"
                value={bankDetails.bankName}
                onChange={(e) =>
                  setBankDetails((prev) => ({
                    ...prev,
                    bankName: e.target.value,
                  }))
                }
                className="w-full p-3 bg-[#333333] border border-[#C0C0C0]/20 rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-[#4169E1] text-white rounded-lg hover:bg-[#4169E1]/80 transition-colors"
            >
              {saving ? "Saving..." : "Save Bank Details"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
