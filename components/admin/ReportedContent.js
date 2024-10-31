export default function ReportedContent() {
  // Mock data - replace with real data later
  const reports = [
    {
      id: 1,
      type: "listing",
      title: "1oz Gold Bar",
      reportedBy: "John Doe",
      reason: "Suspicious pricing",
      timestamp: "2024-02-20 15:30:00",
      status: "pending",
    },
    {
      id: 2,
      type: "comment",
      content: "Inappropriate comment on listing...",
      reportedBy: "Jane Smith",
      reason: "Harassment",
      timestamp: "2024-02-20 14:45:00",
      status: "resolved",
    },
    {
      id: 3,
      type: "user",
      username: "suspicious_user",
      reportedBy: "Mike Johnson",
      reason: "Scam attempt",
      timestamp: "2024-02-20 13:15:00",
      status: "investigating",
    },
    // Add more mock reports...
  ];

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      investigating: "bg-blue-100 text-blue-800",
      resolved: "bg-green-100 text-green-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <select className="px-3 py-1 border rounded-lg">
            <option value="all">All Types</option>
            <option value="listing">Listings</option>
            <option value="comment">Comments</option>
            <option value="user">Users</option>
          </select>
          <select className="px-3 py-1 border rounded-lg">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="divide-y">
        {reports.map((report) => (
          <div key={report.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium capitalize">{report.type}</span>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>
                </div>
                <p className="text-sm mt-1">
                  {report.type === "listing" && report.title}
                  {report.type === "comment" && report.content}
                  {report.type === "user" && `@${report.username}`}
                </p>
                <div className="text-sm text-gray-500 mt-1">
                  Reported by: {report.reportedBy}
                </div>
                <div className="text-sm text-gray-500">
                  Reason: {report.reason}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">
                  {report.timestamp}
                </span>
                <div className="mt-2 space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 text-sm">
                    Review
                  </button>
                  {report.status !== "resolved" && (
                    <button className="text-green-600 hover:text-green-900 text-sm">
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
