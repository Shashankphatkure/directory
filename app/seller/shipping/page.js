import ShippingOverview from "@/components/seller/shipping/ShippingOverview";
import ShipmentsList from "@/components/seller/shipping/ShipmentsList";
import ShippingRates from "@/components/seller/shipping/ShippingRates";

export default function ShippingDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Shipping Dashboard</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Create Shipment
        </button>
      </div>

      {/* Shipping Overview */}
      <div className="mb-8">
        <ShippingOverview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipments List */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Shipments</h2>
          <ShipmentsList />
        </div>

        {/* Shipping Rates */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Rates</h2>
          <ShippingRates />
        </div>
      </div>
    </div>
  );
}
