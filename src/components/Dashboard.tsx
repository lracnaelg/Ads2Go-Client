import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../services/graphql';

interface User {
  id: string;
  name: string;
  email: string;
  houseAddress: string;
  contactNumber: string;
  role: string;
  isEmailVerified: boolean;
}

interface DashboardProps {
  onLogout: () => Promise<void>;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { data, error: queryError, loading: queryLoading } = useQuery(GET_USER_PROFILE);

  useEffect(() => {
    if (queryError) {
      setError(queryError.message);
      navigate('/login');
    } else if (data) {
      setUser(data.getUserProfile);
    }
    setLoading(queryLoading);
  }, [queryError, data, navigate, queryLoading]);

  const handleLogout = async () => {
    try {
      await onLogout();
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-primary-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-custom rounded-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <button 
            onClick={handleLogout}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="error-message mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <p className="text-gray-900 font-medium">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <p className="text-gray-900 font-medium">
                  {user.email}{' '}
                  {!user.isEmailVerified && (
                    <span className="text-yellow-600 text-sm ml-2">(Unverified)</span>
                  )}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Contact Number</label>
                <p className="text-gray-900 font-medium">{user.contactNumber}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Address Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-600">House Address</label>
              <p className="text-gray-900 font-medium">{user.houseAddress}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex space-x-4">
          <button 
            onClick={() => navigate('/edit-profile')}
            className="btn-primary"
          >
            Edit Profile
          </button>
          {!user.isEmailVerified && (
            <button 
              onClick={() => navigate('/verify-email')}
              className="btn-secondary"
            >
              Verify Email
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
