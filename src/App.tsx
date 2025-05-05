import React from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import UserNavbar from './components/UserNavbar';
import AdminNavbar from './components/AdminNavbar';
import AdminRoute from './routes/AdminRoutes';

// Import regular user components
import Login from './pages/AUTH/Login';
import Register from './pages/USERS/Register';
import Dashboard from './pages/USERS/Dashboard';
import VerifyEmail from './pages/USERS/VerifyEmail';
import Home from './pages/USERS/Home';
import Settings from './pages/USERS/Settings';

// Import admin components
import AdminDashboard from './pages/ADMIN/AdminDashboard';
import ManageUsers from './pages/ADMIN/ManageUsers';
import SiteSettings from './pages/ADMIN/SiteSettings';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && !user?.isEmailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  const hideNavbarOnRoutes = ['/login', '/register', '/verify-email'];

  return (
    <div className="min-h-screen bg-white text-black">
      {isAuthenticated && !hideNavbarOnRoutes.includes(location.pathname) && (
        user?.role === 'ADMIN' ? <AdminNavbar /> : <UserNavbar />
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
        <Route path="/admin/settings" element={<AdminRoute><SiteSettings /></AdminRoute>} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AuthProvider navigate={navigate}>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
