import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserNavbar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Get initials for profile circle
  const getInitials = (name?: string) => {
    if (!name) return '?';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg py-3 px-6 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/home" className="hover:text-blue-400">AdSystem</Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link to="/home" className="hover:text-blue-400">Home</Link>
        <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        <div 
          className="w-10 h-10 rounded-full bg-[#FF9D3D] flex items-center justify-center cursor-pointer hover:bg-[#F6C794] transition-colors"
          onClick={() => navigate('/settings')}
        >
          <span className="font-semibold text-white">
            {getInitials(user?.name)}
          </span>
        </div>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600">Logout</button>
      </div>
    </nav>
  );
};

export default UserNavbar;