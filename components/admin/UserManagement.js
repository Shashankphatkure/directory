"use client";
import { useState } from "react";

export default function UserManagement() {
  // Mock data - replace with real data later
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-01-15",
      listings: 12,
      sales: 34,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "seller",
      status: "verified",
      joinDate: "2024-01-20",
      listings: 45,
      sales: 89,
    },
    // Add more mock users...
  ]);

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      verified: "bg-blue-100 text-blue-800",
      suspended: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <select className="px-3 py-1 border rounded-lg">
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="seller">Sellers</option>
              <option value="admin">Admins</option>
            </select>
            <select className="px-3 py-1 border rounded-lg">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="verified">Verified</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <input
            type="search"
            placeholder="Search users..."
            className="px-3 py-1 border rounded-lg"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                    <div className="text-xs text-gray-500">
                      Joined {user.joinDate}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="capitalize">{user.role}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div>{user.listings} listings</div>
                    <div>{user.sales} sales</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
