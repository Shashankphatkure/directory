export default function ShipmentsList() {
  // Mock data - replace with real data later
  const shipments = [
    {
      id: "SHIP123",
      orderNumber: "ORD-456",
      customer: "John Doe",
      status: "pending",
      date: "2024-02-20",
      trackingNumber: null,
      items: ["1oz Gold American Eagle"],
    },
    {
      id: "SHIP124",
      orderNumber: "ORD-457",
      customer: "Jane Smith",
      status: "in_transit",
      date: "2024-02-19",
      trackingNumber: "9374892374892",
      items: ["1889-CC Morgan Dollar", "1oz Silver Round"],
    },
    // Add more mock shipments...
  ];

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      in_transit: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {shipments.map((shipment) => (
              <tr key={shipment.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {shipment.orderNumber}
                  </div>
                  <div className="text-sm text-gray-500">
                    {shipment.customer}
                  </div>
                  <div className="text-sm text-gray-500">{shipment.date}</div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                      shipment.status
                    )}`}
                  >
                    {shipment.status.replace("_", " ")}
                  </span>
                  {shipment.trackingNumber && (
                    <div className="text-sm text-gray-500 mt-1">
                      {shipment.trackingNumber}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <ul className="text-sm text-gray-500">
                    {shipment.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-blue-600 hover:text-blue-900">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
