import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Megaphone,
  User,
  Activity,
  MapPinned,
  TrendingUp
} from 'lucide-react';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();

  // 🧪 Example user data (replace with real data)
  const userName = 'John Doe';
  const userAds = 3;
  const activeCampaigns = 2;
  const totalImpressions = 12450;
  const assignedRider = 'Rider #12';
  const recentActivity = [
    '📢 Ad "Promo X" approved',
    '📈 300 new impressions this week',
    '🚴 Rider #12 assigned to your campaign',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-10 space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {userName}!</h1>
          <p className="text-gray-500 mt-2">Here’s what’s going on with your campaigns.</p>
        </div>

        {/* User Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard icon={<Megaphone size={28} />} label="My Ads" value={userAds} color="text-blue-700" />
          <InfoCard icon={<Activity size={28} />} label="Active Campaigns" value={activeCampaigns} color="text-green-700" />
          <InfoCard icon={<TrendingUp size={28} />} label="Total Impressions" value={totalImpressions.toLocaleString()} color="text-yellow-700" />
          <InfoCard icon={<User size={28} />} label="Assigned Rider" value={assignedRider} color="text-purple-700" />
          <InfoCard icon={<MapPinned size={28} />} label="Live Tracking" value="View Map" color="text-red-700" isLink onClick={() => navigate('/tracking')} />
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            {recentActivity.map((item, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded shadow text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Action */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/create-campaign')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            ➕ Create New Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({
  icon,
  label,
  value,
  color,
  isLink = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  isLink?: boolean;
  onClick?: () => void;
}) => (
  <div
    className={`bg-gray-100 p-6 rounded-xl flex items-center gap-4 shadow hover:shadow-lg transition ${
      isLink ? 'cursor-pointer hover:bg-gray-200' : ''
    }`}
    onClick={onClick}
  >
    <div className={`p-3 bg-white rounded-full shadow-inner ${color}`}>{icon}</div>
    <div>
      <p className="text-xl font-semibold text-gray-800">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default UserDashboard;
