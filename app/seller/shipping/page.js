"use client";
import { useState } from "react";
import {
  TruckIcon,
  PrinterIcon,
  QrCodeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function ShippingDashboard() {
  const [selectedCarrier, setSelectedCarrier] = useState("usps");

  const shippingStats = [
    { label: "Pending Shipments", value: 5 },
    { label: "Shipped Today", value: 3 },
    { label: "Out for Delivery", value: 8 },
    { label: "Delivered", value: 142 },
  ];

  const pendingShipments = [
    {
      id: "SH123456",
      orderNumber: "ORD-789",
      buyer: "John Smith",
      items: "1oz Gold American Eagle",
      address: "123 Main St, New York, NY 10001",
      status: "Label Created",
      created: "2024-02-28",
    },
    // Add more shipments...
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
          Shipping Dashboard
        </h1>
        <button className="bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors">
          Create Shipment
        </button>
      </div>

      {/* Shipping Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {shippingStats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#C0C0C0]/60">{stat.label}</p>
                <h3 className="text-2xl font-bold text-[#C0C0C0] mt-1">
                  {stat.value}
                </h3>
              </div>
              <TruckIcon className="h-8 w-8 text-[#FFD700]" />
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Integration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Carrier Selection & Rate Calculator */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-[#FFD700] mb-6">
              Shipping Calculator
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[#C0C0C0] mb-2">Carrier</label>
                <select
                  value={selectedCarrier}
                  onChange={(e) => setSelectedCarrier(e.target.value)}
                  className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                >
                  <option value="usps">USPS</option>
                  <option value="ups">UPS</option>
                  <option value="fedex">FedEx</option>
                </select>
              </div>

              <div>
                <label className="block text-[#C0C0C0] mb-2">
                  Package Weight
                </label>
                <input
                  type="number"
                  className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                  placeholder="Enter weight in oz"
                />
              </div>

              <button className="w-full bg-[#4169E1] text-white py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors">
                Calculate Rates
              </button>
            </div>
          </div>
        </div>

        {/* Pending Shipments */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-[#FFD700] mb-6">
              Pending Shipments
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[#C0C0C0]/60">
                    <th className="pb-4">Order</th>
                    <th className="pb-4">Buyer</th>
                    <th className="pb-4">Items</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C0C0C0]/20">
                  {pendingShipments.map((shipment) => (
                    <tr key={shipment.id} className="text-[#C0C0C0]">
                      <td className="py-4">{shipment.orderNumber}</td>
                      <td className="py-4">{shipment.buyer}</td>
                      <td className="py-4">{shipment.items}</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-[#FFD700]/10 text-[#FFD700] rounded-full text-sm">
                          {shipment.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <button className="p-2 text-[#4169E1] hover:bg-[#333333] rounded-lg transition-colors">
                            <PrinterIcon className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-[#4169E1] hover:bg-[#333333] rounded-lg transition-colors">
                            <QrCodeIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
