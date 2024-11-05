"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchTransactions = async () => {
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
          .from("transactions")
          .select(
            `
            id,
            amount,
            status,
            created_at,
            type,
            listings (
              title
            )
          `
          )
          .or(`seller_id.eq.${user.id},buyer_id.eq.${user.id}`)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setTransactions(
          data.map((tx) => ({
            id: tx.id,
            date: new Date(tx.created_at).toLocaleDateString(),
            time: new Date(tx.created_at).toLocaleTimeString(),
            description: tx.listings?.title || tx.type || "Transaction",
            amount: tx.amount,
            type: tx.seller_id === user.id ? "credit" : "debit",
            status: tx.status,
          }))
        );
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [supabase, router]);

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
            Transaction History
          </h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#333333] rounded-lg hover:bg-[#4169E1] transition-colors"
          >
            Back to Wallet
          </button>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#333333]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#C0C0C0] uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#C0C0C0] uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#C0C0C0] uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#C0C0C0] uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C0C0C0]/20">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div>{transaction.date}</div>
                    <div className="text-[#C0C0C0] text-xs">
                      {transaction.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {transaction.description}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      transaction.type === "credit"
                        ? "text-[#50C878]"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === "completed"
                          ? "bg-[#50C878]/20 text-[#50C878]"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
