import React, { useState } from 'react';

const Payment: React.FC = () => {
  const [paymentType, setPaymentType] = useState<string>('cash');
  const [amount] = useState<number>(1500);

  const [cardDetails, setCardDetails] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: ''
  });

  const [gcashNumber, setGcashNumber] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const validateInputs = () => {
    const errs: string[] = [];

    if (paymentType === 'card') {
      const cardNumberRegex = /^\d{16}$/;
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvRegex = /^\d{3}$/;

      if (!cardNumberRegex.test(cardDetails.number)) errs.push('Card number must be 16 digits.');
      if (!cardDetails.holder.trim()) errs.push('Card holder name is required.');
      if (!expiryRegex.test(cardDetails.expiry)) errs.push('Expiry must be in MM/YY format.');
      if (!cvvRegex.test(cardDetails.cvv)) errs.push('CVV must be 3 digits.');
    }

    if (paymentType === 'gcash') {
      const gcashRegex = /^(09|\+639)\d{9}$/;
      if (!gcashRegex.test(gcashNumber)) errs.push('GCash number must be a valid 11-digit Philippine number.');
    }

    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = () => {
    if (!validateInputs()) return;
    alert('Payment submitted successfully!');
    // call backend here
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Payment for Advertisement</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Ad Details</h2>
        <p><strong>Title:</strong> Company Launch Ad</p>
        <p><strong>Vehicle Type:</strong> Sedan</p>
        <p><strong>Materials Used:</strong> LCD Screen</p>
        <p><strong>Total Amount:</strong> ₱{amount.toFixed(2)}</p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Select Payment Method</h2>
        <select
          className="border p-2 rounded w-full"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="gcash">GCash</option>
        </select>

        {paymentType === 'card' && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Card Number (16 digits)"
              className="w-full p-2 border rounded mb-2"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
            />
            <input
              type="text"
              placeholder="Card Holder"
              className="w-full p-2 border rounded mb-2"
              value={cardDetails.holder}
              onChange={(e) => setCardDetails({ ...cardDetails, holder: e.target.value })}
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              className="w-full p-2 border rounded mb-2"
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
            />
            <input
              type="text"
              placeholder="CVV (3 digits)"
              className="w-full p-2 border rounded"
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
            />
          </div>
        )}

        {paymentType === 'gcash' && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="GCash Mobile Number"
              className="w-full p-2 border rounded"
              value={gcashNumber}
              onChange={(e) => setGcashNumber(e.target.value)}
            />
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          <ul className="list-disc ml-5">
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
      >
        Submit Payment
      </button>
    </div>
  );
};

export default Payment;
