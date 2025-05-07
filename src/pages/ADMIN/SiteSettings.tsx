import React, { useState } from 'react';

const SiteSettings: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Later: Persist setting to backend or local storage
  };

  const handleManageUsers = () => {
    // Later: Navigate to user management or trigger modal
    alert('Navigate to Manage Users page');
  };

  return (
    <div className="p-6 bg-white dark:bg-dark-primary text-black dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>

      <div className="space-y-6">
        {/* 🔘 Dark Mode Toggle */}
        <div className="flex items-center">
          <span className="font-medium">Dark Mode:</span>
          <button
            onClick={handleToggleDarkMode}
            className="ml-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
          >
            {isDarkMode ? 'Disable' : 'Enable'}
          </button>
        </div>

        {/* 👤 Manage Users */}
        <div className="flex items-center">
          <span className="font-medium">User Management:</span>
          <button
            onClick={handleManageUsers}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;
