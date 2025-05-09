import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAdvertisement: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    vehicleType: '',
    materialsUsed: '',
    adFormat: '',
    plan: '',
    media: null as File | null,
    status: 'PENDING',
  });

  const [materialsOptions, setMaterialsOptions] = useState<string[]>([]);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const vehicleOptions = ['Car', 'Motorcycle', 'Jeep', 'Bus'];
  const planOptions = ['Weekly', 'Monthly'];

  const materialOptionsMap: Record<string, string[]> = {
    Car: ['LCD Screen', 'Stickers', 'Posters'],
    Motorcycle: ['Posters'],
    Jeep: ['Stickers', 'Posters'],
    Bus: ['LCD Screen', 'Stickers', 'Posters'],
  };

  const priceMap: Record<string, Record<string, Record<string, number>>> = {
    Car: {
      'LCD Screen': { Weekly: 10000, Monthly: 30000 },
      Stickers: { Weekly: 5000, Monthly: 15000 },
      Posters: { Weekly: 4000, Monthly: 12000 },
    },
    Motorcycle: {
      Posters: { Weekly: 2000, Monthly: 6000 },
    },
    Jeep: {
      Stickers: { Weekly: 5000, Monthly: 15000 },
      Posters: { Weekly: 2500, Monthly: 7500 },
    },
    Bus: {
      Stickers: { Weekly: 5000, Monthly: 15000 },
      Posters: { Weekly: 2500, Monthly: 7500 },
      'LCD Screen': { Weekly: 10000, Monthly: 100000 },
    },
  };

  const formatExtensionMap: Record<string, string[]> = {
    JPG: ['.jpg', '.jpeg'],
    PNG: ['.png'],
    SVG: ['.svg'],
    MP4: ['.mp4'],
  };

  useEffect(() => {
    if (formData.vehicleType) {
      setMaterialsOptions(materialOptionsMap[formData.vehicleType] || []);
      setFormData((prev) => ({ ...prev, materialsUsed: '' }));
    } else {
      setMaterialsOptions([]);
    }
  }, [formData.vehicleType]);

  useEffect(() => {
    const { vehicleType, materialsUsed, plan } = formData;
    const price = priceMap[vehicleType]?.[materialsUsed]?.[plan] ?? null;
    setEstimatedPrice(price);
  }, [formData.vehicleType, formData.materialsUsed, formData.plan]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const validateFileFormat = (file: File, selectedFormat: string): boolean => {
    if (!selectedFormat) return true;
    const validExtensions = formatExtensionMap[selectedFormat] || [];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    return validExtensions.includes(fileExtension);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'media' && files) {
      const file = files[0];
      if (formData.adFormat && !validateFileFormat(file, formData.adFormat)) {
        setError(
          `Selected format is ${formData.adFormat}, but uploaded file is ${file.name
            .split('.')
            .pop()
            ?.toUpperCase()}`
        );
      } else {
        setError('');
      }
      setFormData((prev) => ({ ...prev, media: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Re-validate media if adFormat changes
      if (name === 'adFormat' && formData.media && !validateFileFormat(formData.media, value)) {
        setError(
          `Selected format is ${value}, but uploaded file is ${formData.media.name
            .split('.')
            .pop()
            ?.toUpperCase()}`
        );
      } else {
        setError('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.media && formData.adFormat && !validateFileFormat(formData.media, formData.adFormat)) {
      setError(
        `Selected format is ${formData.adFormat}. Please upload the correct file format.`
      );
      return;
    }
    navigate('/payment', { state: { formData, estimatedPrice } });
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-[#F6C794] bg-cover px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full md:w-1/2 mt-10 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Create Advertisement</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-[5px] p-2 hover:scale-105 transition-all duration-400"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-[5px] p-2 hover:scale-105 transition-all duration-400"
            required
          />

          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="w-full border rounded-[5px] p-2 hover:scale-105 transition-all duration-400"
            required
          >
            <option value="">Select Vehicle Type</option>
            {vehicleOptions.map((vehicle) => (
              <option key={vehicle} value={vehicle}>{vehicle}</option>
            ))}
          </select>

          <select
            name="materialsUsed"
            value={formData.materialsUsed}
            onChange={handleChange}
            className="w-full border rounded-[5px] p-2 hover:scale-105 transition-all duration-400"
            required
            disabled={!formData.vehicleType}
          >
            <option value="">Select Material</option>
            {materialsOptions.map((material) => (
              <option key={material} value={material}>{material}</option>
            ))}
          </select>

          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className="w-full border rounded-[5px] p-2 hover:scale-105 transition-all duration-400"
            required
          >
            <option value="">Select Plan</option>
            {planOptions.map((plan) => (
              <option key={plan} value={plan}>{plan}</option>
            ))}
          </select>

          {formData.vehicleType && formData.materialsUsed && formData.plan && (
            <div className="text-green-700 font-semibold">
              {estimatedPrice !== null
                ? `Total Price: ₱${estimatedPrice.toLocaleString()}`
                : <span className="text-red-600">Price unavailable for selected options</span>}
            </div>
          )}

          <select
            name="adFormat"
            value={formData.adFormat}
            onChange={handleChange}
            className="w-full border rounded-[5px] p-2 hover:scale-105 transition-all duration-400"
            required
          >
            <option value="">Select Format</option>
            <option value="JPG">JPG</option>
            <option value="PNG">PNG</option>
            <option value="SVG">SVG</option>
            <option value="MP4">MP4</option>
          </select>

          <input
            type="file"
            name="media"
            accept="image/*,video/*"
            onChange={handleChange}
            className="w-full border rounded-[5px] p-2 hover:scale-105 transition-all duration-400"
            required
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#578FCA] text-white px-14 rounded-[8px] py-2 hover:bg-[#AFDDFF] hover:text-black hover:scale-105 transition duration-300"
            >
              Create
            </button>
          </div>
        </form>

        {/* Error Pop-up in Bottom-Right Corner */}
        {error && (
          <div className="fixed bottom-4 right-4 p-4 bg-[#D2665A] text-white/80 rounded-lg shadow-lg z-50">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAdvertisement;