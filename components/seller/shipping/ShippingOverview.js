export default function ShippingOverview() {
  // Mock data - replace with real data later
  const stats = [
    {
      title: "Pending Shipments",
      value: 12,
      change: "+2 from yesterday",
      color: "text-yellow-600",
    },
    {
      title: "In Transit",
      value: 8,
      change: "-1 from yesterday",
      color: "text-blue-600",
    },
    {
      title: "Delivered",
      value: 156,
      change: "+23 this month",
      color: "text-green-600",
    },
    {
      title: "Average Shipping Cost",
      value: "$8.45",
      change: "-$0.30 from last month",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
          <div className={`text-2xl font-bold ${stat.color} mt-2`}>
            {stat.value}
          </div>
          <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
        </div>
      ))}
    </div>
  );
}
