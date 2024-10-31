export default function AdminStats() {
  // Mock data - replace with real data later
  const stats = [
    {
      title: "Total Users",
      value: "12,345",
      change: "+12% this month",
      color: "text-blue-600",
    },
    {
      title: "Active Listings",
      value: "3,456",
      change: "+8% this month",
      color: "text-green-600",
    },
    {
      title: "Total Sales",
      value: "$234,567",
      change: "+15% this month",
      color: "text-purple-600",
    },
    {
      title: "Platform Fee Revenue",
      value: "$11,234",
      change: "+10% this month",
      color: "text-orange-600",
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
