import React from 'react';
import adminBackground from '../../assets/images/admin/adminbackround.webp'; // ✅ Static asset

const AdminDashboard: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${adminBackground})` }}
    >
      <div className="bg-black bg-opacity-60 min-h-screen p-8 text-white">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* 🔢 Example Static Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 p-6 rounded shadow">
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-3xl mt-2">123</p>
          </div>
          <div className="bg-gray-800 p-6 rounded shadow">
            <h2 className="text-xl font-semibold">Pending Verifications</h2>
            <p className="text-3xl mt-2">5</p>
          </div>
          <div className="bg-gray-800 p-6 rounded shadow">
            <h2 className="text-xl font-semibold">System Logs</h2>
            <p className="text-3xl mt-2">42</p>
          </div>
        </div>

        {/* 🛠️ Placeholder Section */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Admin John updated a user role</li>
            <li>New user registered</li>
            <li>Settings were modified</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
export {}; // ✅ Ensure module type
