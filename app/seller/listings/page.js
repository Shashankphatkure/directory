import ListingsTable from "@/components/seller/listings/ListingsTable";
import ListingsFilter from "@/components/seller/listings/ListingsFilter";

export default function ListingsManagement() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Listings</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Create New Listing
        </button>
      </div>

      {/* Listings Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Listings", value: 24 },
          { label: "Sold Items", value: 156 },
          { label: "Draft Listings", value: 3 },
          { label: "Total Views", value: "2.4K" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
            <div className="text-2xl font-bold mt-2">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters and Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <ListingsFilter />
        <ListingsTable />
      </div>
    </div>
  );
}
