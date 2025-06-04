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
    <div className="pt-2 pb-10 pl-64"> {/* Added left padding to prevent overlap */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Materials List’s</h2>
          <input
            type="text"
            className="border rounded px-3 py-1 text-sm w-64"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {['All', 'LCD', 'BANNER', 'STICKER', 'HEADDRESS'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type as typeof selectedType)}
              className={`px-4 py-1 text-sm rounded-full border ${
                selectedType === type ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Status Checkboxes */}
        <div className="flex gap-6 items-center mb-4">
          <label className="flex items-center gap-1 text-sm">
            <input type="checkbox" checked={showUsed} onChange={() => setShowUsed(!showUsed)} />
            Used
          </label>
          <label className="flex items-center gap-1 text-sm">
            <input type="checkbox" checked={showAvailable} onChange={() => setShowAvailable(!showAvailable)} />
            Available
          </label>
          <div className="ml-auto text-sm">
            <span className="mr-4">Used <strong>{mockData.filter(d => d.status === 'Used').length}</strong></span>
            <span>Available <strong>{mockData.filter(d => d.status === 'Available').length}</strong></span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto border rounded-md mb-4">
          <table className="min-w-full text-sm">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">Material name</th>
                <th className="px-3 py-2 text-left">Short name</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Start date</th>
                <th className="px-3 py-2 text-left">End date</th>
                <th className="px-3 py-2 text-left">Used By</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((material, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-teal-50' : 'bg-white'}>
                  <td className="px-3 py-2">{material.id}</td>
                  <td className="px-3 py-2">{material.name}</td>
                  <td className="px-3 py-2">{material.shortName}</td>
                  <td className="px-3 py-2">{material.status}</td>
                  <td className="px-3 py-2">{material.startDate}</td>
                  <td className="px-3 py-2">{material.endDate}</td>
                  <td className="px-3 py-2">{material.usedBy}</td>
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
          <button className="text-gray-400 cursor-not-allowed">← Previous</button>
          <button className="px-2 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-2 py-1">2</button>
          <button className="px-2 py-1">3</button>
          <button className="px-2 py-1">4</button>
          <button className="px-2 py-1">5</button>
          <span>...</span>
          <button className="px-2 py-1">31</button>
          <button className="text-blue-600">Next →</button>
          <button className="text-blue-600">Show all</button>
        </div>
      </div>
    </div>
  );
};

export default Materials;
