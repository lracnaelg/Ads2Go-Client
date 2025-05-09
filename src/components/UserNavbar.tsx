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
    <nav className="bg-white text-black shadow-lg py-3 px-6 flex justify-between items-center">
      <div className="text-xl font-bold ml-11">
        <Link to="/home" className="flex items-center space-x-2 hover:text-blue-400 transition-all duration-300">
          <img src="/image/black-logo.png" alt="AdSystem Logo" className="w-8 h-8" />
          <span>AdSystem</span>
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link to="/home" className="hover:text-blue-400 hover:scale-105 transition-all duration-300">Home</Link>
        <Link to="/dashboard" className="hover:text-blue-400 hover:scale-105 transition-all duration-300">Dashboard</Link>
        <div 
          className="w-10 h-10 rounded-full bg-[#FF9D3D] flex items-center justify-center cursor-pointer hover:bg-[#F6C794] hover:scale-105 transition-all duration-300"
          onClick={() => navigate('/settings')}
        >
          <span className="font-semibold text-white">
            {getInitials(user?.name)}
          </span>
        </div>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 hover:scale-105 transition-transform duration-300">Logout</button>
      </div>
    </nav>
  );
};

export default UserNavbar;