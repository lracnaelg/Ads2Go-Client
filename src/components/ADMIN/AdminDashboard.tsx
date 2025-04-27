import React from 'react';

import adminBackground from '../../assets/adminbackround.webp'; // Adjust the path as needed

const AdminDashboard: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${adminBackground})` }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen p-8 text-white">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
export {}; // ✅ Fix: Ensures the file is treated as a module
