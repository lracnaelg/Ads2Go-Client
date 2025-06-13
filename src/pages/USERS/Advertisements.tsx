import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Toast notification type
type Toast = {
  id: number;
  message: string;
  type: 'error' | 'success';
};

// Ad type (previously Order)
type Ad = {
  id: number;
  title: string;
  riders: number;
  date: string;
  price: number;
  status: 'Pending' | 'Dispatch' | 'Completed';
  vehicleType: 'Car' | 'Motor' | 'Jeep' | 'Bus';
  material: 'LCD Screen' | 'Posters' | 'Vinyl Sticker';
  plan: 'Monthly' | 'Weekly';
  format: 'Image' | 'Video';
  imagePath?: string;
};

const Advertisements: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All advertisements');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [startDate, setStartDate] = useState('2020-07-31');
  const [endDate, setEndDate] = useState('2020-08-03');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const itemsPerPage = 6;

  // Sample ad data with new fields
  const [ads, setAds] = useState<Ad[]>([
    { id: 2632, title: 'Brooklyn Zoe', riders: 5, date: '31 Jul 2020', price: 64.00, status: 'Pending', vehicleType: 'Car', material: 'LCD Screen', plan: 'Monthly', format: 'Image', imagePath: '/image/blue-logo.png' },
    { id: 2633, title: 'John McCormick', riders: 67, date: '01 Aug 2020', price: 35.00, status: 'Dispatch', vehicleType: 'Motor', material: 'Posters', plan: 'Weekly', format: 'Video' },
    { id: 2634, title: 'Sandra Pugh', riders: 10, date: '02 Aug 2020', price: 74.00, status: 'Completed', vehicleType: 'Jeep', material: 'Vinyl Sticker', plan: 'Monthly', format: 'Image' },
    { id: 2635, title: 'Vennie Hart', riders: 3, date: '02 Aug 2020', price: 82.00, status: 'Pending', vehicleType: 'Bus', material: 'LCD Screen', plan: 'Weekly', format: 'Video' },
    { id: 2636, title: 'Mark Clark', riders: 8, date: '03 Aug 2020', price: 38.00, status: 'Dispatch', vehicleType: 'Car', material: 'Posters', plan: 'Monthly', format: 'Image' },
    { id: 2637, title: 'Rebekah Foster', riders: 15, date: '03 Aug 2020', price: 67.00, status: 'Pending', vehicleType: 'Motor', material: 'Vinyl Sticker', plan: 'Weekly', format: 'Video' },
  ]);

  // Add toast notification
  const addToast = (message: string, type: 'error' | 'success' = 'error') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  // Remove toast notification
  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setToasts([]);
    setCurrentPage(1);
  };

  // Handle ad deletion
  const handleDeleteAd = (id: number) => {
    const message = 'Are you sure you want to delete this ad?';
    const callback = () => {
      setAds((prev) => prev.filter((ad) => ad.id !== id));
      addToast('Ad deleted successfully.', 'success');
    };
    showConfirmModal(message, callback);
  };

  // Toggle expandable row
  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  // Handle opening the confirmation modal
  const showConfirmModal = (message: string, callback: () => void) => {
    // Implementation removed as modal is no longer used
  };

  // Filter ads based on active tab
  const filteredAds = activeTab === 'All advertisements'
    ? ads
    : ads.filter((ad) => ad.status === activeTab);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAds.length / itemsPerPage);

  // Dynamic pagination range
  const startItem = indexOfFirstItem + 1;
  const endItem = Math.min(indexOfLastItem, filteredAds.length);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex-1 pl-60 pb-6 pr-1 bg-white-100">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Advertisements</h1>
          <div className="flex space-x-2">
            <span className="text-gray-500 mt-2">{filteredAds.length} Ads found</span>
            <Link to="/create-advertisement">
              <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Add New Ads</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-6 rounded-lg shadow ">
        <div className="space-x-4">
          {['All advertisements', 'Dispatch', 'Pending', 'Completed'].map((tab) => (
            <span
              key={tab}
              className={`text-black cursor-pointer ${activeTab === tab ? 'font-bold text-teal-700 border-b-2 border-teal-700' : ''}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      {/* Date Range Filters */}
      <div className="bg-white p-6 rounded-lg shadow mb-1 flex justify-between items-center">
        <div className="text-gray-500">From <span className="font-semibold">{startDate}</span> To <span className="font-semibold">{endDate}</span></div>
        <div className="flex space-x-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="pb-2">ID <span className="text-xs">↑</span></th>
              <th className="pb-2">Title</th>
              <th className="pb-2">No. of Riders</th>
              <th className="pb-2">Date <span className="text-xs">↑</span></th>
              <th className="pb-2">Price <span className="text-xs">↑</span></th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentAds.map((ad) => (
              <React.Fragment key={ad.id}>
                <tr
                  className={`border-t ${ad.status === 'Dispatch' ? 'bg-green-50' : ''} cursor-pointer hover:bg-teal-100`}
                  onClick={() => toggleExpand(ad.id)}
                >
                  <td className="py-2">#{ad.id}</td>
                  <td className="py-2">{ad.title}</td>
                  <td className="py-2">{ad.riders}</td>
                  <td className="py-2">{ad.date}</td>
                  <td className="py-2">${ad.price.toFixed(2)}</td>
                  <td className="py-2">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${ad.status === 'Pending' ? 'bg-red-500' : ad.status === 'Dispatch' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                    {ad.status}
                  </td>
                </tr>
                {expandedId === ad.id && (
                  <tr className="bg-gray-100">
                    <td colSpan={6} className="p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                        <div><strong>Format:</strong> {ad.format}</div>
                        <div><strong>Date Ended:</strong> {(() => {
                          const startDate = new Date(ad.date);
                          startDate.setMonth(startDate.getMonth() + (ad.plan === 'Monthly' ? 1 : 0.25));
                          return startDate.toLocaleDateString();
                        })()}</div>
                        <div><strong>Material:</strong> {ad.material}</div>
                        <div><strong>Vehicle Type:</strong> {ad.vehicleType}</div>
                        <div><strong>Plan:</strong> {ad.plan}</div>
                        <div>
                          <strong>Media:</strong><br />
                          {ad.format === 'Video' ? (
                            <video controls className="w-40 h-40 object-cover rounded-lg">
                              <source src="https://via.placeholder.com/150.mp4" type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : ad.format === 'Image' && ad.imagePath ? (
                            <img src={ad.imagePath} alt={`${ad.title} image`} className="w-40 h-40 object-cover rounded-lg" />
                          ) : (
                            <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                              No Image
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 rounded-lg mt-6 flex justify-between items-center">
        <span className="text-gray-500">
          Showing {startItem}-{endItem} of {filteredAds.length}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50"
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-2 py-1 border border-gray-300 rounded ${
                currentPage === page ? 'bg-teal-600 text-white' : ''
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50"
          >
            »
          </button>
        </div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-between max-w-xs animate-slideIn ${toast.type === 'error' ? 'bg-red-400' : 'bg-green-400'}`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <style> 
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Advertisements;