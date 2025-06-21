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
    <div className="h-screen w-60 bg-[#78B3CE] text-black flex flex-col justify-between shadow-xl fixed">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-10">
          <img src="/image/black-logo.png" alt="Logo" className="w-8 h-8" />
          <span className="text-2xl text-black font-bold">Ads2Go</span>
        </div>

        {/* Navigation */}
        <ul className="space-y-2">
          {navLinks.map(link => (
            <li key={link.label}>
              <Link
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#3674B5] hover:text-white transition ${
                  location.pathname === link.path ? 'bg-[#C9E6F0]' : ''
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
      <div className="p-6 border-t border-gray-700 flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-full bg-[#FF9D3D] flex items-center justify-center cursor-pointer hover:bg-[#F6C794]"
          onClick={() => navigate('/account')}
        >
          <span className="text-white font-semibold">{getInitials(user?.name)}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-sm text-[#FF2929] hover:text-red-500 transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
