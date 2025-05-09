import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Smartphone } from 'lucide-react';

const Payment: React.FC = () => {
  const [paymentType, setPaymentType] = useState<string>('cash');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: '',
  });
  const [gcashNumber, setGcashNumber] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>('');

  const location = useLocation();
  const navigate = useNavigate();
  const { formData, estimatedPrice } = location.state || {
    formData: {
      title: 'N/A',
      vehicleType: 'N/A',
      materialsUsed: 'N/A',
      plan: 'N/A',
      adFormat: 'N/A',
      media: null,
    },
    estimatedPrice: null,
  };

  const validateInputs = () => {
    const errs: string[] = [];

    if (paymentType === 'card') {
      // Card Number: Exactly 16 digits, no characters or symbols
      const cardNumberRegex = /^\d{16}$/;
      if (!cardNumberRegex.test(cardDetails.number)) {
        errs.push('Card number must be exactly 16 digits with no characters or symbols.');
      }

      // Card Holder: Letters and spaces only, at least 2 characters
      const cardHolderRegex = /^[a-zA-Z\s]{2,}$/;
      if (!cardHolderRegex.test(cardDetails.holder)) {
        errs.push('Card holder name must contain only letters and spaces, with at least 2 characters.');
      }

      // Expiry: MM/YY format, numbers and slash only, valid future date
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!expiryRegex.test(cardDetails.expiry)) {
        errs.push('Expiry must be in MM/YY format with numbers only (e.g., 12/25).');
      } else {
        // Validate if expiry is a future date
        const [month, year] = cardDetails.expiry.split('/').map(Number);
        const fullYear = 2000 + year; // Convert YY to YYYY (e.g., 25 to 2025)
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-based in JS
        const expiryDate = new Date(fullYear, month - 1); // Month is 0-based
        const now = new Date(currentYear, currentMonth - 1);

        if (expiryDate <= now) {
          errs.push('Expiry date must be in the future.');
        }
      }

      // CVV: Exactly 3 digits, no characters or symbols
      const cvvRegex = /^\d{3}$/;
      if (!cvvRegex.test(cardDetails.cvv)) {
        errs.push('CVV must be exactly 3 digits with no characters or symbols.');
      }
    }

    if (paymentType === 'gcash') {
      const gcashRegex = /^09\d{9}$/;
      if (!gcashRegex.test(gcashNumber)) {
        errs.push('GCash number must start with 09, be exactly 11 digits, and contain no characters or symbols.');
      }
    }

    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = () => {
    if (!validateInputs()) return;
    setSuccess('Payment submitted successfully!');
    // Backend call
  };

  const handleBack = () => {
    navigate('/create-advertisement', { state: { formData, estimatedPrice } });
  };

  const renderMediaPreview = () => {
    if (!formData.media) return <p className="text-gray-500">No media uploaded</p>;

    const fileExtension = formData.media.name.split('.').pop()?.toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'svg'].includes(fileExtension || '');
    const isVideo = fileExtension === 'mp4';

    if (isImage) {
      return (
        <video
          src={URL.createObjectURL(formData.media)}
          controls
          className="w-full h-auto max-h-64 rounded-lg"
        />
      );
    } else if (isVideo) {
      return (
        <video
          src={URL.createObjectURL(formData.media)}
          controls
          className="w-full h-auto max-h-64 rounded-lg"
        />
      );
    }
    return <p className="text-gray-500">Unsupported media format</p>;
  };

  // Filter non-numeric input for Card Number, CVV, and Expiry
  const handleNumericInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!allowedKeys.includes(e.key) && !/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Filter non-letter input for Card Holder
  const handleTextInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', ' '];
    if (!allowedKeys.includes(e.key) && !/[a-zA-Z]/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Format Expiry input (e.g., "1225" → "12/25")
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // Strip non-numeric characters
    if (value.length >= 3) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4); // Add slash after MM
    }
    setCardDetails({ ...cardDetails, expiry: value.slice(0, 5) }); // Limit to MM/YY
  };

  // Auto-dismiss success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="w-full min-h-screen flex justify-center bg-[#F6C794] bg-cover px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full md:w-1/2 mt-10">
        <h1 className="text-4xl font-bold text-center mb-6">Complete Your Payment</h1>
        <p className="text-center text-gray-600 text-base mb-8">
          Choose your payment method and fill out the required information.
        </p>

        <div className="grid grid-cols-1 gap-6">
          {/* Ad Details Card */}
          <div className="bg-white border rounded-lg shadow-sm p-5">
            <h2 className="font-semibold text-3xl text-center mb-3">Ad Summary</h2>
            <div className="space-y-1 text-md text-gray-700">
              <p><strong>Title:</strong> {formData.title || 'N/A'}</p>
              <p><strong>Vehicle Type:</strong> {formData.vehicleType || 'N/A'}</p>
              <p><strong>Materials:</strong> {formData.materialsUsed || 'N/A'}</p>
              <p><strong>Plan:</strong> {formData.plan || 'N/A'}</p>
              <p><strong>Format:</strong> {formData.adFormat || 'N/A'}</p>
              <p>
                <strong>Total:</strong> ₱
                {estimatedPrice !== null ? estimatedPrice.toLocaleString() : 'N/A'}
              </p>
            </div>
          </div>

          {/* Media Preview Card */}
          <div className="bg-white border rounded-lg shadow-sm p-5">
            <h2 className="font-semibold text-lg mb-3">Uploaded Media</h2>
            {renderMediaPreview()}
          </div>

          {/* Payment Method Card */}
          <div className="bg-white border rounded-lg shadow-sm p-5">
            <h2 className="font-semibold text-lg mb-3">Payment Method</h2>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                className={`flex flex-col items-center justify-center  p-4 hover:bg-gray-100 hover:scale-105 transition duration-300 ${
                  paymentType === 'cash' ? 'bg-[#AFDDFF]' : ''
                }`}
                onClick={() => setPaymentType('cash')}
              >
                <Wallet className="w-6 h-6 mb-1" />
                <span className="text-sm font-medium">Cash</span>
              </button>
              <button
                className={`flex flex-col items-center justify-center  p-4 hover:bg-gray-100 hover:scale-105 transition duration-300 ${
                  paymentType === 'card' ? 'bg-[#AFDDFF]' : ''
                }`}
                onClick={() => setPaymentType('card')}
              >
                <CreditCard className="w-6 h-6 mb-1" />
                <span className="text-sm font-medium">Card</span>
              </button>
              <button
                className={`flex flex-col items-center justify-center  p-4 hover:bg-gray-100 hover:scale-105 transition duration-300 ${
                  paymentType === 'gcash' ? 'bg-[#AFDDFF]' : ''
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
                  onKeyPress={handleNumericInput}
                  maxLength={16}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                />
                <input
                  type="text"
                  placeholder="Card Holder"
                  className="p-2 border rounded"
                  value={cardDetails.holder}
                  onChange={(e) => setCardDetails({ ...cardDetails, holder: e.target.value })}
                  onKeyPress={handleTextInput}
                  pattern="[a-zA-Z\s]+"
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Expiry (MM/YY)"
                    className="p-2 border rounded"
                    value={cardDetails.expiry}
                    onChange={handleExpiryChange}
                    onKeyPress={handleNumericInput}
                    maxLength={5}
                    pattern="[0-9/]*"
                    inputMode="numeric"
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="p-2 border rounded"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    onKeyPress={handleNumericInput}
                    maxLength={3}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    required
                  />
                </div>
              </div>
            )}

            {paymentType === 'gcash' && (
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="GCash Mobile Number (e.g., 09xxxxxxxxx)"
                  className="w-full p-2 border rounded"
                  value={gcashNumber}
                  onChange={(e) => setGcashNumber(e.target.value)}
                  onKeyPress={handleNumericInput}
                  maxLength={11}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
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

          {/* Success Pop-up in Bottom-Right Corner */}
          {success && (
            <div className="fixed bottom-4 right-4 p-4 bg-[#9EBC8A] text-black/80 rounded-lg shadow-lg z-50">
              <p>{success}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleBack}
              className="text-black text-sm font-semibold py-3 rounded hover:bg-gray-100 transition hover:scale-105 transition-all duration-300 flex-1"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#578FCA] text-white text-sm font-semibold py-3 rounded hover:text-black/80 hover:bg-[#AFDDFF] transition hover:scale-105 transition-all duration-300 flex-1"
            >
              Submit Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;