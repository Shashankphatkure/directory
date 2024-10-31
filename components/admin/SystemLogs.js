export default function SystemLogs() {
  // Mock data - replace with real data later
  const logs = [
    {
      id: 1,
      type: "error",
      message: "Payment processing failed for order #1234",
      timestamp: "2024-02-20 14:23:45",
      details: "Error: Invalid payment token",
    },
    {
      id: 2,
      type: "warning",
      message: "High server load detected",
      timestamp: "2024-02-20 14:20:30",
      details: "CPU usage above 80%",
    },
    {
      id: 3,
      type: "info",
      message: "New user registration",
      timestamp: "2024-02-20 14:15:22",
      details: "User ID: 5678",
    },
    // Add more mock logs...
  ];

  const getLogTypeStyles = (type) => {
    const styles = {
      error: "bg-red-50 text-red-700 border-red-100",
      warning: "bg-yellow-50 text-yellow-700 border-yellow-100",
      info: "bg-blue-50 text-blue-700 border-blue-100",
    };
    return styles[type] || "bg-gray-50 text-gray-700 border-gray-100";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <select className="px-3 py-1 border rounded-lg">
              <option value="all">All Types</option>
              <option value="error">Errors</option>
              <option value="warning">Warnings</option>
              <option value="info">Info</option>
            </select>
            <input
              type="text"
              placeholder="Search logs..."
              className="px-3 py-1 border rounded-lg"
            />
          </div>
          <button className="text-blue-600 hover:text-blue-800">
            Export Logs
          </button>
        </div>
      </div>

      <div className="divide-y">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`p-4 ${getLogTypeStyles(log.type)} border-l-4`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{log.message}</p>
                <p className="text-sm mt-1">{log.details}</p>
              </div>
              <span className="text-sm text-gray-500">{log.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
