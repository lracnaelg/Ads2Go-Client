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
  status: 'active' | 'inactive';
  city: string;
}

const mockUsers: User[] = [
  { id: 1, lastName: 'Dominic', firstName: 'Dequina', middleName: 'hihihi', company: 'Nike', address: '1000 LA Street, Manila', contact: '09170001111', email: 'Domss@nike.com', status: 'active', city: 'Manila' },
  { id: 2, lastName: 'Glean', firstName: 'Carl', middleName: 'yyyyyy', company: 'Under Armour', address: '500 Oakland Ave, Cebu', contact: '09220002222', email: 'Glean@ua.com', status: 'inactive', city: 'Cebu' },
  { id: 3, lastName: 'Lang', firstName: 'Jairhon', middleName: 'dhskahd', company: 'Adidas', address: '300 Brooklyn Blvd, Davao', contact: '09330003333', email: 'jai@adidas.com', status: 'active', city: 'Davao' },
  { id: 4, lastName: 'Inocencio', firstName: 'Bianca', middleName: 'Panget', company: 'Tsinelas', address: '23 Chicago St, Iloilo', contact: '09440004444', email: 'Panget@ka.com', status: 'inactive', city: 'Iloilo' },
  { id: 5, lastName: 'Reyes', firstName: 'Juan', middleName: 'Miguel', company: 'Jollibee', address: '123 Katipunan Ave, Quezon City', contact: '09171234567', email: 'juan@jollibee.com', status: 'active', city: 'Quezon City' },
  { id: 6, lastName: 'Santos', firstName: 'Maria', middleName: 'Luisa', company: 'SM', address: 'SM North Edsa, Makati', contact: '09284561234', email: 'maria@sm.com', status: 'inactive', city: 'Makati' },
  { id: 7, lastName: 'Dela Cruz', firstName: 'Pedro', middleName: 'Jose', company: 'Globe', address: 'Ayala Ave, Taguig', contact: '09391231234', email: 'pedro@globe.com', status: 'active', city: 'Taguig' },
  { id: 8, lastName: 'Cruz', firstName: 'Ana', middleName: 'Isabel', company: 'PLDT', address: 'Ortigas Center, Pasig', contact: '09561231234', email: 'ana@pldt.com', status: 'inactive', city: 'Pasig' },
  { id: 9, lastName: 'Garcia', firstName: 'Leo', middleName: 'Manuel', company: 'BDO', address: 'Rizal Street, Baguio', contact: '09451234567', email: 'leo@bdo.com', status: 'active', city: 'Baguio' },
  { id: 10, lastName: 'Torres', firstName: 'Nina', middleName: 'Andrea', company: 'Ayala Corp', address: 'Bonifacio Global City, Taguig', contact: '09671231234', email: 'nina@ayala.com', status: 'inactive', city: 'Taguig' },
];

const cities = [
  'Manila', 'Quezon City', 'Cebu', 'Davao', 'Iloilo', 'Baguio', 'Makati', 'Taguig', 'Pasig', 'Parañaque',
];

const ManageUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [citySearch, setCitySearch] = useState('');
  const [showCityModal, setShowCityModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = 6;

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesCity = !selectedCity || user.city === selectedCity;
    return matchesSearch && matchesStatus && matchesCity;
  });

  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className="p-4">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 text-gray-800">View Users</h1>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by first name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
          className="border px-3 py-2 rounded w-full sm:w-48"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          onClick={() => setShowCityModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {selectedCity ? `City: ${selectedCity}` : 'Filter by City'}
        </button>
        {selectedCity && (
          <button
            onClick={() => setSelectedCity(null)}
            className="text-sm underline text-gray-600"
          >
            Clear City Filter
          </button>
        )}
      </div>

      {/* City Modal */}
      {showCityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white p-4 rounded-lg w-80 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Select a City</h3>
              <button onClick={() => setShowCityModal(false)}>&times;</button>
            </div>
            <input
              type="text"
              placeholder="Search cities..."
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              className="w-full border px-2 py-1 rounded mb-3"
            />
            <div className="max-h-60 overflow-y-auto">
              {cities
                .filter((city) =>
                  city.toLowerCase().includes(citySearch.toLowerCase())
                )
                .map((city) => (
                  <div
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setShowCityModal(false);
                      setCitySearch('');
                    }}
                    className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                  >
                    {city}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border rounded shadow">
        <div className="px-4 py-2 font-semibold border-b">
          Found: {filteredUsers.length}
        </div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-green-800 text-white text-sm">
              <th className="p-2 border">Last Name</th>
              <th className="p-2 border">First Name</th>
              <th className="p-2 border">Middle Name</th>
              <th className="p-2 border">Company</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, idx) => (
              <tr key={user.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-teal-50'}>
                <td className="p-2 border">{user.lastName}</td>
                <td className="p-2 border">{user.firstName}</td>
                <td className="p-2 border">{user.middleName}</td>
                <td className="p-2 border">{user.company}</td>
                <td className="p-2 border">{user.address}</td>
                <td className="p-2 border">{user.city}</td>
                <td className="p-2 border">{user.contact}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border capitalize">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center gap-2 py-3">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
