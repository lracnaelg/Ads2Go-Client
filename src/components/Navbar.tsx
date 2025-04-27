import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth(); // Get user info
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg py-3 px-6 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to={user?.role === 'ADMIN' ? "/admin" : "/home"} className="hover:text-blue-400">
          AdSystem
        </Link>
      </div>

      <div className="space-x-6">
        {user?.role === 'ADMIN' ? (
          <>
            <Link to="/admin/dashboard" className="hover:text-blue-400">Dashboard</Link>
            <Link to="/admin/users" className="hover:text-blue-400">Manage Users</Link>
          </>
        ) : (
          <>
            <Link to="/home" className="hover:text-blue-400">Home</Link>
            <Link to="/settings" className="hover:text-blue-400">Settings</Link>
          </>
        )}

        <button 
          onClick={handleLogout} 
          className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
