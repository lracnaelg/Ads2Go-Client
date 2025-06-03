import React, { useState, ChangeEvent } from "react";
import {
  FiSettings,
  FiHome,
  FiCreditCard,
  FiUser,
  FiHelpCircle,
  FiGrid,
} from "react-icons/fi";
import { Link } from "react-router-dom";

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  companyName: string;
  companyAddress: string;
  contactNumber: string;
  email: string;
  profilePicture: string;
}

const Settings: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    companyName: "",
    companyAddress: "",
    contactNumber: "",
    email: "",
    profilePicture: "",
  });

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
      // Save logic here (e.g., send to backend)
      console.log("Saving profile data:", formData);
    }
    setIsEditing((prev) => !prev);
  };

  const handleChangePassword = () => {
    alert("Change password functionality triggered");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D1730] text-white flex flex-col p-6">
        <div className="text-white font-bold text-lg mb-10 flex items-center space-x-2">
          <FiGrid className="text-gray-300" size={24} />
          <span>Ads2Go</span>
        </div>

        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">
          Menu
        </div>
        <nav className="mb-6 space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
          >
            <FiGrid size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/home"
            className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
          >
            <FiHome size={20} />
            <span>Home</span>
          </Link>
        </nav>

        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">
          Others
        </div>
        <nav className="space-y-2">
          <Link
            to="/settings"
            className="flex items-center space-x-2 text-gray-300 cursor-pointer hover:text-white"
          >
            <FiSettings size={20} />
            <span>Settings</span>
          </Link>
          <Link
            to="/payment"
            className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
          >
            <FiCreditCard size={20} />
            <span>Payment</span>
          </Link>
          <Link
            to="/accounts"
            className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
          >
            <FiUser size={20} />
            <span>Accounts</span>
          </Link>
          <Link
            to="/help"
            className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
          >
            <FiHelpCircle size={20} />
            <span>Help</span>
          </Link>
        </nav>
      </aside>

      {/* Main Settings Panel */}
      <main className="flex-1 bg-white text-gray-800 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header and Profile Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <img
                src={formData.profilePicture || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {formData.firstName || "User Name"}
                </h2>
                <p className="text-gray-500">{formData.email || "user@email.com"}</p>
              </div>
            </div>
            <button
              onClick={toggleEdit}
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["firstName", "First Name"],
              ["middleName", "Middle Name"],
              ["lastName", "Last Name"],
              ["companyName", "Company Name"],
              ["companyAddress", "Company Address"],
              ["contactNumber", "Contact Number"],
              ["email", "Email Address"],
            ].map(([key, label]) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                <input
                  name={key}
                  value={formData[key as keyof FormData]}
                  onChange={handleInputChange}
                  placeholder={`Your ${label}`}
                  disabled={!isEditing}
                  className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
                />
              </div>
            ))}

            
            {isEditing && (
              <div>
                <label className="block text-sm font-medium mb-1">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm"
                />
              </div>
            )}
          </div>

          
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleChangePassword}
              className="bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-700 transition"
            >
              Change Password
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
