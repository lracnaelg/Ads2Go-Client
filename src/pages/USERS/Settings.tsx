import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Settings: React.FC = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  // Simulating fetch for user data (static mock-up)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || '',  // If name is undefined, default to an empty string
        email: user?.email || '', // If email is undefined, default to an empty string
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trimStart() }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.id) {
      console.error('User data is missing or invalid');
      return;
    }

    // Simulate API request to update user data
    setTimeout(() => {
      // Dynamically update user details via API (mock for now)
      setUser({
        ...user,
        id: user.id, // Make sure id is not undefined
        name: formData.name || '',  // Ensure non-undefined values
        email: formData.email || '', // Ensure non-undefined values
      });
      setMessage('✅ Profile updated successfully!');
    }, 1000); // Simulating delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Settings</h2>
        {message && (
          <div
            className="text-green-500 text-sm text-center mb-4"
            aria-live="polite"
          >
            {message}
            <button
              onClick={() => setMessage('')}
              className="ml-2 text-xs text-red-400 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-200 dark:bg-gray-700"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-200 dark:bg-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
