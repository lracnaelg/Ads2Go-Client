import React, { useState } from 'react';

interface Rider {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  password: string;
  contactNumber: string;
  email: string;
  selfie: string;
  licenseNumber: string;
  licensePicture: string;
  orcrPicture: string;
  plateNumber: string;
  vehicleType: string;
  vehicleModel: string;
  materialsSupported: string;
  materialsID: string;
  status: string;
}

const allVehicleTypes = ['Car', 'Ebike', 'Motorcycle', 'Bus', 'Jeepney', 'Tricycle', 'Truck', 'Van'];
const allMaterials = ['LCD', 'BANNER', 'HEADDRESS', 'Sticker'];
const allStatuses = ['Active', 'Pending', 'Suspended', 'Inactive'];

const riders: Rider[] = [
  {
    id: 'R3',
    firstName: 'Carlos',
    middleName: 'B.',
    lastName: 'Gonzales',
    password: '••••••••',
    contactNumber: '09081234567',
    email: 'carlos.g@example.com',
    selfie: 'selfie.jpg',
    licenseNumber: 'DLN-1122334455',
    licensePicture: 'license3.jpg',
    orcrPicture: 'orcr3.jpg',
    plateNumber: 'LMN-4567',
    vehicleType: 'Electric Tricycle',
    vehicleModel: 'E-Trike X',
    materialsSupported: 'LCD Screen',
    materialsID: 'M-003',
    status: 'Active',
  },
  {
    id: 'R4',
    firstName: 'Maria',
    middleName: 'D.',
    lastName: 'Lopez',
    password: '••••••••',
    contactNumber: '09171234567',
    email: 'maria.lopez@example.com',
    selfie: 'selfie2.jpg',
    licenseNumber: 'DLN-5566778899',
    licensePicture: 'license4.jpg',
    orcrPicture: 'orcr4.jpg',
    plateNumber: 'XYZ-1234',
    vehicleType: 'Motorcycle',
    vehicleModel: 'Yamaha Mio',
    materialsSupported: 'Sticker',
    materialsID: 'M-008',
    status: 'Inactive',
  },
  {
    id: 'R5',
    firstName: 'Juan',
    middleName: 'C.',
    lastName: 'Reyes',
    password: '••••••••',
    contactNumber: '09281234567',
    email: 'juan.reyes@example.com',
    selfie: 'selfie3.jpg',
    licenseNumber: 'DLN-9988776655',
    licensePicture: 'license5.jpg',
    orcrPicture: 'orcr5.jpg',
    plateNumber: 'ABC-5678',
    vehicleType: 'Tricycle',
    vehicleModel: 'Suzuki Trike',
    materialsSupported: 'Banner',
    materialsID: 'M-010',
    status: 'Active',
  },
];
const ViewRiders: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [vehicleType, setVehicleType] = useState<string>('All');
  const [materialUsed, setMaterialUsed] = useState<string>('All');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['Active', 'Pending']);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const filteredRiders = riders.filter(r =>
    (vehicleType === 'All' || r.vehicleType === vehicleType) &&
    (materialUsed === 'All' || r.materialsSupported.toUpperCase().includes(materialUsed.toUpperCase())) &&
    selectedStatuses.includes(r.status)
  );

  return (
    <div className="pt-2 pb-10 pl-64">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="text-xl font-bold mb-4">Riders List</h2>

        {/* Filters */}
        <div className="mb-6 space-y-3">
          {/* Vehicle Type */}
          <div>
            <span className="font-semibold mr-4">Vehicle Type</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {['All', ...allVehicleTypes].map(type => (
                <button
                  key={type}
                  onClick={() => setVehicleType(type)}
                  className={`px-3 py-1 rounded-full border ${
                    vehicleType === type ? 'bg-teal-500 text-white' : 'text-black border-teal-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Material Used */}
          <div>
            <span className="font-semibold mr-4">Material Used</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {['All', ...allMaterials].map(mat => (
                <button
                  key={mat}
                  onClick={() => setMaterialUsed(mat)}
                  className={`px-3 py-1 rounded-full border ${
                    materialUsed === mat ? 'bg-teal-500 text-white' : 'text-black border-teal-500'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex gap-4 items-center mt-2">
            <span className="font-semibold">Status</span>
            {allStatuses.map(status => (
              <label key={status} className="inline-flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status)}
                  onChange={() => toggleStatus(status)}
                  className="accent-blue-500"
                />
                <span>{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto border rounded-md mb-4">
          <table className="min-w-full text-sm">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Contact</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Vehicle</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders.map((rider, index) => (
                <React.Fragment key={rider.id}>
                  <tr
                    className={`${
                      index % 2 === 0 ? 'bg-teal-50' : 'bg-white'
                    } cursor-pointer hover:bg-teal-100`}
                    onClick={() => toggleExpand(rider.id)}
                  >
                    <td className="px-3 py-2">{rider.id}</td>
                    <td className="px-3 py-2">{`${rider.firstName} ${rider.middleName} ${rider.lastName}`}</td>
                    <td className="px-3 py-2">{rider.status}</td>
                    <td className="px-3 py-2">{rider.contactNumber}</td>
                    <td className="px-3 py-2">{rider.email}</td>
                    <td className="px-3 py-2">{`${rider.vehicleType} - ${rider.vehicleModel}`}</td>
                  </tr>
                  {expandedId === rider.id && (
                    <tr className="bg-gray-100">
                      <td colSpan={6} className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div><strong>Plate Number:</strong> {rider.plateNumber}</div>
                          <div><strong>Password:</strong> {rider.password}</div>
                          <div><strong>Materials:</strong> {rider.materialsSupported} ({rider.materialsID})</div>
                          <div><strong>License Number:</strong> {rider.licenseNumber}</div>
                          <div>
                            <strong>Selfie:</strong><br />
                            <img src={rider.selfie} alt="Selfie" className="h-20 w-20 rounded-full object-cover border" />
                          </div>
                          <div>
                            <strong>License Picture:</strong><br />
                            <img src={rider.licensePicture} alt="License" className="h-20 rounded border" />
                          </div>
                          <div>
                            <strong>OR/CR Picture:</strong><br />
                            <img src={rider.orcrPicture} alt="OR/CR" className="h-20 rounded border" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filteredRiders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-4">No riders match the selected filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="text-sm text-gray-600">Found: {filteredRiders.length} rider(s)</div>
      </div>
    </div>
  );
};

export default ViewRiders;
