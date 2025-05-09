import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Settings: React.FC = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    companyName: '',
    companyAddress: '',
    contactNumber: '',
    password: '',
    profilePicture: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    contactNumber: '',
  });

  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'active' | 'pending' | 'rejected'>('active');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || '',
        companyName: user.companyName || '',
        companyAddress: user.companyAddress || '',
        contactNumber: user.contactNumber || '',
        password: '',
        profilePicture: user.profilePicture || '',
      });
      setImagePreview(user.profilePicture || '');
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.trimStart();

    setFormData((prev) => ({ ...prev, [name]: trimmedValue }));

    // Validation logic
    if (name === 'name') {
      const nameRegex = /^[A-Za-z\s]+$/;
      setFormErrors((prev) => ({
        ...prev,
        name: nameRegex.test(trimmedValue) ? '' : 'Full Name must only contain letters and spaces.',
      }));
    }

    if (name === 'contactNumber') {
      const contactRegex = /^09\d{9}$/;
      setFormErrors((prev) => ({
        ...prev,
        contactNumber: contactRegex.test(trimmedValue) ? '' : 'Contact must start with 09 and be 11 digits.',
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.userId) return;

    if (formErrors.name || formErrors.contactNumber) {
      setMessage('❌ Please fix form errors before submitting.');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
      return;
    }

    setTimeout(() => {
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
        address: formData.address,
        companyName: formData.companyName,
        companyAddress: formData.companyAddress,
        contactNumber: formData.contactNumber,
        profilePicture: formData.profilePicture,
      });
      setMessage('✅ Profile updated successfully!');
      setShowModal(true);
      setIsEditing(false);

      setTimeout(() => setShowModal(false), 3000);
    }, 1000);
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || '',
        companyName: user.companyName || '',
        companyAddress: user.companyAddress || '',
        contactNumber: user.contactNumber || '',
        password: '',
        profilePicture: user.profilePicture || '',
      });
      setImagePreview(user.profilePicture || '');
    }
    setFormErrors({ name: '', contactNumber: '' });
    setIsEditing(false);
  };

  // Static ad data for visualization
  const activeAds = [
    {
      title: 'Summer Sale Campaign',
      vehicleType: 'Bus',
      description: 'Promoting summer sale on various products.',
      materialsUsed: 'Vinyl Sticker',
      plan: 'Monthly',
      adFormat: 'Full Wrap',
      media: 'https://example.com/summer_sale.jpg',
      estimatedPrice: 15000,
    },
    {
      title: 'Tech Gadgets Promo',
      vehicleType: 'Car',
      description: 'Promoting the latest tech gadgets.',
      materialsUsed: 'LCD Monitor',
      plan: 'Weekly',
      adFormat: 'Side Panels',
      media: 'https://example.com/tech_promo.mp4',
      estimatedPrice: 8000,
    },
  ];

  const pendingAds = [
    {
      title: 'New Restaurant Opening',
      vehicleType: 'Jeep',
      description: 'Promoting the opening of a new restaurant.',
      materialsUsed: 'Digital Print',
      plan: 'Weekly',
      adFormat: 'Rear Window',
      media: 'https://example.com/restaurant_opening.jpg',
      estimatedPrice: 5000,
    },
  ];

  const rejectedAds = [
    {
      title: 'Fitness Gym Ad',
      vehicleType: 'Motorcycle',
      description: 'Promoting a new fitness gym.',
      materialsUsed: 'Vinyl Sticker',
      plan: 'Monthly',
      adFormat: 'Full Wrap',
      media: 'https://example.com/fitness_gym.jpg',
      estimatedPrice: 12000,
      rejectionReason: 'Inappropriate content',
    },
  ];

  const renderMediaPreview = (media: string) => {
    if (!media) return <p className="text-gray-500">No media uploaded</p>;

    const fileExtension = media.split('.').pop()?.toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'svg'].includes(fileExtension || '');
    const isVideo = fileExtension === 'mp4';

    if (isImage) {
      return (
        <img
          src={media}
          alt="Ad media"
          className="w-full h-auto max-h-64 object-contain rounded-lg"
        />
      );
    } else if (isVideo) {
      return (
        <video
          src={media}
          controls
          className="w-full h-auto max-h-64 rounded-lg"
        />
      );
    }
    return <p className="text-gray-500">Unsupported media format</p>;
  };

  return (
    <div className="min-h-screen bg-white py-10 pr-4 pl-14">
      <div className="w-full bg-white rounded-lg overflow-hidden flex">
        <aside className="w-1/4 bg-white border-r p-6">
          <h2 className="text-2xl font-bold mb-6">Settings</h2>
          <ul className="space-y-4">
            <li>
              <Link
                to="/settings"
                className="text-black hover:scale-105 transition-all duration-200"
              >
                Account
              </Link>
            </li>
            <li className="text-[#578FCA] font-bold">History</li>
            <li className="text-black hover:scale-105 transition-all duration-200">Notifications</li>
            <li className="text-black hover:scale-105 transition-all duration-300">Privacy</li>
            <li className="text-black hover:scale-105 transition-all duration-300">Help</li>
          </ul>
        </aside>

        <main className="w-3/4 p-8">
          <h2 className="text-2xl font-bold mb-6">History</h2>
          {/* Navigation Bar */}
          <div className="bg-white border rounded-lg shadow-sm p-4 mb-6">
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  selectedTab === 'active'
                    ? 'text-[#FF9D3D] font-bold border-b-2 border-[#FF9D3D]'
                    : 'text-gray-700 hover:text-[#FF9D3D] hover:scale-105'
                }`}
                onClick={() => setSelectedTab('active')}
              >
                Active
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  selectedTab === 'pending'
                    ? 'text-[#FF9D3D] font-bold border-b-2 border-[#FF9D3D]'
                    : 'text-gray-700 hover:text-[#FF9D3D] hover:scale-105'
                }`}
                onClick={() => setSelectedTab('pending')}
              >
                Pending
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  selectedTab === 'rejected'
                    ? 'text-[#FF9D3D] font-bold border-b-2 border-[#FF9D3D]'
                    : 'text-gray-700 hover:text-[#FF9D3D] hover:scale-105'
                }`}
                onClick={() => setSelectedTab('rejected')}
              >
                Rejected
              </button>
            </div>
          </div>

          {/* Ad Sections */}
          <div className="space-y-8">
            {selectedTab === 'active' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Active Ads</h3>
                {activeAds.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {activeAds.map((ad, index) => (
                      <div key={index} className="bg-white border rounded-lg shadow-sm p-5">
                        <h4 className="font-semibold text-lg mb-3">{ad.title}</h4>
                        <div className="space-y-1 text-md text-gray-700">
                          <p><strong>Description:</strong> {ad.description}</p>
                          <p><strong>Vehicle Type:</strong> {ad.vehicleType}</p>
                          <p><strong>Materials:</strong> {ad.materialsUsed}</p>
                          <p><strong>Plan:</strong> {ad.plan}</p>
                          <p><strong>Format:</strong> {ad.adFormat}</p>
                          <p><strong>Total:</strong> ₱{ad.estimatedPrice.toLocaleString()}</p>
                        </div>
                        <div className="mt-4">
                          <h5 className="font-semibold text-md mb-2">Media</h5>
                          {renderMediaPreview(ad.media)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No active ads found.</p>
                )}
              </div>
            )}

            {selectedTab === 'pending' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Pending Ads</h3>
                {pendingAds.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {pendingAds.map((ad, index) => (
                      <div key={index} className="bg-white border rounded-lg shadow-sm p-5">
                        <h4 className="font-semibold text-lg mb-3">{ad.title}</h4>
                        <div className="space-y-1 text-md text-gray-700">
                          <p><strong>Description:</strong> {ad.description}</p>
                          <p><strong>Vehicle Type:</strong> {ad.vehicleType}</p>
                          <p><strong>Materials:</strong> {ad.materialsUsed}</p>
                          <p><strong>Plan:</strong> {ad.plan}</p>
                          <p><strong>Format:</strong> {ad.adFormat}</p>
                          <p><strong>Total:</strong> ₱{ad.estimatedPrice.toLocaleString()}</p>
                        </div>
                        <div className="mt-4">
                          <h5 className="font-semibold text-md mb-2">Media</h5>
                          {renderMediaPreview(ad.media)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No pending ads found.</p>
                )}
              </div>
            )}

            {selectedTab === 'rejected' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Rejected Ads</h3>
                {rejectedAds.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {rejectedAds.map((ad, index) => (
                      <div key={index} className="bg-white border rounded-lg shadow-sm p-5">
                        <h4 className="font-semibold text-lg mb-3">{ad.title}</h4>
                        <div className="space-y-1 text-md text-gray-700">
                          <p><strong>Description:</strong> {ad.description}</p>
                          <p><strong>Vehicle Type:</strong> {ad.vehicleType}</p>
                          <p><strong>Materials:</strong> {ad.materialsUsed}</p>
                          <p><strong>Plan:</strong> {ad.plan}</p>
                          <p><strong>Format:</strong> {ad.adFormat}</p>
                          <p><strong>Total:</strong> ₱{ad.estimatedPrice.toLocaleString()}</p>
                          <p><strong>Rejection Reason:</strong> {ad.rejectionReason}</p>
                        </div>
                        <div className="mt-4">
                          <h5 className="font-semibold text-md mb-2">Media</h5>
                          {renderMediaPreview(ad.media)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No rejected ads found.</p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal for Success/Error Messages */}
      {showModal && (
        <div className="fixed bottom-4 right-4 p-4 bg-[#9EBC8A] text-black/80 rounded-lg shadow-lg z-50">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Settings;