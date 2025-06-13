import React, { useState } from 'react';

type TransactionStatus = 'paid' | 'failed' | 'refunded' | 'all';

interface Transaction {
  id: number;
  user: string;
  status: TransactionStatus;
  plan: string;
  adType: string;
  materials: string;
  mop: string;
  date: string;
}

const sampleTransactions: Transaction[] = [
  {
    id: 1,
    user: 'Juan Dela Cruz',
    status: 'paid',
    plan: 'Basic Plan',
    adType: 'Banner',
    materials: 'Image, Video',
    mop: 'Credit Card',
    date: '2025-05-01',
  },
  {
    id: 2,
    user: 'Maria Santos',
    status: 'failed',
    plan: 'Premium Plan',
    adType: 'Video Ad',
    materials: 'Video',
    mop: 'PayPal',
    date: '2025-05-02',
  },
  {
    id: 3,
    user: 'Juan Dela Cruz',
    status: 'refunded',
    plan: 'Basic Plan',
    adType: 'Banner',
    materials: 'Image',
    mop: 'GCash',
    date: '2025-05-03',
  },
];

const Reports: React.FC = () => {
  const [filterUser, setFilterUser] = useState('');
  const [filterStatus, setFilterStatus] = useState<TransactionStatus>('all');

  const filteredTransactions = sampleTransactions.filter((tx) => {
    const matchUser = filterUser
      ? tx.user.toLowerCase().includes(filterUser.toLowerCase())
      : true;
    const matchStatus = filterStatus === 'all' || tx.status === filterStatus;
    return matchUser && matchStatus;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 pl-64 space-y-10 bg-[#FAFAFA]">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold text-[#0A192F]">Reports</h1>
        <p className="text-[#7A7A7A]">
          Overview of all ad transactions including user participation, payment status, and advertising details.
        </p>
      </header>

      {/* Filters */}
      <section className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-center">
        <div>
          <label className="block font-medium text-[#2E2E2E] mb-1">Filter by User</label>
          <input
            type="text"
            placeholder="Enter user name"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-60 focus:outline-none focus:ring focus:ring-[#2EC4B6]"
          />
        </div>

        <div>
          <label className="block font-medium text-[#2E2E2E] mb-1">Filter by Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as TransactionStatus)}
            className="border border-gray-300 rounded px-3 py-2 w-40 focus:outline-none focus:ring focus:ring-[#2EC4B6]"
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </section>

      {/* Table */}
      <section className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#CBF3F0]">
            <tr>
              {['User', 'Status', 'Plan', 'Ad Type', 'Materials', 'MOP', 'Date'].map((header) => (
                <th
                  key={header}
                  className="text-left text-sm font-semibold text-[#2E2E2E] px-6 py-3 border-b"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-[#7A7A7A]">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#CBF3F0]/40">
                  <td className="px-6 py-3 border-b text-[#2E2E2E]">{tx.user}</td>
                  <td className="px-6 py-3 border-b">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="px-6 py-3 border-b text-[#2E2E2E]">{tx.plan}</td>
                  <td className="px-6 py-3 border-b text-[#2E2E2E]">{tx.adType}</td>
                  <td className="px-6 py-3 border-b text-[#2E2E2E]">{tx.materials}</td>
                  <td className="px-6 py-3 border-b text-[#2E2E2E]">{tx.mop}</td>
                  <td className="px-6 py-3 border-b text-[#2E2E2E]">{tx.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

const StatusBadge = ({ status }: { status: TransactionStatus }) => {
  const base = 'px-3 py-1 rounded-full text-sm font-medium';
  const styles = {
    paid: 'bg-[#2EC4B6]/20 text-[#0A192F]',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-yellow-100 text-yellow-800',
  };
  return <span className={`${base} ${styles[status as keyof typeof styles]}`}>{status}</span>;
};

export default Reports;
