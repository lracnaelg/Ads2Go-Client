import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const adPerformanceData = [
  { month: "Jan", impressions: 4000, qrScans: 2400 },
  { month: "Feb", impressions: 3000, qrScans: 1398 },
  { month: "Mar", impressions: 2000, qrScans: 9800 },
  { month: "Apr", impressions: 2780, qrScans: 3908 },
  { month: "May", impressions: 1890, qrScans: 4800 },
  { month: "Jun", impressions: 2390, qrScans: 3800 },
  { month: "Jul", impressions: 3490, qrScans: 4300 },
];

const ctrData = [
  { campaign: "Campaign A", ctr: 2.4 },
  { campaign: "Campaign B", ctr: 3.1 },
  { campaign: "Campaign C", ctr: 1.8 },
  { campaign: "Campaign D", ctr: 4.2 },
];

const vehicles = [
  { plateNumber: "ABC123", location: "Makati", status: "Active" },
  { plateNumber: "XYZ456", location: "Taguig", status: "Parked" },
  { plateNumber: "LMN789", location: "Quezon City", status: "Offline" },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen ml-64">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Ads", value: 128, icon: "📊", color: "bg-blue-600" },
          { label: "Active Ads", value: 84, icon: "✅", color: "bg-green-600" },
          { label: "Pending Ads", value: 12, icon: "⏳", color: "bg-yellow-500" },
          { label: "QR Scans", value: 3521, icon: "📱", color: "bg-purple-600" },
        ].map((item, i) => (
          <div key={i} className={`flex items-center ${item.color} text-white rounded-lg p-5 shadow-md`}>
            <div className="text-3xl mr-4">{item.icon}</div>
            <div>
              <div className="text-sm opacity-75">{item.label}</div>
              <div className="text-xl font-bold">{item.value.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow text-gray-800">
          <h3 className="text-lg font-semibold mb-4">Ad Impressions & QR Scans</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={adPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="impressions" stroke="#6366F1" />
              <Line type="monotone" dataKey="qrScans" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-gray-800">
          <h3 className="text-lg font-semibold mb-4">Click-Through Rate by Campaign</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ctrData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="campaign" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ctr" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white p-6 rounded-lg shadow text-gray-800">
        <h3 className="text-lg font-semibold mb-4">Vehicle Status Overview</h3>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Plate Number</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Location</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{vehicle.plateNumber}</td>
                <td className="px-4 py-2">{vehicle.location}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    vehicle.status === "Active"
                      ? "bg-green-200 text-green-800"
                      : vehicle.status === "Parked"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}>
                    {vehicle.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
