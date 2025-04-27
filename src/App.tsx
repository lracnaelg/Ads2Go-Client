import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Navbar from './components/Navbar';
import AdminRoute from './routes/AdminRoute';

// Import regular user components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import VerifyEmail from './components/VerifyEmail';
import Home from './components/Home';
import Settings from './components/Settings';

// Import admin components
import AdminDashboard from './components/ADMIN/AdminDashboard';
import ManageUsers from './components/ADMIN/ManageUsers';
import SiteSettings from './components/ADMIN/SiteSettings';
// Import protected route component
import { useLocation } from 'react-router-dom';



interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect users to email verification if they are not verified
  if (isAuthenticated && !user?.isEmailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  // Allow access if authenticated
  return <>{children}</>;
};


const AppContent: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // ❌ Routes where the navbar should NOT be visible
  const hideNavbarOnRoutes = ['/login', '/register', '/verify-email'];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-primary text-black dark:text-white transition-colors duration-300">

      {/* ✅ Conditionally hide Navbar based on route */}
      {isAuthenticated && !hideNavbarOnRoutes.includes(location.pathname) && <Navbar />}

      <ThemeToggle />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Email Verification Route */}
        <Route 
          path="/verify-email" 
          element={<VerifyEmail />} 
        />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><Dashboard onLogout={logout} /></ProtectedRoute>} 
        />
        <Route 
          path="/home" 
          element={<ProtectedRoute><Home /></ProtectedRoute>} 
        />
        <Route 
          path="/settings" 
          element={<ProtectedRoute><Settings /></ProtectedRoute>} 
        />

        {/* ✅ Admin Routes */}
        <Route 
          path="/admin" 
          element={<AdminRoute><AdminDashboard /></AdminRoute>} 
        />
        <Route 
          path="/admin/users" 
          element={<AdminRoute><ManageUsers /></AdminRoute>} 
        />
        <Route 
          path="/admin/settings" 
          element={<AdminRoute><SiteSettings /></AdminRoute>} 
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};


const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider>
      <AuthProvider navigate={navigate}>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
