import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Status = "Paid" | "Pending" | "Failed";

interface PaymentItem {
  id: number;
  productName: string;
  imageUrl: string;
  amount: string;
  status: Status;
  userName: string;
  companyName: string;
  bankNumber: string;
}

const mockPayments: PaymentItem[] = [
  ...Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    productName: `Product Paid ${i + 1}`,
    imageUrl: "https://via.placeholder.com/80",
    amount: `$${(50 + i * 10).toFixed(2)}`,
    status: "Paid" as Status,
    userName: "John Doe",
    companyName: "Acme Inc.",
    bankNumber: "1234 5678 9012 3456",
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: i + 6,
    productName: `Product Pending ${i + 1}`,
    imageUrl: "https://via.placeholder.com/80",
    amount: `$${(100 + i * 15).toFixed(2)}`,
    status: "Pending" as Status,
    userName: "Jane Smith",
    companyName: "Beta LLC",
    bankNumber: "6543 2109 8765 4321",
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: i + 11,
    productName: `Product Failed ${i + 1}`,
    imageUrl: "https://via.placeholder.com/80",
    amount: `$${(80 + i * 12).toFixed(2)}`,
    status: "Failed" as Status,
    userName: "Alex Brown",
    companyName: "Gamma Corp.",
    bankNumber: "4321 8765 2109 6543",
  })),
];

const History: React.FC = () => {
  const [filter, setFilter] = useState<Status | "All">("All");
  const [selectedItem, setSelectedItem] = useState<PaymentItem | null>(null);
  const navigate = useNavigate();

  const filteredPayments =
    filter === "All"
      ? mockPayments
      : mockPayments.filter((item) => item.status === filter);

  const getStatusStyle = (status: Status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen pl-64 text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Payment History</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Return
        </button>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Status | "All")}
          className="border px-3 py-2 rounded bg-gray-50"
        >
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Payment List */}
      <div className="w-full border rounded overflow-x-auto">
        <div className="grid grid-cols-5 gap-4 p-3 font-semibold bg-gray-100 text-sm">
          <div>Image</div>
          <div>Name</div>
          <div>Status</div>
          <div>Amount</div>
          <div className="text-center">Action</div>
        </div>
        {filteredPayments.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-5 items-center gap-4 px-3 py-4 border-t"
          >
            <img
              src={item.imageUrl}
              alt={item.productName}
              className="w-14 h-14 object-cover rounded"
            />
            <div>{item.productName}</div>
            <span
              className={`inline-block w-fit text-xs font-medium px-2 py-0.5 rounded ${getStatusStyle(
                item.status
              )}`}
            >
              {item.status}
            </span>
            <div>{item.amount}</div>
            <div className="text-center">
              <button
                onClick={() => setSelectedItem(item)}
                className="text-blue-600 hover:underline text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Product:</strong> {selectedItem.productName}
              </p>
              <p>
                <strong>User:</strong> {selectedItem.userName}
              </p>
              <p>
                <strong>Company:</strong> {selectedItem.companyName}
              </p>
              <p>
                <strong>Amount:</strong> {selectedItem.amount}
              </p>
              <p>
                <strong>Bank Number:</strong> {selectedItem.bankNumber}
              </p>
              <p>
                <strong>Status:</strong> {selectedItem.status}
              </p>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-600 hover:text-black underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
