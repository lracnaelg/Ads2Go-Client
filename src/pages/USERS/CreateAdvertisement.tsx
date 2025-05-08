// pages/USERS/CreateAdvertisement.tsx
import React, { useState } from 'react';

const CreateAdvertisement: React.FC = () => {
  const [formData, setFormData] = useState({
    userId: '',
    paymentId: '',
    riderId: '',
    materialsId: '',
    title: '',
    description: '',
    vehicleType: '',
    materialsUsed: '',
    adFormat: '',
    startTime: '',
    endTime: '',
    status: 'RUNNING',
    media: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    if (name === 'media' && e.target instanceof HTMLInputElement && e.target.files) {
      setFormData({ ...formData, media: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Advertisement created (mocked)!');
    console.log('Form Data:', formData);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6">Create Advertisement</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="userId" placeholder="User ID" value={formData.userId} onChange={handleChange} className="w-full border p-2" />
        <input type="text" name="paymentId" placeholder="Payment ID" value={formData.paymentId} onChange={handleChange} className="w-full border p-2" />
        <input type="text" name="riderId" placeholder="Rider ID" value={formData.riderId} onChange={handleChange} className="w-full border p-2" />
        <input type="text" name="materialsId" placeholder="Materials ID" value={formData.materialsId} onChange={handleChange} className="w-full border p-2" />
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full border p-2" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2" />
        <input type="text" name="vehicleType" placeholder="Vehicle Type" value={formData.vehicleType} onChange={handleChange} className="w-full border p-2" />
        <input type="text" name="materialsUsed" placeholder="Materials Used" value={formData.materialsUsed} onChange={handleChange} className="w-full border p-2" />
        
        <select name="adFormat" value={formData.adFormat} onChange={handleChange} className="w-full border p-2">
          <option value="">Select Format</option>
          <option value="JPG">JPG</option>
          <option value="PNG">PNG</option>
          <option value="SVG">SVG</option>
          <option value="MP4">MP4</option>
        </select>

        <input type="file" name="media" accept="image/*,video/*" onChange={handleChange} className="w-full border p-2" />

        <label className="block">Start Time</label>
        <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} className="w-full border p-2" />
        <label className="block">End Time</label>
        <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} className="w-full border p-2" />

        <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2">
          <option value="RUNNING">RUNNING</option>
          <option value="ENDED">ENDED</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>
  );
};

export default CreateAdvertisement;
