import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pencil
} from 'lucide-react';

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  companyName: string;
  companyAddress: string;
  contactNumber: string;
  profilePicture: string;
  email: string;
  cityState: string;
}

const Account: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Store the initial form data to revert on cancel
  const initialFormData = {
    firstName: "",
    middleName: "",
    lastName: "",
    companyName: "",
    companyAddress: "",
    contactNumber: "",
    email: "",
    profilePicture: "",
    cityState: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      console.log("Saving profile data:", formData);
    }
    setIsEditing((prev) => !prev);
  };

  const handleCancel = () => {
    setFormData(initialFormData); // Revert to initial state
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="min-h-screen bg-white text-gray-700 p-8 flex pl-60 justify-center">
      <main className="w-full max-w-4xl">
        {/* Header and Profile Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={formData.profilePicture || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{formData.firstName || "User Name"}</h2>
              <p className="text-gray-500 text-sm">{formData.email || "user@email.com"}</p>
              <p className="text-gray-500 text-sm">{formData.cityState || "City"}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {!isEditing ? (
              <button
  onClick={toggleEdit}
  className="flex items-center justify-center gap-2 bg-[#F3A26D] w-20 text-white px-3 py-1 rounded hover:bg-[#E08B52] text-sm"
>
  <Pencil size={16} />
  Edit
</button>
                  

            ) : (
              <div className="space-x-2">
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={toggleEdit}
                  className="bg-[#F3A26D] text-white px-3 py-1 rounded hover:bg-[#E08B52] text-sm"
                >
                  Save
                </button>
              </div>
            )}
            {isEditing && (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="border p-4 rounded-md mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Your First Name"
                disabled={!isEditing}
                className={`w-full border rounded px-3 py-2 text-sm bg-gray-50 ${isEditing ? 'border-[#F3A26D] focus:outline-none focus:ring-[#F3A26D]' : ''}`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Your Last Name"
                disabled={!isEditing}
                className={`w-full border rounded px-3 py-2 text-sm bg-gray-50 ${isEditing ? 'border-[#F3A26D] focus:outline-none focus:ring-[#F3A26D]' : ''}`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Phone</label>
              <input
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="Your Contact Number"
                disabled={!isEditing}
                className={`w-full border rounded px-3 py-2 text-sm bg-gray-50 ${isEditing ? 'border-[#F3A26D] focus:outline-none focus:ring-[#F3A26D]' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Company Information Section */}
        <div className="border p-4 rounded-md mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Company Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Company Name</label>
              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Your Company Name"
                disabled={!isEditing}
                className={`w-full border rounded px-3 py-2 text-sm bg-gray-50 ${isEditing ? 'border-[#F3A26D] focus:outline-none focus:ring-[#F3A26D]' : ''}`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Company Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Company Email"
                disabled={!isEditing}
                className={`w-full border rounded px-3 py-2 text-sm bg-gray-50 ${isEditing ? 'border-[#F3A26D] focus:outline-none focus:ring-[#F3A26D]' : ''}`}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium mb-1">Company Address</label>
              <input
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleInputChange}
                placeholder="Your Company Address"
                disabled={!isEditing}
                className={`w-full border rounded px-3 py-2 text-sm bg-gray-50 ${isEditing ? 'border-[#F3A26D] focus:outline-none focus:ring-[#F3A26D]' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="border p-4 rounded-md mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Address</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">City/State</label>
              <input
                name="cityState"
                value={formData.cityState}
                onChange={handleInputChange}
                placeholder="Your City / State"
                disabled={!isEditing}
                className={`w-full border rounded px-3 py-2 text-sm bg-gray-50 ${isEditing ? 'border-[#F3A26D] focus:outline-none focus:ring-[#F3A26D]' : ''}`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Postal Code</label>
              <input
                name="companyAddress"
                value="ERT 2354"
                disabled={!isEditing}
                className={`w-full border rounded px-3 py-2 text-sm bg-gray-50 $}`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">TAX ID</label>
              <input
                name="companyAddress"
                value="AS4546756"
                disabled={!isEditing}
                className={`w-full border rounded px-3 py-2 text-sm bg-gray-50`}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;