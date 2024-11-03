"use client";
import { useState } from "react";
import {
  BanknotesIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function PaymentsDashboard() {
  const [timeframe, setTimeframe] = useState("month");

  const paymentStats = [
    {
      title: "Available Balance",
      value: "$8,450.00",
      icon: BanknotesIcon,
      color: "text-[#50C878]",
    },
    {
      title: "Pending Balance",
      value: "$2,150.00",
      icon: ClockIcon,
      color: "text-[#FFD700]",
    },
    {
      title: "Total Earnings",
      value: "$45,780.00",
      icon: ArrowUpIcon,
      color: "text-[#4169E1]",
    },
    {
      title: "Processing Fees",
      value: "$890.00",
      icon: ArrowDownIcon,
      color: "text-red-500",
    },
  ];

  const recentTransactions = [
    {
      id: "TRX123",
      date: "2024-02-28",
      type: "Sale",
      description: "1oz Gold American Eagle",
      amount: 1950.0,
      status: "completed",
      buyer: "John Smith",
    },
    {
      id: "TRX124",
      date: "2024-02-27",
      type: "Withdrawal",
      description: "Bank Transfer",
      amount: -5000.0,
      status: "processing",
    },
    // Add more transactions...
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
          Payments Dashboard
        </h1>
        <button className="bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors">
          Withdraw Funds
        </button>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {paymentStats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#C0C0C0]/60">{stat.title}</p>
                <h3 className="text-2xl font-bold text-[#C0C0C0] mt-1">
                  {stat.value}
                </h3>
              </div>
              <div className={`p-3 rounded-full bg-[#333333] ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transaction History */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#FFD700]">
                Transaction History
              </h2>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-[#333333] text-[#C0C0C0] border border-[#C0C0C0]/20 rounded px-3 py-1"
              >
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
                <option value="year">Last year</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[#C0C0C0]/60">
                    <th className="pb-4">Transaction ID</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Description</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C0C0C0]/20">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="text-[#C0C0C0]">
                      <td className="py-4">{transaction.id}</td>
                      <td className="py-4">{transaction.date}</td>
                      <td className="py-4">{transaction.description}</td>
                      <td
                        className={`py-4 font-medium ${
                          transaction.amount > 0
                            ? "text-[#50C878]"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}$
                        {Math.abs(transaction.amount).toFixed(2)}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            transaction.status === "completed"
                              ? "bg-[#50C878]/10 text-[#50C878]"
                              : "bg-[#FFD700]/10 text-[#FFD700]"
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

        {/* Payment Methods & Settings */}
        <div className="lg:col-span-1 space-y-6">
          {/* Connected Accounts */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-[#FFD700] mb-6">
              Payment Methods
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#333333] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4169E1] flex items-center justify-center text-white">
                    <BanknotesIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[#C0C0C0]">Bank Account</div>
                    <div className="text-sm text-[#C0C0C0]/60">****1234</div>
                  </div>
                </div>
                <span className="text-[#50C878]">Primary</span>
              </div>
              <button className="w-full text-[#4169E1] hover:text-[#4169E1]/80 transition-colors">
                + Add Payment Method
              </button>
            </div>
          </div>

          {/* Escrow Settings */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-[#FFD700] mb-6">
              Escrow Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#C0C0C0]">Auto-release</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#333333] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4169E1]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#C0C0C0]">Require tracking</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-[#333333] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4169E1]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
