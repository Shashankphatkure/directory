import AdminStats from "@/components/admin/AdminStats";
import UserManagement from "@/components/admin/UserManagement";
import SystemLogs from "@/components/admin/SystemLogs";
import ReportedContent from "@/components/admin/ReportedContent";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Admin Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
        <AdminStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Management */}
        <div>
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <UserManagement />
        </div>

        {/* Reported Content */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Reported Content</h2>
          <ReportedContent />
        </div>
      </div>

      {/* System Logs */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">System Logs</h2>
        <SystemLogs />
      </div>
    </div>
  );
}
