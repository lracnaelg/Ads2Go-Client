import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

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

  return (
    <div className="min-h-screen bg-white py-10 pr-4 pl-14">
      <div className="w-full bg-white rounded-lg overflow-hidden flex">
        <aside className="w-1/4 bg-[#F6C794] border-r p-6">
          <h2 className="text-2xl font-bold mb-6">Settings</h2>
          <ul className="space-y-4">
            <li className="text-[#578FCA] font-bold">Account</li>
            <li className="text-black hover:scale-105 transition-all duration-200">Notifications</li>
            <li className="text-black hover:scale-105 transition-all duration-300">Privacy</li>
            <li className="text-black hover:scale-105 transition-all duration-300">Languages</li>
            <li className="text-black hover:scale-105 transition-all duration-300">Help</li>
          </ul>
        </aside>

        <main className="w-3/4 p-8">
          <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center gap-6">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#C9E6F0] flex items-center justify-center text-2xl font-bold">
                  {user?.name ? user.name[0] : '?'}
                </div>
              )}

              {isEditing && (
                <div className="flex flex-col gap-2">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium">
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setFormData((prev) => ({ ...prev, profilePicture: '' }));
                      }}
                      className="text-red-600 text-sm"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded transition-all duration-300 hover:scale-105 ${formErrors.name && 'border-red-500'}`}
                  readOnly={!isEditing}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded transition-all duration-300 hover:scale-105"
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded transition-all duration-300 hover:scale-105"
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Number</label>
                <input
                  name="contactNumber"
                  type="text"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded transition-all duration-300 hover:scale-105 ${formErrors.contactNumber && 'border-red-500'}`}
                  readOnly={!isEditing}
                />
                {formErrors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.contactNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded transition-all duration-300 hover:scale-105"
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Address</label>
                <input
                  name="companyAddress"
                  type="text"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded transition-all duration-300 hover:scale-105"
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded transition-all duration-300 hover:scale-105"
                  placeholder="Enter new password"
                  readOnly={!isEditing}
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-blue-600 text-sm mt-1"
                  >
                    {showPassword ? 'Hide' : 'Show'} Password
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-[#FF9D3D] text-black px-6 py-2 rounded-md hover:bg-[#F6C794] hover:text-black/100 hover:scale-105 transition-all duration-200"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300 hover:scale-105 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#FF9D3D] text-black px-6 py-2 rounded-md hover:bg-[#F6C794] hover:text-black/100 hover:scale-105 transition-all duration-200"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>

            {showModal && (
              <div className="fixed bottom-4 right-4 p-4 bg-[#F6C794] border rounded-xl shadow-md z-50">
                <p className="text-black">{message}</p>
              </div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
};

export default Settings;
