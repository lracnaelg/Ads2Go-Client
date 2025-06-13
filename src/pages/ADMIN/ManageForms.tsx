import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PENDING_FORMS } from '../../graphql/queries/getPendingForms';
import { APPROVE_AD_FORM, REJECT_AD_FORM, APPROVE_RIDER_APPLICATION, REJECT_RIDER_APPLICATION } from '../../graphql/mutations/manageForms';

const ManageForms: React.FC = () => {
  const { user, navigate } = useAuth();
  const [selectedFormType, setSelectedFormType] = useState<'ads' | 'rider'>('ads');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Mock data setup
  const [mockData, setMockData] = useState<any>(null);

  useEffect(() => {
    const mockPendingForms = [
      // User Ads Forms with additional details
      {
        id: "1",
        type: "ads",
        title: "Summer Sale Ad",
        description: "Promoting summer discounts on scooters",
        vehicleType: "Scooter",
        material: "Vinyl",
        plan: "Premium",
        format: "Video",
        mediaUrl: "https://example.com/media/summer-sale.mp4",
        companyName: "Summer Co.",
        companyEmail: "sales@summerco.com",
        dateStarted: "2025-06-01",
        dateEnded: "2025-06-30",
        status: "pending",
      },
      {
        id: "2",
        type: "ads",
        title: "New Bike Launch",
        description: "Introducing our latest bike model",
        vehicleType: "Motorcycle",
        material: "Metal",
        plan: "Basic",
        format: "Image",
        mediaUrl: "https://example.com/media/bike-launch.jpg",
        companyName: "Bike Innovations",
        companyEmail: "info@bikeinnovations.com",
        dateStarted: "2025-07-01",
        dateEnded: "2025-07-15",
        status: "pending",
      },
      // Rider Applications
      {
        id: "3",
        type: "rider",
        name: "Juan Dela Cruz",
        email: "juan@example.com",
        contact: "09123456789",
        licenseNumber: "L1234567",
        plateNumber: "ABC123",
        vehicle: "Scooter",
        materialsSupported: "Vinyl, Metal",
        materialsId: "MAT001",
        areaBase: "Quezon City",
        licensePicUrl: "https://example.com/images/license-juan.jpg",
        orcrPicUrl: "https://example.com/images/orcr-juan.jpg",
        status: "pending",
        selfie: "https://example.com/images/selfie-juan.jpg",
        startOfRiding: "2025-06-15",
        applyingForAds: "Summer Sale Ad",
      },
      {
        id: "4",
        type: "rider",
        name: "Maria Santos",
        email: "maria@example.com",
        contact: "09198765432",
        licenseNumber: "L7654321",
        plateNumber: "XYZ789",
        vehicle: "Motorcycle",
        materialsSupported: "Vinyl",
        materialsId: "MAT002",
        areaBase: "Manila",
        licensePicUrl: "https://example.com/images/license-maria.jpg",
        orcrPicUrl: "https://example.com/images/orcr-maria.jpg",
        status: "pending",
        selfie: "https://example.com/images/selfie-maria.jpg",
        startOfRiding: "2025-06-20",
        applyingForAds: "New Bike Launch",
      },
    ];
    setMockData({ getPendingForms: mockPendingForms });
  }, []);

  const { data, loading, error } = useQuery(GET_PENDING_FORMS, {
    variables: { userId: user?.userId },
    skip: !user || mockData !== null,
  });

  const [approveAdForm] = useMutation(APPROVE_AD_FORM);
  const [rejectAdForm] = useMutation(REJECT_AD_FORM);
  const [approveRiderApplication] = useMutation(APPROVE_RIDER_APPLICATION);
  const [rejectRiderApplication] = useMutation(REJECT_RIDER_APPLICATION);

  const handleApprove = async (formId: string, type: 'ads' | 'rider') => {
    try {
      if (type === 'ads') {
        await approveAdForm({ variables: { formId } });
      } else {
        await approveRiderApplication({ variables: { formId } });
      }
      alert('Form approved successfully');
      setExpandedId(null); // Collapse row after approval
    } catch (err) {
      console.error(`Error approving ${type} form:`, err);
      alert('Failed to approve form');
    }
  };

  const handleReject = async (formId: string, type: 'ads' | 'rider') => {
    try {
      if (type === 'ads') {
        await rejectAdForm({ variables: { formId } });
      } else {
        await rejectRiderApplication({ variables: { formId } });
      }
      alert('Form rejected successfully');
      setExpandedId(null); // Collapse row after rejection
    } catch (err) {
      console.error(`Error rejecting ${type} form:`, err);
      alert('Failed to reject form');
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error.message}</div>;
  if (!user) {
    navigate('/login');
    return null;
  }

  const forms = (mockData || data)?.getPendingForms || [];

  return (
    <div className="pt-2 pb-10 pl-64">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="text-xl font-bold mb-4">Manage Forms</h2>

        <div className="mb-6 space-y-3">
          <div>
            <span className="font-semibold mr-4">Filter by Form Type</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {['ads', 'rider'].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedFormType(type as 'ads' | 'rider')}
                  className={`px-3 py-1 rounded-full border ${
                    selectedFormType === type ? 'bg-teal-500 text-white' : 'text-black border-teal-500'
                  }`}
                >
                  {type === 'ads' ? 'Advertisement Forms' : 'Rider Applications'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-auto border rounded-md mb-4">
          <table className="min-w-full text-sm">
            <thead className="bg-teal-600 text-white">
              <tr>
                {selectedFormType === 'ads' && (
                  <>
                    <th className="px-3 py-2 text-left">Title</th>
                    <th className="px-3 py-2 text-left">Company Name</th>
                    <th className="px-3 py-2 text-left">Company Email</th>
                    <th className="px-3 py-2 text-left">Date Started</th>
                    <th className="px-3 py-2 text-left">Date Ended</th>
                    <th className="px-3 py-2 text-left">Actions</th>
                  </>
                )}
                {selectedFormType === 'rider' && (
                  <>
                    <th className="px-3 py-2 text-left">ID</th>
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">Contact</th>
                    <th className="px-3 py-2 text-left">Email</th>
                    <th className="px-3 py-2 text-left">Vehicle</th>
                    <th className="px-3 py-2 text-left">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {forms
                .filter((form: any) => form.type === selectedFormType)
                .map((form: any, index: number) => (
                  <React.Fragment key={form.id}>
                    <tr
                      className={`${index % 2 === 0 ? 'bg-teal-50' : 'bg-white'} cursor-pointer hover:bg-teal-100`}
                      onClick={() => toggleExpand(form.id)}
                    >
                      {selectedFormType === 'ads' && (
                        <>
                          <td className="px-3 py-2">{form.title}</td>
                          <td className="px-3 py-2">{form.companyName}</td>
                          <td className="px-3 py-2">{form.companyEmail}</td>
                          <td className="px-3 py-2">{form.dateStarted}</td>
                          <td className="px-3 py-2">{form.dateEnded}</td>
                          <td className="px-3 py-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApprove(form.id, form.type);
                              }}
                              className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                            >
                              Approve
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReject(form.id, form.type);
                              }}
                              className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                              Reject
                            </button>
                          </td>
                        </>
                      )}
                      {selectedFormType === 'rider' && (
                        <>
                          <td className="px-3 py-2">{form.id}</td>
                          <td className="px-3 py-2">{form.name}</td>
                          <td className="px-3 py-2">{form.status}</td>
                          <td className="px-3 py-2">{form.contact}</td>
                          <td className="px-3 py-2">{form.email}</td>
                          <td className="px-3 py-2">{form.vehicle}</td>
                          <td className="px-3 py-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApprove(form.id, form.type);
                              }}
                              className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                            >
                              Approve
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReject(form.id, form.type);
                              }}
                              className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                              Reject
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                    {expandedId === form.id && (
                      <tr className="bg-gray-100">
                        <td colSpan={selectedFormType === 'ads' ? 6 : 7} className="p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            {form.type === 'ads' && (
                              <>
                                <div><strong>Description:</strong> {form.description}</div>
                                <div><strong>Vehicle Type:</strong> {form.vehicleType}</div>
                                <div><strong>Material:</strong> {form.material}</div>
                                <div><strong>Plan:</strong> {form.plan}</div>
                                <div><strong>Format:</strong> {form.format}</div>
                                <div>
                                  <strong>Media:</strong><br />
                                  {form.format === 'Video' ? (
                                    <video controls className="w-40 h-40 object-cover rounded">
                                      <source src={form.mediaUrl} type="video/mp4" />
                                      Your browser does not support the video tag.
                                    </video>
                                  ) : form.format === 'Image' ? (
                                    <img src={form.mediaUrl} alt="Ad Media" className="w-40 h-40 object-cover rounded" />
                                  ) : null}
                                </div>
                              </>
                            )}
                            {form.type === 'rider' && (
                              <>
                                <div><strong>Plate Number:</strong> {form.plateNumber}</div>
                                <div><strong>Materials:</strong> {form.materialsSupported} ({form.materialsId})</div>
                                <div><strong>License Number:</strong> {form.licenseNumber}</div>
                                <div>
                                  <strong>Selfie:</strong><br />
                                  <img src={form.selfie} alt="Selfie" className="h-20 w-20 rounded-full object-cover border" />
                                </div>
                                <div>
                                  <strong>License Picture:</strong><br />
                                  <img src={form.licensePicUrl} alt="License Picture" className="w-40 h-40 object-cover rounded" />
                                </div>
                                <div>
                                  <strong>OR/CR Picture:</strong><br />
                                  <img src={form.orcrPicUrl} alt="OR/CR Picture" className="w-40 h-40 object-cover rounded" />
                                </div>
                                <div><strong>Applying for Ads:</strong> {form.applyingForAds}</div>
                                <div><strong>Start of Riding:</strong> {form.startOfRiding}</div>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              {forms.filter((form: any) => form.type === selectedFormType).length === 0 && (
                <tr>
                  <td colSpan={selectedFormType === 'ads' ? 6 : 7} className="text-center text-gray-500 py-4">No forms match the selected type.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="text-sm text-gray-600">Found: {forms.filter((form: any) => form.type === selectedFormType).length} form(s)</div>
      </div>
    </div>
  );
};

export default ManageForms;