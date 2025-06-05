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
  {
    id: 1,
    lastName: 'Garcia',
    firstName: 'Juan',
    middleName: 'Santos',
    company: 'TechCorp',
    address: '123 Ayala Ave.',
    contact: '09171234567',
    email: 'juan.garcia@techcorp.com',
    status: 'active',
    city: 'Makati',
  },
  {
    id: 2,
    lastName: 'Reyes',
    firstName: 'Maria',
    middleName: 'Lopez',
    company: 'AgriFarm Inc.',
    address: '456 Quezon Blvd.',
    contact: '09987654321',
    email: 'maria.reyes@agrifarm.com',
    status: 'inactive',
    city: 'Quezon City',
  },
  {
    id: 3,
    lastName: 'Cruz',
    firstName: 'Pedro',
    middleName: 'Dela Cruz',
    company: 'BuildIt',
    address: '789 Katipunan St.',
    contact: '09182345678',
    email: 'pedro.cruz@buildit.com',
    status: 'active',
    city: 'Manila',
  },
  {
    id: 4,
    lastName: 'Dela Rosa',
    firstName: 'Ana',
    middleName: 'Mendoza',
    company: 'SmartBuild',
    address: '101 Maginhawa St.',
    contact: '09174561234',
    email: 'ana.rosa@smartbuild.com',
    status: 'active',
    city: 'Pasig',
  },
  {
    id: 5,
    lastName: 'Santos',
    firstName: 'Carlos',
    middleName: 'Rivera',
    company: 'GreenFields',
    address: '34 Davao St.',
    contact: '09176543210',
    email: 'carlos.santos@greenfields.com',
    status: 'inactive',
    city: 'Davao',
  },
  {
    id: 6,
    lastName: 'Navarro',
    firstName: 'Liza',
    middleName: 'Gomez',
    company: 'BioTech PH',
    address: '88 Baguio Hilltop Rd.',
    contact: '09171239876',
    email: 'liza.navarro@biotechph.com',
    status: 'active',
    city: 'Baguio',
  },
  {
    id: 7,
    lastName: 'Lopez',
    firstName: 'Miguel',
    middleName: 'Torres',
    company: 'AutoMate',
    address: '14 Iloilo Ave.',
    contact: '09223456789',
    email: 'miguel.lopez@automate.com',
    status: 'inactive',
    city: 'Iloilo',
  },
  {
    id: 8,
    lastName: 'Torres',
    firstName: 'Sofia',
    middleName: 'Reyes',
    company: 'NextGen',
    address: '22 Taguig Rd.',
    contact: '09181234567',
    email: 'sofia.torres@nextgen.com',
    status: 'active',
    city: 'Taguig',
  },
  {
    id: 9,
    lastName: 'Fernandez',
    firstName: 'Marco',
    middleName: 'Luis',
    company: 'CloudLink',
    address: '77 Makati Ave.',
    contact: '09331234567',
    email: 'marco.fernandez@cloudlink.com',
    status: 'active',
    city: 'Makati',
  },
  {
    id: 10,
    lastName: 'Ramirez',
    firstName: 'Isabel',
    middleName: 'Delos Santos',
    company: 'HealthPlus',
    address: '65 Quezon Ave.',
    contact: '09451234567',
    email: 'isabel.ramirez@healthplus.com',
    status: 'inactive',
    city: 'Quezon City',
  },
];

const cities = ['Manila', 'Quezon City', 'Cebu', 'Davao', 'Iloilo', 'Baguio', 'Makati', 'Taguig', 'Pasig', 'Parañaque'];

const ManageUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [citySearch, setCitySearch] = useState('');
  const [showCityModal, setShowCityModal] = useState(false);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesCity = !selectedCity || user.city === selectedCity;
    return matchesSearch && matchesStatus && matchesCity;
  });

  return (
    <div className="pt-2 pb-10 pl-64">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Users List</h2>
          <input
            type="text"
            className="border rounded px-3 py-1 text-sm w-64"
            placeholder="Search by first name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {['all', 'active', 'inactive'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as 'all' | 'active' | 'inactive')}
              className={`px-4 py-1 text-sm rounded-full border ${
                statusFilter === status ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
          <button
            onClick={() => setShowCityModal(true)}
            className="px-4 py-1 text-sm rounded-full border border-green-600 text-green-600"
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
                  .filter(city => city.toLowerCase().includes(citySearch.toLowerCase()))
                  .map(city => (
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
        <div className="overflow-auto border rounded-md mb-4">
          <table className="min-w-full text-sm">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-3 py-2 text-left">Last Name</th>
                <th className="px-3 py-2 text-left">First Name</th>
                <th className="px-3 py-2 text-left">Middle Name</th>
                <th className="px-3 py-2 text-left">Company</th>
                <th className="px-3 py-2 text-left">Address</th>
                <th className="px-3 py-2 text-left">City</th>
                <th className="px-3 py-2 text-left">Contact</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className={index % 2 === 0 ? 'bg-teal-50' : 'bg-white'}>
                  <td className="px-3 py-2">{user.lastName}</td>
                  <td className="px-3 py-2">{user.firstName}</td>
                  <td className="px-3 py-2">{user.middleName}</td>
                  <td className="px-3 py-2">{user.company}</td>
                  <td className="px-3 py-2">{user.address}</td>
                  <td className="px-3 py-2">{user.city}</td>
                  <td className="px-3 py-2">{user.contact}</td>
                  <td className="px-3 py-2">{user.email}</td>
                  <td className="px-3 py-2 capitalize">{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Found: {filteredUsers.length}</span>
          <button className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 text-sm">
            Export to Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
