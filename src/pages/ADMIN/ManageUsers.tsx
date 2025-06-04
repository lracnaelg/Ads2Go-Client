import React, { useState } from 'react';

interface User {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  company: string;
  address: string;
  contact: string;
  email: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    lastName: 'Dominic',
    firstName: 'Dequina',
    middleName: 'hihihi',
    company: 'Nike',
    address: '1000 LA Street',
    contact: '09170001111',
    email: 'Domss@nike.com',
  },
  {
    id: 2,
    lastName: 'Glean',
    firstName: 'Carl',
    middleName: 'yyyyyy',
    company: 'Under Armour',
    address: '500 Oakland Ave',
    contact: '09220002222',
    email: 'Glean@ua.com',
  },
  {
    id: 3,
    lastName: 'Lang',
    firstName: 'Jairhon',
    middleName: 'dhskahd',
    company: 'Adidas',
    address: '300 Brooklyn Blvd',
    contact: '09330003333',
    email: 'jai@adidas.com',
  },
  {
    id: 4,
    lastName: 'Inocencio',
    firstName: 'Bianca',
    middleName: 'Panget',
    company: 'Tisnelas',
    address: '23 Chicago St',
    contact: '09440004444',
    email: 'Panget@tsinelas.com',
  },
];

const places = ['Metro Manila', 'Cebu', 'Davao', 'Iloilo', 'Baguio'];

const ManageUsers: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(mockUsers.length / usersPerPage);

  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePlaceToggle = (place: string) => {
    setSelectedPlaces((prev) =>
      prev.includes(place) ? prev.filter((p) => p !== place) : [...prev, place]
    );
  };

  const handleClearFilters = () => {
    setSelectedPlaces([]);
  };

  const filteredUsers = mockUsers.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="flex p-4">
      {/* Sidebar Filter */}
      <div className="w-1/4 pr-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold mb-4">Filter</h3>
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Places</h4>
            {places.map((place) => (
              <div key={place} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedPlaces.includes(place)}
                  onChange={() => handlePlaceToggle(place)}
                  className="w-4 h-4 border border-gray-400 rounded bg-white appearance-none checked:bg-blue-500"
                />
                <label className="ml-2 text-sm">{place}</label>
              </div>
            ))}
          </div>
          <button
            onClick={handleClearFilters}
            className="px-3 py-1 border border-gray-400 rounded text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4">
        {/* Top Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setShowSearch(true)}
            className={`bg-white border border-gray-300 px-4 py-2 rounded shadow-sm ${
              showSearch ? 'font-bold' : ''
            }`}
          >
            Find person
          </button>
          <button
            onClick={() => {
              setShowSearch(false);
              setSearchTerm('');
            }}
            className={`bg-white border border-gray-300 px-4 py-2 rounded shadow-sm ${
              !showSearch ? 'font-bold' : ''
            }`}
          >
            All people
          </button>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by first name..."
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {/* Result Count */}
        <div className="bg-white rounded-t-md px-4 py-2 border border-b-0">
          <p className="font-semibold">Found: {filteredUsers.length}</p>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-b-md border">
          <table className="w-full border-collapse">
            <thead>
            <tr className="bg-green-500 text-white text-sm font-semibold text-left">
                <th className="p-2 border">Last Name</th>
                <th className="p-2 border">First Name</th>
                <th className="p-2 border">Middle Name</th>
                <th className="p-2 border">Company Name</th>
                <th className="p-2 border">Company Address</th>
                <th className="p-2 border">Contact Number</th>
                <th className="p-2 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-teal-50'}
                >
                  <td className="p-2 border">{user.lastName}</td>
                  <td className="p-2 border">{user.firstName}</td>
                  <td className="p-2 border">{user.middleName}</td>
                  <td className="p-2 border">{user.company}</td>
                  <td className="p-2 border">{user.address}</td>
                  <td className="p-2 border">{user.contact}</td>
                  <td className="p-2 border">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-4 text-sm">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="text-black hover:text-blue-500"
          >
            &lt; Previous
          </button>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setCurrentPage(n)}
              className={`px-2 py-1 rounded ${
                currentPage === n
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border'
              }`}
            >
              {n}
            </button>
          ))}
          <span>...</span>
          <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="text-black hover:text-blue-500"
          >
            Next →
          </button>
          <button className="text-black hover:text-blue-500">Show all</button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
