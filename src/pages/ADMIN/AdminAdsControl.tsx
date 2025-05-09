import React, { useState } from 'react';

interface Ad {
  id: string;
  title: string;
  vehicleType: string;
  status: 'Playing' | 'Paused';
  duration: string;
}

const mockAds: Ad[] = [
  {
    id: 'A1',
    title: 'Cement Sale Promo',
    vehicleType: 'Car',
    status: 'Playing',
    duration: '30s',
  },
  {
    id: 'A2',
    title: 'New Gravel Supplier',
    vehicleType: 'Motorcycle',
    status: 'Paused',
    duration: '45s',
  },
  {
    id: 'A3',
    title: 'Construction Insurance',
    vehicleType: 'Electric Tricycle',
    status: 'Playing',
    duration: '60s',
  },
];

const AdminAdsControl: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>(mockAds);
  const [filterVehicle, setFilterVehicle] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const toggleAdStatus = (id: string) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === id
          ? { ...ad, status: ad.status === 'Playing' ? 'Paused' : 'Playing' }
          : ad
      )
    );
  };

  const filteredAds = ads.filter((ad) => {
    return (
      (filterVehicle ? ad.vehicleType === filterVehicle : true) &&
      (filterStatus ? ad.status === filterStatus : true)
    );
  });

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Admin Ad Control Panel</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={filterVehicle}
          onChange={(e) => setFilterVehicle(e.target.value)}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
        >
          <option value="">All Vehicle Types</option>
          <option value="Car">Car</option>
          <option value="Motorcycle">Motorcycle</option>
          <option value="Electric Tricycle">Electric Tricycle</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
        >
          <option value="">All Status</option>
          <option value="Playing">Playing</option>
          <option value="Paused">Paused</option>
        </select>
      </div>

      <table className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="p-3 text-left">Ad Title</th>
            <th className="p-3 text-left">Vehicle Type</th>
            <th className="p-3 text-left">Duration</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAds.map((ad) => (
            <tr key={ad.id} className="border-b border-gray-600">
              <td className="p-3">{ad.title}</td>
              <td className="p-3">{ad.vehicleType}</td>
              <td className="p-3">{ad.duration}</td>
              <td className="p-3">{ad.status}</td>
              <td className="p-3">
                <button
                  onClick={() => toggleAdStatus(ad.id)}
                  className={`px-3 py-1 rounded ${
                    ad.status === 'Playing' ? 'bg-yellow-500' : 'bg-green-500'
                  } hover:opacity-80`}
                >
                  {ad.status === 'Playing' ? 'Pause' : 'Play'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAdsControl;
