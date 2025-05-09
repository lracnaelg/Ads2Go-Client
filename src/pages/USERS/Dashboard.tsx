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
    <div
      className="min-h-screen py-12 px-6 bg-cover bg-center bg-no-repeat relative pt-21"
      style={{ backgroundImage: "url('/image/bg2.png')" }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0" />
      
      {/* Main content */}
      <div className="max-w-5xl ml-11 rounded-2xl p-3 space-y-10 relative z-10">
        {/* Header - Aligned to left */}
        <div className="text-left">
          <h1 className="text-6xl font-bold text-gray-800 pt-7">Welcome, {userName}!</h1>
          <p className="text-gray-500 mt-2">Here’s what’s going on with your campaigns.</p>
        </div>

        {/* Recent Activity - Aligned to left */}
        <div className="text-left">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            {recentActivity.map((item, index) => (
              <li key={index} className=" p-4 text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>


      {/* User Overview Cards - Placed below header, all in one row with animation */}
      <div className="absolute top-19 p-10 grid grid-cols-1 lg:grid-cols-5 gap-6 mt-10" style={{ width: '1490px' }}>
        <InfoCard icon={<Megaphone size={28} />} label="My Ads" className="hover:bg-[#C9E6F0] hover:scale-105 transition-all duration-300" value={userAds} color="text-blue-700" />
        <InfoCard icon={<Activity size={28} />} label="Active Campaigns" className="hover:bg-[#C9E6F0] hover:scale-105 transition-all duration-300" value={activeCampaigns} color="text-green-700" />
        <InfoCard icon={<TrendingUp size={28} />} label="Total Impressions" className="hover:bg-[#C9E6F0] hover:scale-105 transition-all duration-300" value={totalImpressions.toLocaleString()} color="text-yellow-700" />
        <InfoCard icon={<User size={28} />} label="Assigned Rider" className="hover:bg-[#C9E6F0] hover:scale-105 transition-all duration-300" value={assignedRider} color="text-purple-700" />
        <InfoCard icon={<MapPinned size={28} />} label="Live Tracking" className="hover:bg-[#C9E6F0] hover:scale-105 transition-all duration-300" value="View Map" color="text-red-700" isLink onClick={() => navigate('/tracking')} />
      </div>
    </div>
  );
};

const InfoCard = ({
  icon,
  label,
  value,
  color,
  className,
  isLink = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  className?: string;
  isLink?: boolean;
  onClick?: () => void;
}) => (
  <div
    className={`bg-white p-6 rounded-xl flex items-center gap-4 shadow hover:shadow-lg transition ${isLink ? 'cursor-pointer hover:bg-gray-100' : ''} ${className || ''}`}
    onClick={onClick}
  >
    <div className={`p-3 bg-gray-50 rounded-full shadow-inner ${color}`}>{icon}</div>
    <div>
      <p className="text-xl font-semibold text-gray-800">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default UserDashboard;