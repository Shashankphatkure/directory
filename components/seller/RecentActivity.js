export default function RecentActivity() {
  // Mock data - replace with real data later
  const activities = [
    {
      id: 1,
      type: "order",
      title: "New order received",
      description: "1oz Gold American Eagle purchased by John D.",
      timestamp: "2 minutes ago",
      icon: "🛍️",
      color: "bg-green-50 text-green-700",
    },
    {
      id: 2,
      type: "message",
      title: "New message",
      description: "Question about 1889 Morgan Silver Dollar",
      timestamp: "1 hour ago",
      icon: "💬",
      color: "bg-blue-50 text-blue-700",
    },
    {
      id: 3,
      type: "shipping",
      title: "Package delivered",
      description: "Order #1234 was delivered successfully",
      timestamp: "3 hours ago",
      icon: "📦",
      color: "bg-purple-50 text-purple-700",
    },
    {
      id: 4,
      type: "review",
      title: "New review received",
      description: "5-star review from Sarah M.",
      timestamp: "1 day ago",
      icon: "⭐",
      color: "bg-yellow-50 text-yellow-700",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="divide-y">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 flex items-start gap-4">
            <div
              className={`${activity.color} p-2 rounded-lg flex items-center justify-center`}
            >
              <span className="text-xl">{activity.icon}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{activity.title}</h3>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <span className="text-xs text-gray-500">
                {activity.timestamp}
              </span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <span>•••</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
