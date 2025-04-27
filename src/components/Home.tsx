import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const adData = [
  { day: "Mon", impressions: 1200, clicks: 80 },
  { day: "Tue", impressions: 1900, clicks: 150 },
  { day: "Wed", impressions: 2400, clicks: 180 },
  { day: "Thu", impressions: 3000, clicks: 250 },
  { day: "Fri", impressions: 2800, clicks: 210 },
  { day: "Sat", impressions: 3200, clicks: 300 },
  { day: "Sun", impressions: 3500, clicks: 320 },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex flex-col">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <header className="w-full text-center py-16 bg-opacity-10 backdrop-blur-lg border-b border-gray-700 shadow-lg">
        <h1 className="text-5xl font-extrabold text-cyan-400 tracking-wide drop-shadow-lg">
          🚀 Ads To Go: Mobile Advertising Platform
        </h1>
        <p className="text-lg mt-3 text-gray-400 max-w-2xl mx-auto">
          A cutting-edge mobile advertising solution for businesses. Launch campaigns, track analytics, and maximize brand visibility.
        </p>
      </header>

      <main className="container mx-auto px-6 py-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Advertisement Performance Chart */}
          <div className="bg-gray-800/60 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-cyan-300 text-center">📊 Ad Performance</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={adData}>
                <XAxis dataKey="day" stroke="#8884d8" />
                <YAxis stroke="#ddd" />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <Line type="monotone" dataKey="impressions" stroke="#00f2ff" strokeWidth={3} />
                <Line type="monotone" dataKey="clicks" stroke="#ff0099" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex justify-center space-x-6">
          <button
            onClick={() => navigate("/create-campaign")}
            className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg hover:from-green-500 hover:to-blue-600 transition-all"
          >
            ➕ Launch an Ad Campaign
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
