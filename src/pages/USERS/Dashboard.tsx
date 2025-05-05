import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-8 space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, User!</h1>
          <p className="text-gray-500 mt-2">Here’s a quick overview of your activity.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-6 rounded-lg text-center shadow">
            <h2 className="text-xl font-semibold text-blue-700">Campaigns</h2>
            <p className="text-3xl font-bold text-blue-900">5</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg text-center shadow">
            <h2 className="text-xl font-semibold text-green-700">Impressions</h2>
            <p className="text-3xl font-bold text-green-900">25,400</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg text-center shadow">
            <h2 className="text-xl font-semibold text-yellow-700">Clicks</h2>
            <p className="text-3xl font-bold text-yellow-900">2,310</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            <li className="bg-gray-100 p-4 rounded shadow text-gray-700">📅 Campaign "Summer Sale" launched on May 1, 2025</li>
            <li className="bg-gray-100 p-4 rounded shadow text-gray-700">📈 1,200 new impressions recorded yesterday</li>
            <li className="bg-gray-100 p-4 rounded shadow text-gray-700">🛠️ You updated your contact number</li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/create-campaign')}
            className="btn-primary"
          >
            ➕ Create New Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
