import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; // Import your useAuth hook

// Import Navbars
import UserNavbar from './components/UserNavbar';
import AdminNavbar from './components/AdminNavbar';
import SadminNavbar from './components/SadminNavbar'; // Add SadminNavbar

// Regular user pages
import Login from './pages/AUTH/Login';
import Register from './pages/USERS/Register';
import Dashboard from './pages/USERS/Dashboard';
import VerifyEmail from './pages/USERS/VerifyEmail';
import Home from './pages/USERS/Home';
import Settings from './pages/USERS/Settings';
import Payment from './pages/USERS/Payment';
import CreateAdvertisement from './pages/USERS/CreateAdvertisement'; 


// Admin pages
import AdminDashboard from './pages/ADMIN/AdminDashboard';
import ManageUsers from './pages/ADMIN/ManageUsers';
import SiteSettings from './pages/ADMIN/SiteSettings';

// Super Admin pages
import SadminDashboard from './pages/SUPERADMIN/SadminDashboard'; // Import SadminDashboard

const AppContent: React.FC = () => {
  const { user } = useAuth();  // Access the user data from context
  const location = useLocation();

  // List of public pages
  const hideNavbarOnRoutes = ['/login', '/register', '/verify-email'];

  // Don't show the navbar on the public routes
  if (hideNavbarOnRoutes.includes(location.pathname)) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Show the appropriate navbar based on the user role */}
      {user?.role === 'SUPERADMIN' && <SadminNavbar />}
      {user?.role === 'ADMIN' && <AdminNavbar />}
      {user?.role === 'USER' && <UserNavbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/create-advertisement" element={<CreateAdvertisement />} />



        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/settings" element={<SiteSettings />} />

        {/* Super Admin Routes */}
        <Route path="/sadmin-dashboard" element={<SadminDashboard />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
