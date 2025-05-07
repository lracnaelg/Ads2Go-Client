import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  houseAddress: string;
  contactNumber: string;
  isEmailVerified: boolean;
}

// 🔹 Mock Users (replace with fetched data later)
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'USER',
    houseAddress: '123 Elm Street',
    contactNumber: '09123456789',
    isEmailVerified: true,
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'ADMIN',
    houseAddress: '456 Oak Avenue',
    contactNumber: '09987654321',
    isEmailVerified: false,
  },
];

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterVerified, setFilterVerified] = useState('');

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterRole ? user.role === filterRole : true) &&
      (filterVerified ? (filterVerified === 'Verified' ? user.isEmailVerified : !user.isEmailVerified) : true)
    );
  });

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Manage Users (Static Mock)</h1>

      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded w-64"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
        >
          <option value="">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <select
          value={filterVerified}
          onChange={(e) => setFilterVerified(e.target.value)}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
        >
          <option value="">All Status</option>
          <option value="Verified">Verified</option>
          <option value="Not Verified">Not Verified</option>
        </select>
      </div>

      <table className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Contact</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Verified</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-b border-gray-600">
              <td className="p-3 cursor-pointer" onClick={() => setSelectedUser(user)}>{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.houseAddress}</td>
              <td className="p-3">{user.contactNumber}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.isEmailVerified ? '✅' : '❌'}</td>
              <td className="p-3 flex space-x-3">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 flex items-center"
                >
                  <TrashIcon className="w-4 h-4 mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Address:</strong> {selectedUser.houseAddress}</p>
            <p><strong>Contact:</strong> {selectedUser.contactNumber}</p>
            <p><strong>Verified:</strong> {selectedUser.isEmailVerified ? 'Yes' : 'No'}</p>
            <button onClick={() => setSelectedUser(null)} className="mt-4 bg-gray-600 px-3 py-1 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
