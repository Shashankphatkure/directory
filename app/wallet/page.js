"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        // Get current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;

        if (!user) {
          router.push("/login");
          return;
        }

        // Get wallet balance
        const { data: walletData, error: walletError } = await supabase
          .from("wallet_balances")
          .select("balance")
          .eq("user_id", user.id)
          .single();

        if (walletError && walletError.code !== "PGRST116") throw walletError;

        // If no wallet exists, create one
        if (!walletData) {
          const { data: newWallet, error: createError } = await supabase
            .from("wallet_balances")
            .insert([{ user_id: user.id, balance: 0 }])
            .select()
            .single();

          if (createError) throw createError;
          setBalance(0);
        } else {
          setBalance(walletData.balance);
        }

        // Get recent transactions
        const { data: transactionsData, error: transactionsError } =
          await supabase
            .from("transactions")
            .select(
              `
            id,
            amount,
            status,
            created_at,
            listings (
              title
            )
          `
            )
            .or(`seller_id.eq.${user.id},buyer_id.eq.${user.id}`)
            .order("created_at", { ascending: false })
            .limit(5);

        if (transactionsError) throw transactionsError;

        setTransactions(
          transactionsData.map((tx) => ({
            date: new Date(tx.created_at).toISOString().split("T")[0],
            description: tx.listings?.title || "Transaction",
            amount: tx.amount,
            type: tx.seller_id === user.id ? "credit" : "debit",
            status: tx.status,
          }))
        );
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [supabase, router]);

  const handleAddFunds = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setProcessing(true);
    try {
      // Here you would typically integrate with a payment processor
      // For demo purposes, we'll just update the balance directly
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase
        .from("wallet_balances")
        .update({
          balance: balance + parseFloat(amount),
        })
        .eq("user_id", user.id);

      if (error) throw error;

      // Add transaction record
      const { error: txError } = await supabase.from("transactions").insert([
        {
          amount: parseFloat(amount),
          type: "deposit",
          status: "completed",
          user_id: user.id,
        },
      ]);

      if (txError) throw txError;

      setBalance((prev) => prev + parseFloat(amount));
      setShowAddFunds(false);
      setAmount("");
      // Refresh transactions
      fetchWalletData();
    } catch (error) {
      console.error("Error adding funds:", error);
      alert("Failed to add funds. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleAction = (action) => {
    switch (action) {
      case "Add More Balance":
        setShowAddFunds(true);
        break;
      case "View Transactions":
        router.push("/transactions");
        break;
      case "Cash Out Balance":
        handleCashOut();
        break;
      case "Manage Bank":
        router.push("/bank-details");
        break;
      default:
        break;
    }
  };

  const handleCashOut = async () => {
    if (balance <= 0) {
      alert("No funds available to cash out");
      return;
    }

    const confirmCashout = window.confirm(
      `Are you sure you want to cash out $${balance}?`
    );

    if (confirmCashout) {
      // Implement cashout logic here
      alert("Cashout functionality will be implemented soon!");
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
        <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
          Wallet
        </h1>

        <div className="card p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Balance Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#FFD700]">Balance</h2>
              <div className="bg-[#333333] rounded-lg p-8">
                <div className="text-4xl font-bold text-[#50C878]">
                  $
                  {balance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>

            {/* Updated Manage Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#FFD700]">Manage</h2>
              <div className="space-y-3">
                {[
                  "Add More Balance",
                  "View Transactions",
                  "Cash Out Balance",
                  "Manage Bank",
                ].map((action) => (
                  <button
                    key={action}
                    onClick={() => handleAction(action)}
                    className="w-full px-4 py-3 bg-[#333333] border border-[#C0C0C0]/20 rounded-lg hover:bg-[#4169E1] hover:text-white text-left font-medium transition-all duration-300"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Funds Modal */}
        {showAddFunds && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-[#222222] rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4 text-[#FFD700]">
                Add Funds
              </h3>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full p-2 mb-4 bg-[#333333] border border-[#C0C0C0]/20 rounded"
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleAddFunds}
                  disabled={processing}
                  className="flex-1 py-2 bg-[#4169E1] text-white rounded hover:bg-[#4169E1]/80"
                >
                  {processing ? "Processing..." : "Add Funds"}
                </button>
                <button
                  onClick={() => setShowAddFunds(false)}
                  className="flex-1 py-2 bg-[#333333] text-white rounded hover:bg-[#444444]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Transactions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
            Recent Transactions
          </h2>
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#333333]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#C0C0C0] uppercase tracking-wider">
                    Date
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
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {transaction.date}
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
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#50C878]/20 text-[#50C878]">
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
    </div>
  );
}
