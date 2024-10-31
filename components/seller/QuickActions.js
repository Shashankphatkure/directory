export default function QuickActions() {
  const actions = [
    {
      title: "Create Listing",
      icon: "📝",
      description: "List a new item for sale",
      href: "/seller/listings/new",
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Orders",
      icon: "📦",
      description: "View and manage orders",
      href: "/seller/orders",
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Shipping",
      icon: "🚚",
      description: "Manage shipments",
      href: "/seller/shipping",
      color: "bg-purple-50 text-purple-700",
    },
    {
      title: "Analytics",
      icon: "📊",
      description: "View detailed analytics",
      href: "/seller/analytics",
      color: "bg-orange-50 text-orange-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <a
          key={action.title}
          href={action.href}
          className={`${action.color} p-6 rounded-lg hover:opacity-90 transition-opacity`}
        >
          <div className="text-3xl mb-3">{action.icon}</div>
          <h3 className="font-semibold mb-1">{action.title}</h3>
          <p className="text-sm opacity-75">{action.description}</p>
        </a>
      ))}
    </div>
  );
}
