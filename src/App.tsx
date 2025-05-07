import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

// Admin pages
import AdminDashboard from './pages/ADMIN/AdminDashboard';
import ManageUsers from './pages/ADMIN/ManageUsers';
import SiteSettings from './pages/ADMIN/SiteSettings';

// Super Admin pages
import SadminDashboard from './pages/SUPERADMIN/SadminDashboard'; // Import SadminDashboard

const AppContent: React.FC = () => {
  const location = useLocation();

  // Show both navbars for design/testing
  const hideNavbarOnRoutes = ['/login', '/register', '/verify-email'];

  // Placeholder function to check user role, adjust according to your auth logic
  const isSuperAdmin = false; // Replace with actual user role logic

  return (
    <div className="min-h-screen bg-white text-black">
      {!hideNavbarOnRoutes.includes(location.pathname) && (
        <>
          {/* Show the navbar based on role */}
          {isSuperAdmin ? <SadminNavbar /> : <UserNavbar />}
          <AdminNavbar />
        </>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/settings" element={<SiteSettings />} />
        
        {/* Super Admin Route */}
        <Route path="/sadmin-dashboard" element={<SadminDashboard />} />

        {/* Redirect */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
