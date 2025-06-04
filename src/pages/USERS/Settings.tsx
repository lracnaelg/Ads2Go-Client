import React, { useState, ChangeEvent } from "react";

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
    <div className="min-h-screen bg-white text-gray-800 p-8 flex justify-center">
      <main className="w-full max-w-5xl">
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
      </main>
    </div>
  );
};

export default Settings;
