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
  mediaDisplayed?: boolean;
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
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null);
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

  // Handle opening the modal with ad details
  const handleViewDetails = (ad: Ad) => {
    setSelectedAd(ad);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAd(null);
  };

  // Handle opening the confirmation modal
  const showConfirmModal = (message: string, callback: () => void) => {
    setConfirmMessage(message);
    setOnConfirmCallback(() => callback);
    setIsConfirmModalOpen(true);
  };

  // Handle closing the confirmation modal
  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setConfirmMessage('');
    setOnConfirmCallback(null);
  };

  // Handle confirming the action in the confirmation modal
  const handleConfirm = () => {
    if (onConfirmCallback) {
      onConfirmCallback();
    }
    handleCloseConfirmModal();
  };

  // Handle image/video display confirmation
  const handleShowMedia = () => {
    if (selectedAd) {
      const message = `Do you want to display the ${selectedAd.format.toLowerCase()} for "${selectedAd.title}"?`;
      const callback = () => {
        setSelectedAd((prev) => (prev ? { ...prev, mediaDisplayed: true } : null));
      };
      showConfirmModal(message, callback);
    }
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
    <div className="flex-1 pl-64 pb-6 pr-1 bg-gray-100">
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
              <th className="pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentAds.map((ad) => (
              <tr
                key={ad.id}
                className={`border-t ${ad.status === 'Dispatch' ? 'bg-green-50' : ''}`}
              >
                <td className="py-2">#{ad.id}</td>
                <td className="py-2">
                  <div className="flex items-center">
                    {ad.title}
                  </div>
                </td>
                <td className="py-2">{ad.riders}</td>
                <td className="py-2">{ad.date}</td>
                <td className="py-2">${ad.price.toFixed(2)}</td>
                <td className="py-2">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${ad.status === 'Pending' ? 'bg-red-500' : ad.status === 'Dispatch' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                  {ad.status}
                </td>
                <td className="py-2">
                  <button
                    onClick={() => handleViewDetails(ad)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Ad Details */}
      {isModalOpen && selectedAd && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full mx-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Advertisement Details</h2>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image/Media Section */}
              <div className="w-full md:w-48 flex-shrink-0">
                {selectedAd.format === 'Image' && selectedAd.mediaDisplayed && selectedAd.imagePath ? (
                  <img
                    src={selectedAd.imagePath}
                    alt={`${selectedAd.title} image`}
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                ) : selectedAd.format === 'Video' && selectedAd.mediaDisplayed ? (
                  <video controls className="w-48 h-48 object-cover rounded-lg">
                    <source src="https://via.placeholder.com/150.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              {/* Details Section */}
              <div className="flex-1 grid grid-cols-1 gap-2 text-gray-700">
                <div className="flex">
                  <span className="font-medium mr-2">ID:</span>
                  <span>#{selectedAd.id}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Title:</span>
                  <span>{selectedAd.title}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Price:</span>
                  <span>${selectedAd.price.toFixed(2)}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Format:</span>
                  <span>{selectedAd.format}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">No. of Riders:</span>
                  <span>{selectedAd.riders}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Date Started:</span>
                  <span>{selectedAd.date}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Date Ended:</span>
                  <span>
                    {(() => {
                      const startDate = new Date(selectedAd.date);
                      startDate.setMonth(startDate.getMonth() + (selectedAd.plan === 'Monthly' ? 1 : 0.25));
                      return startDate.toLocaleDateString();
                    })()}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Material:</span>
                  <span>{selectedAd.material}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Vehicle Type:</span>
                  <span>{selectedAd.vehicleType}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Plan:</span>
                  <span>{selectedAd.plan}</span>
                </div>
                <div className="flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${selectedAd.status === 'Pending' ? 'bg-red-500' : selectedAd.status === 'Dispatch' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                  <span>{selectedAd.status}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              {!selectedAd.mediaDisplayed && (
                <button
                  onClick={handleShowMedia}
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  Show {selectedAd.format}
                </button>
              )}
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm Action</h2>
            <p className="text-gray-700 mb-4">{confirmMessage}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseConfirmModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

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