"use client";
import { useState } from "react";

export default function WalletPage() {
  const [balance, setBalance] = useState(8711.12);

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

            {/* Manage Section */}
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
                    className="w-full px-4 py-3 bg-[#333333] border border-[#C0C0C0]/20 rounded-lg hover:bg-[#4169E1] hover:text-white text-left font-medium transition-all duration-300"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

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
                {[
                  {
                    date: "2024-02-20",
                    description: "Sale - 1oz Gold American Eagle",
                    amount: 1899.99,
                    type: "credit",
                    status: "completed",
                  },
                  {
                    date: "2024-02-19",
                    description: "Purchase - Silver Canadian Maple",
                    amount: -165.0,
                    type: "debit",
                    status: "completed",
                  },
                ].map((transaction, index) => (
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
