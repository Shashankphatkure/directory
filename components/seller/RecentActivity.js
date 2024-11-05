export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "order",
      title: "New order received",
      description: "1oz Gold American Eagle purchased by John D.",
      timestamp: "2 minutes ago",
      icon: "🛍️",
      color: "bg-[#333333] text-[#50C878]",
    },
    {
      id: 2,
      type: "message",
      title: "New message",
      description: "Question about 1889 Morgan Silver Dollar",
      timestamp: "1 hour ago",
      icon: "💬",
      color: "bg-[#333333] text-[#4169E1]",
    },
    {
      id: 3,
      type: "shipping",
      title: "Package delivered",
      description: "Order #1234 was delivered successfully",
      timestamp: "3 hours ago",
      icon: "📦",
      color: "bg-[#333333] text-[#FFD700]",
    },
    {
      id: 4,
      type: "review",
      title: "New review received",
      description: "5-star review from Sarah M.",
      timestamp: "1 day ago",
      icon: "⭐",
      color: "bg-[#333333] text-[#FFD700]",
    },
  ];

  return (
    <div className="divide-y divide-[#333333]">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="p-4 flex items-start gap-4 hover:bg-[#333333]/20 transition-colors"
        >
          <div
            className={`${activity.color} p-2 rounded-lg flex items-center justify-center`}
          >
            <span className="text-xl">{activity.icon}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-[#C0C0C0]">{activity.title}</h3>
            <p className="text-sm text-[#C0C0C0]/60">{activity.description}</p>
            <span className="text-xs text-[#C0C0C0]/40">
              {activity.timestamp}
            </span>
          </div>
          <button className="text-[#C0C0C0]/40 hover:text-[#C0C0C0] transition-colors">
            <span>•••</span>
          </button>
        </div>
      ))}
    </div>
  );
}
