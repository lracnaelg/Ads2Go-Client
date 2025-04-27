import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { LOGIN_MUTATION, REGISTER_MUTATION, LOGOUT_MUTATION } from '../services/graphql';
import { jwtDecode } from 'jwt-decode';

// Types
type UserRole = "ADMIN" | "USER"; // Match backend

interface User {
  userId: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  name?: string;  // Added name field
  id?: string;    // Added id field
}


interface AuthContextType {
  user: User | null;
  userEmail: string;
  setUser: (user: User | null) => void;
  setUserEmail: (email: string) => void;
  login: (email: string, password: string) => Promise<User | null>;
  register: (userData: any) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  navigate: (path: string) => void;
  debugToken: (token: string) => User | null;
  navigateToRegister: () => void;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode; navigate: (path: string) => void }> = ({
  children,
  navigate,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [registerMutation] = useMutation(REGISTER_MUTATION);
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);
  const apolloClient = useApolloClient();

  // Navigate to register page
  const navigateToRegister = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  // Public pages that unauthenticated users can access
  const publicPages = ['/login', '/register', '/forgot-password'];

  // Authentication check
  const checkAuthentication = useCallback(() => {
    const token = localStorage.getItem('token');
    console.log('Stored Token:', token);
  
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        console.log('Decoded Token:', decoded);
  
        setUser(decoded);
        setUserEmail(decoded.email);
  
        if (decoded.isEmailVerified) {
          if (publicPages.includes(window.location.pathname) || window.location.pathname === '/verify-email') {
            const redirectPath = decoded.role.toUpperCase() === 'ADMIN' ? '/admin' : '/home';
            console.log(`✅ Redirecting to ${redirectPath}`);
            navigate(redirectPath);
          }
        } else {
          if (!publicPages.includes(window.location.pathname) && window.location.pathname !== '/verify-email') {
            console.log('❌ Redirecting to /verify-email');
            navigate('/verify-email');
          }
        }
      } catch (error) {
        console.error('Token decoding failed:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [navigate]);
  
  

  // Run check on first load
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  // Login function
  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      console.log(`Attempting login for email: ${email}`);
  
      // Device Info
      const deviceInfo = {
        deviceId: 'web',
        deviceType: 'browser',
        deviceName: navigator.userAgent,
      };
  
      const { data, errors } = await loginMutation({ variables: { email, password, deviceInfo } });
  
      if (errors) {
        console.error('GraphQL errors:', errors);
        alert('An error occurred while logging in. Please try again.');
        return null;
      }
  
      console.log('Login response data:', data);
  
      if (data?.login?.token) {
        const token = data.login.token;
        localStorage.setItem('token', token);
  
        const decoded = jwtDecode<User>(token);
        console.log('🔍 Decoded Token:', decoded); // Debugging step
  
        setUser(decoded);
        setUserEmail(decoded.email);


        console.log("🟢 Stored User Role in Context:", user?.role);

        console.log(`✅ Login successful! Role: ${decoded.role}`);
        
  
        // Ensure role-based redirection works properly
        if (decoded.role.toLowerCase() === 'admin') {
          console.log('🔴 Redirecting to Admin Dashboard...');
          navigate('/admin');
        } else {
          console.log('🔵 Redirecting to User Homepage...');
          navigate('/home');
        }
        
        
  
        return decoded;
      }
  
      if (data?.login?.error) {
        console.log('Login error message:', data.login.error);
        alert(data.login.error);
      }
  
      return null;
    } catch (error) {
      console.error('❌ Login error:', error);
      alert('An error occurred while logging in. Please try again.');
      return null;
    }
  };
  
  

  // Register function
  const register = async (userData: any): Promise<boolean> => {
    try {
      const { data } = await registerMutation({ variables: { input: userData } });

      if (data?.createUser?.token) {
        const token = data.createUser.token;
        localStorage.setItem('token', token);

        const decoded = jwtDecode<User>(token);
        setUser(decoded);
        setUserEmail(decoded.email);

        if (!decoded.isEmailVerified) {
          navigate('/verify-email');
        } else {
          navigate(decoded.role === "ADMIN" ? "/admin" : "/home");
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await logoutMutation();
      localStorage.removeItem('token');
      setUser(null);
      setUserEmail('');
      await apolloClient.resetStore();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Debug token function
  const debugToken = (token: string): User | null => {
    try {
      return jwtDecode<User>(token);
    } catch (error) {
      console.error('Token decoding error:', error);
      return null;
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      userEmail,
      setUser,
      setUserEmail,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      navigate,
      debugToken,
      navigateToRegister,
    }),
    [user, userEmail, navigate]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
