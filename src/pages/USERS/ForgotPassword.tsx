import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    // Basic email validation
    if (!email.trim()) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      setIsLoading(false);
      return;
    }

    try {
      const success = await resetPassword(email.trim());
      if (success) {
        setSuccessMessage('Password reset email sent. Please check your inbox.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError('Failed to send password reset email. Please try again.');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center text-white px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/image/login.png')" }}
    >
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-lg overflow-hidden">
        {/* Left Side - Forgot Password Form */}
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col items-center">
          <img src="/image/blue-logo.png" alt="Logo" className="w-20 h-20 mb-6" />
          <h2 className="text-5xl text-center font-extrabold mb-6 text-black">RESET PASSWORD</h2>
          <form className="space-y-4 w-full max-w-sm" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black hover:scale-105 transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex justify-end items-center mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-40 bg-[#FF9D3D] text-white py-2 px-4 border rounded-[8px] transition hover:scale-105 transition-all duration-300 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - LOG IN and SIGN UP Text */}
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
          <div className="text-center">
            <h2
              className="text-3xl font-extrabold text-black mb-10 cursor-pointer transition-colors duration-200"
              onClick={() => navigate('/login')}
            >
              LOG IN
            </h2>
            <h2
              className="text-3xl font-extrabold text-black cursor-pointer transition-colors duration-200"
              onClick={() => navigate('/register')}
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

      {/* Success Pop-up in Bottom-Right Corner */}
      {successMessage && (
        <div className="fixed bottom-4 right-4 p-4 bg-[#9EBC8A] text-black/80 rounded-lg shadow-lg z-50">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;