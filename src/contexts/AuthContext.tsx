import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useMutation, useApolloClient, useLazyQuery } from '@apollo/client';
import { LOGIN_MUTATION, REGISTER_MUTATION, LOGOUT_MUTATION } from '../services/graphql';
import { GET_OWN_USER_DETAILS } from '../graphql/queries/getOwnUserDetails';
import { jwtDecode } from 'jwt-decode';

// Types
type UserRole = "ADMIN" | "USER" | "SUPERADMIN";

interface User {
  userId: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  name?: string;
  id?: string;
  address?: string;
  companyName?: string;
  companyAddress?: string;
  contactNumber?: string;
  profilePicture?: string;
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
  const hasRedirectedRef = useRef(false); // ✅ Moved inside component
  const [user, setUser] = useState<User | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [registerMutation] = useMutation(REGISTER_MUTATION);
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);
  const apolloClient = useApolloClient();
  const [fetchUserDetails] = useLazyQuery(GET_OWN_USER_DETAILS);

  const navigateToRegister = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  const publicPages = ['/login', '/register', '/forgot-password'];

  const checkAuthentication = useCallback(async () => {
    const token = localStorage.getItem('token');
    console.log('Stored Token:', token);

    if (token) {
      try {
        const decoded = jwtDecode<any>(token);
        console.log('✅ Decoded Token:', decoded);

        if (!decoded || !decoded.email) {
          console.warn('⚠️ Decoded token missing required fields. Forcing logout.');
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const { data } = await fetchUserDetails();

        if (!data || !data.getOwnUserDetails) {
          console.warn('⚠️ No user data returned from backend.');
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const freshUser = data.getOwnUserDetails;

        setUser(freshUser);
        setUserEmail(freshUser.email);

        if (hasRedirectedRef.current) return;

        if (!freshUser.isEmailVerified) {
          console.log('❌ Redirecting to /verify-email');
          hasRedirectedRef.current = true;
          navigate('/verify-email');
        } else {
          const redirectPath = freshUser.role?.toUpperCase() === 'ADMIN' ? '/admin' : '/home';
          if (publicPages.includes(window.location.pathname) || window.location.pathname === '/verify-email') {
            console.log(`✅ Redirecting to ${redirectPath}`);
            hasRedirectedRef.current = true;
            navigate(redirectPath);
          }
        }
      } catch (error) {
        console.error('Token decoding or user fetch failed:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [fetchUserDetails, navigate]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

 const login = async (email: string, password: string): Promise<User | null> => {
  try {
    const deviceInfo = {
      deviceId: 'web-client',
      deviceType: 'web',
      deviceName: navigator.userAgent,
    };

    const { data } = await loginMutation({
      variables: { email, password, deviceInfo },
    });

    const token = data?.login?.token;
    const user = data?.login?.user;

    if (token && user) {
      localStorage.setItem('token', token);
      setUser(user);
      setUserEmail(user.email);

      console.log('✅ Logged in user:', user);

      if (!user.isEmailVerified) {
        // Immediate redirect is safe here
        navigate('/verify-email');
        return user;
      }

      // 🔧 Use setTimeout to let React finish rendering
      setTimeout(() => {
        switch (user.role.toUpperCase()) {
          case 'ADMIN':
            navigate('/admin');
            break;
          case 'SUPERADMIN':
            navigate('/sadmin-dashboard');
            break;
          default:
            navigate('/home');
        }
      }, 0);

      return user;
    } else {
      throw new Error('Invalid login response');
    }
  } catch (error: any) {
    console.error('Login error:', error.message || error);
    alert(error.message || 'Login failed');
    return null;
  }
};

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

  const debugToken = (token: string): User | null => {
    try {
      return jwtDecode<User>(token);
    } catch (error) {
      console.error('Token decoding error:', error);
      return null;
    }
  };

  const contextValue = {
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
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
