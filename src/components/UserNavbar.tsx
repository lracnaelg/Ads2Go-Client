import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  Megaphone,
  Settings,
  LogOut,
  CreditCard,
  Users,
  HelpCircle
} from 'lucide-react';

const SideNavbar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getInitials = (name?: string) => {
    if (!name) return '?';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  const navLinks = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { label: 'Advertisements', icon: <Megaphone size={20} />, path: '/advertisements' },
    { label: 'Payment History', icon: <CreditCard size={20} />, path: '/history' },
    { label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    { label: 'Help', icon: <HelpCircle size={20} />, path: '/help' },
  ];

  return (
    <div className="w-60 bg-[#1b5087] fixed top-5 left-3 bottom-5 shadow-2xl text-white flex flex-col justify-between rounded-3xl p-6"> {/* Changed shadow-lg to shadow-2xl */}

      <div>
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-10">
          <img src="/image/blue-logo.png" alt="Logo" className="w-8 h-8" />
          <span className="text-2xl text-white font-bold">Ads2Go</span>
        </div>

        {/* Navigation */}
        <ul className="space-y-2">
          {navLinks.map(link => (
            <li key={link.label}>
              <Link
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-[#0E2A47] font-bold hover:text-white transition hover:scale-105 transition-all duration-300 ${
                  location.pathname === link.path ? 'text-white bg-[#0E2A47]' : ''
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* User Profile & Logout */}
      <div>
        <div
          className="flex items-center space-x-3 mb-4 cursor-pointer"
          onClick={() => navigate('/account')}
        >
          <div className="w-10 h-10 rounded-full bg-[#FF9D3D] flex items-center justify-center relative">
            <span className="text-white font-semibold">{getInitials(user?.name)}</span>
          </div>
          <div>
            <p className="font-semibold text-gray-100">{user?.name || "Guest User"}</p>
            {/* Changed from user?.location to user?.address */}
            <p className="text-sm text-gray-300">{user?.address || "Unknown Address"}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 text-sm text-[#FF2929] hover:text-red-500 transition px-4 py-2 rounded-lg bg-red-50"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;