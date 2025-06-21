import React, { useState } from 'react';

interface Material {
  id: string;
  name: string;
  shortName: string;
  status: 'Used' | 'Available';
  startDate: string;
  endDate: string;
  usedBy: string;
  type: 'LCD' | 'BANNER' | 'STICKER' | 'HEADDRESS';
}

const mockData: Material[] = [
  { id: '001', name: 'LCD', shortName: 'ABCAPP', status: 'Available', startDate: 'N/A', endDate: 'N/A', usedBy: 'N/A', type: 'LCD' },
  { id: '002', name: 'BANNER', shortName: 'ABCAPP', status: 'Used', startDate: '11.01.2008', endDate: '11.01.2009', usedBy: 'ABC', type: 'BANNER' },
  { id: '003', name: 'STICKER', shortName: 'ABCAPP', status: 'Available', startDate: 'N/A', endDate: 'N/A', usedBy: 'N/A', type: 'STICKER' },
  { id: '004', name: 'Headress', shortName: 'ABCAPP', status: 'Available', startDate: 'N/A', endDate: 'N/A', usedBy: 'N/A', type: 'HEADDRESS' },
  { id: '005', name: 'LCD', shortName: 'ABCAPP', status: 'Available', startDate: 'N/A', endDate: 'N/A', usedBy: 'N/A', type: 'LCD' },
  { id: '006', name: 'LCD', shortName: 'ABCAPP', status: 'Available', startDate: 'N/A', endDate: 'N/A', usedBy: 'N/A', type: 'LCD' },
  { id: '007', name: 'LCD', shortName: 'ABCAPP', status: 'Available', startDate: 'N/A', endDate: 'N/A', usedBy: 'N/A', type: 'LCD' },
  { id: '008', name: 'LCD', shortName: 'ABCAPP', status: 'Used', startDate: '11.01.2008', endDate: '11.01.2009', usedBy: 'ABC', type: 'LCD' },
  { id: '009', name: 'LCD', shortName: 'ABCAPP', status: 'Available', startDate: 'N/A', endDate: 'N/A', usedBy: 'N/A', type: 'LCD' },
];

const Materials: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'All' | 'LCD' | 'BANNER' | 'STICKER' | 'HEADDRESS'>('All');
  const [showUsed, setShowUsed] = useState(true);
  const [showAvailable, setShowAvailable] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockData.filter(material => {
    const typeMatch = selectedType === 'All' || material.type === selectedType;
    const statusMatch = (showUsed && material.status === 'Used') || (showAvailable && material.status === 'Available');
    const searchMatch =
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.usedBy.toLowerCase().includes(searchTerm.toLowerCase());

    return typeMatch && statusMatch && searchMatch;
  });

  return (
    <div className="pt-2 pb-10 pl-64">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        {/* Header with Static Title */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Materials List</h2>
        </div>

        {/* Search Bar and Filters */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="border rounded px-3 py-1 text-sm w-64"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex space-x-2">
            <select
              className="border rounded px-3 py-1 text-sm text-gray-800 focus:outline-none"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'All' | 'LCD' | 'BANNER' | 'STICKER' | 'HEADDRESS')}
            >
              <option value="All">All Materials</option>
              <option value="LCD">LCD</option>
              <option value="BANNER">BANNER</option>
              <option value="STICKER">STICKER</option>
              <option value="HEADDRESS">HEADDRESS</option>
            </select>
          </div>
        </div>

        {/* Status Checkboxes */}
        <div className="flex items-center mb-4">
          <div className="flex space-x-4">
            <label className="flex items-center gap-1 text-sm">
              <input type="checkbox" checked={showUsed} onChange={() => setShowUsed(!showUsed)} />
              Used
            </label>
            <label className="flex items-center gap-1 text-sm">
              <input type="checkbox" checked={showAvailable} onChange={() => setShowAvailable(!showAvailable)} />
              Available
            </label>
          </div>
          <div className="ml-auto text-sm text-gray-600">
            <span className="mr-4">Used <strong>{mockData.filter(d => d.status === 'Used').length}</strong></span>
            <span>Available <strong>{mockData.filter(d => d.status === 'Available').length}</strong></span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto border rounded-md mb-4">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700">Material Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Short Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Start Date</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">End Date</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Used By</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((material, index) => (
                <tr key={material.id} className="bg-white hover:bg-gray-100">
                  <td className="px-2 py-3">{material.id}</td>
                  <td className="px-2 py-3">{material.name}</td>
                  <td className="px-4 py-3">{material.shortName}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        material.status === 'Used' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {material.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{material.startDate}</td>
                  <td className="px-4 py-3">{material.endDate}</td>
                  <td className="px-4 py-3">{material.usedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Found: {filtered.length}</span>
          <button className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 text-sm">
            Export to Excel
          </button>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 gap-2 text-sm flex-wrap">
          <button className="px-2 py-1 border rounded text-gray-400 cursor-not-allowed">← Previous</button>
          <button className="px-2 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-2 py-1">2</button>
          <button className="px-2 py-1">3</button>
          <button className="px-2 py-1">4</button>
          <button className="px-2 py-1">5</button>
          <span>...</span>
          <button className="px-2 py-1">31</button>
          <button className="px-2 py-1 border rounded text-blue-600">Next →</button>
          <button className="px-2 py-1 text-blue-600">Show all</button>
        </div>
      </div>
    </div>
  );
};

export default Materials;