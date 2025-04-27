import React, { useState, useCallback } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, navigateToRegister } = useAuth();
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

      // Ensure user and role exist before redirecting
      if (user?.role?.toUpperCase() === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    }
  };

  return (
    <div 
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center text-white px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/1.png')" }}
    >
      <div className="w-full max-w-4xl bg-black bg-opacity-60 p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start">
        
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
          <h2 className="text-3xl font-extrabold mb-6 text-center md:text-left">LOG IN</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border rounded-md bg-opacity-50 bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2 border rounded-md bg-opacity-50 bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5 text-black" /> : <EyeIcon className="h-5 w-5 text-black" />}
                </button>
              </div>
            </div>
            {error && <div className="text-red-300 text-sm">{error}</div>}
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">Submit</button>
          </form>
        </div>

        {/* Right Side - Sign Up Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 mt-6 md:mt-0">
          <h2 className="text-2xl font-bold mb-2 text-center md:text-left">New Here?</h2>
          <p className="text-gray-300 text-center text-sm mb-4">Join us today and start exploring amazing features.</p>
          <button 
            onClick={handleRegisterClick} 
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
