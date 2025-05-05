import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminNavbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg py-3 px-6 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/admin" className="hover:text-blue-400">AdSystem</Link>
      </div>
      <div className="space-x-6">
        <Link to="/admin/dashboard" className="hover:text-blue-400">Dashboard</Link>
        <Link to="/admin/users" className="hover:text-blue-400">Manage Users</Link>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600">Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
