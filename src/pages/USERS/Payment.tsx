import React, { useState } from 'react';
import { CreditCard, Wallet, Smartphone } from 'lucide-react';

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
    // Backend call
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-2">Complete Your Payment</h1>
      <p className="text-center text-gray-600 mb-8">Choose your payment method and fill out the required information.</p>

      <div className="grid grid-cols-1 gap-6">
        {/* Ad Details Card */}
        <div className="bg-white border rounded-lg shadow-sm p-5">
          <h2 className="font-semibold text-lg mb-3">Ad Summary</h2>
          <div className="space-y-1 text-sm text-gray-700">
            <p><strong>Title:</strong> Company Launch Ad</p>
            <p><strong>Vehicle Type:</strong> Sedan</p>
            <p><strong>Materials:</strong> LCD Screen</p>
            <p><strong>Total:</strong> ₱{amount.toFixed(2)}</p>
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="bg-white border rounded-lg shadow-sm p-5">
          <h2 className="font-semibold text-lg mb-3">Payment Method</h2>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              className={`flex flex-col items-center justify-center border rounded-lg p-4 hover:bg-gray-100 transition ${
                paymentType === 'cash' ? 'border-indigo-500 bg-indigo-50' : ''
              }`}
              onClick={() => setPaymentType('cash')}
            >
              <Wallet className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">Cash</span>
            </button>
            <button
              className={`flex flex-col items-center justify-center border rounded-lg p-4 hover:bg-gray-100 transition ${
                paymentType === 'card' ? 'border-indigo-500 bg-indigo-50' : ''
              }`}
              onClick={() => setPaymentType('card')}
            >
              <CreditCard className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">Card</span>
            </button>
            <button
              className={`flex flex-col items-center justify-center border rounded-lg p-4 hover:bg-gray-100 transition ${
                paymentType === 'gcash' ? 'border-indigo-500 bg-indigo-50' : ''
              }`}
              onClick={() => setPaymentType('gcash')}
            >
              <Smartphone className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">GCash</span>
            </button>
          </div>

          {/* Dynamic Fields */}
          {paymentType === 'card' && (
            <div className="grid grid-cols-1 gap-3 mt-2">
              <input
                type="text"
                placeholder="Card Number (16 digits)"
                className="p-2 border rounded"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              />
              <input
                type="text"
                placeholder="Card Holder"
                className="p-2 border rounded"
                value={cardDetails.holder}
                onChange={(e) => setCardDetails({ ...cardDetails, holder: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Expiry (MM/YY)"
                  className="p-2 border rounded"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="p-2 border rounded"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                />
              </div>
            </div>
          )}

          {paymentType === 'gcash' && (
            <div className="mt-3">
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

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-300 text-red-600 p-3 rounded">
            <ul className="list-disc list-inside text-sm">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white text-sm font-semibold py-3 rounded hover:bg-indigo-700 transition"
        >
          Submit Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
