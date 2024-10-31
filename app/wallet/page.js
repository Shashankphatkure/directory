"use client";
import { useState } from "react";

export default function WalletPage() {
  const [balance, setBalance] = useState(8711.12);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Wallet</h1>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Balance Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Balance</h2>
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="text-4xl font-bold">
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
              <h2 className="text-xl font-semibold">Manage</h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-white border rounded-lg hover:bg-gray-50 text-left font-medium">
                  Add Balance
                </button>
                <button className="w-full px-4 py-3 bg-white border rounded-lg hover:bg-gray-50 text-left font-medium">
                  View Transactions
                </button>
                <button className="w-full px-4 py-3 bg-white border rounded-lg hover:bg-gray-50 text-left font-medium">
                  Cash Out Balance
                </button>
                <button className="w-full px-4 py-3 bg-white border rounded-lg hover:bg-gray-50 text-left font-medium">
                  Manage Bank
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
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
                  // Add more transactions...
                ].map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        transaction.type === "credit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "credit" ? "+" : "-"}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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
