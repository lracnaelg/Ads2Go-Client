import React, { useState } from 'react';

const Payment: React.FC = () => {
  const [method, setMethod] = useState<'creditcard' | 'gcash'>('creditcard');

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl flex flex-col md:flex-row gap-8">
        
        {/* Left: Payment Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Choose Payment Method</h2>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMethod('creditcard')}
              className={`px-4 py-2 rounded-lg border ${
                method === 'creditcard' ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }`}
            >
              Credit Card
            </button>
            <button
              onClick={() => setMethod('gcash')}
              className={`px-4 py-2 rounded-lg border ${
                method === 'gcash' ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }`}
            >
              GCash
            </button>
          </div>

          {method === 'creditcard' ? (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Cardholder Name"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-1/2 px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="GCash Phone Number"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold mb-4">Payment Summary</h3>
          <div className="mb-6">
            <p className="text-gray-600">Plan: <span className="font-medium">Premium</span></p>
            <p className="text-gray-600">Amount:</p>
            <h2 className="text-3xl font-bold text-blue-600 mt-1">₱1,200.00</h2>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
