import React, { useState, useCallback, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { user, navigateToRegister, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegisterClick = useCallback(() => {
    navigateToRegister();
  }, [navigateToRegister]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const user = await login(email, password);

      if (!user) {
        setError('Login failed. Please check your credentials.');
        return;
      }

      if (user?.role?.toUpperCase() === 'ADMIN') {
        navigate('/admin');
      } else if (user?.role?.toUpperCase() === 'SUPERADMIN') {
        navigate('/sadmin-dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    }
  };

  // Auto-dismiss error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div 
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center text-white px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/image/login.png')" }}
    >
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-lg overflow-hidden">
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col items-center">
          <img src="/image/blue-logo.png" alt="Logo" className="w-20 h-20 mb-6" />
          <h2 className="text-5xl font-extrabold mb-6 text-black">LOGIN</h2>
          <form className="space-y-4 w-full max-w-sm" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black hover:scale-105 transition-all duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black hover:scale-105 transition-all duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center gap-4">
              <a href="/forgot-pass" className="text-black text-sm">Forgot Password?</a>
              <button type="submit" className="w-40 bg-[#FF9D3D] text-white py-2 px-4 border rounded-[8px] 
              transition hover:scale-105 transition-all duration-300">Login</button>            
            </div>
            <div className="text-center text-gray-600 text-sm">Or Login with</div>
            <div className="flex justify-center gap-4">
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - LOG IN and SIGN UP Text */}
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-black mb-10">LOG IN</h2>
            <h2 
              className="text-3xl font-extrabold text-white cursor-pointer" 
              onClick={handleRegisterClick}
            >
              SIGN UP
            </h2>
          </div>
        </div>
      </div>

      {/* Error Pop-up in Bottom-Right Corner */}
      {error && (
        <div className="fixed bottom-4 right-4 p-4 bg-[#D2665A] text-white/80 rounded-lg shadow-lg z-50">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Login;