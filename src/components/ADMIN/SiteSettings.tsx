import React from 'react';

const SiteSettings: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-dark-primary text-black dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Site Settings</h1>

      <div className="space-y-4">
        {/* Example Setting: Theme Toggle */}
        <div>
          <label className="font-medium">Dark Mode:</label>
          <button className="ml-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded">
            Toggle
          </button>
        </div>

        {/* Example Setting: Manage Users */}
        <div>
          <label className="font-medium">User Management:</label>
          <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;
