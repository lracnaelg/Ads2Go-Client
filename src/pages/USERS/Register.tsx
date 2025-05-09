import React, { useState, useCallback, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RiderCompanyRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    companyName: '',
    companyAddress: '',
    contactNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registrationError, setRegistrationError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { register, navigateToLogin } = useAuth();

  const handleLoginClick = useCallback(() => {
      navigateToLogin();
    }, [navigateToLogin]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return `${name.split(/(?=[A-Z])/).join(' ')} is required`;
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters and spaces allowed';
        return '';
      case 'companyName':
        if (!value.trim()) return 'Company/Business name is required';
        if (value.length < 2) return 'Company name must be at least 2 characters';
        return '';
      case 'companyAddress':
        if (!value.trim()) return 'Company/Business address is required';
        if (value.length < 5) return 'Address must be at least 5 characters';
        return '';
      case 'contactNumber':
        if (!value.trim()) return 'Contact number is required';
        if (!/^09\d{9}$/.test(value)) {
          if (!value.startsWith('09')) return 'Contact number must start with 09';
          if (value.length !== 11) return 'Contact number must be exactly 11 digits';
          if (/[a-zA-Z]/.test(value)) return 'Contact number must not contain letters';
        }
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value))
          return 'Password must include uppercase, lowercase, number, and special character';
        return '';
      case 'confirmPassword':
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (): boolean => {
    const fieldGroups: string[][] = [
      ['firstName', 'lastName'], // Step 1
      ['companyName', 'companyAddress', 'contactNumber'], // Step 2
      ['email', 'password', 'confirmPassword'] // Step 3
    ];

    const fieldsToValidate = fieldGroups[currentStep - 1] || [];

    const newErrors: Record<string, string> = {};
    let isValid = true;

    fieldsToValidate.forEach(key => {
      if (key !== 'middleName') {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateStep()) {
      if (currentStep < 3) setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationError('');

    if (!validateStep()) return;

    try {
      const registrationData = {
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastName: formData.lastName.trim(),
        companyName: formData.companyName.trim(),
        companyAddress: formData.companyAddress.trim(),
        contactNumber: formData.contactNumber.trim(),
        email: formData.email.trim(),
        password: formData.password,
        userType: 'rider'
      };

      const success = await register(registrationData);
      if (success) {
        navigate('/verify-email');
      } else {
        setRegistrationError('Check your email for verification');
      }
    } catch (err) {
      setRegistrationError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    }
  };

  useEffect(() => {
    if (registrationError) {
      const timer = setTimeout(() => {
        setRegistrationError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registrationError]);

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center text-white px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/image/signup.png')" }}
    >
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-lg overflow-hidden">
        {/* Left Side - Registration Form */}
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col items-center">
          <img src="/image/blue-logo.png" alt="Logo" className="w-20 h-20 mb-6" />
          <h2 className="text-5xl font-extrabold mb-6 text-black">SIGN UP</h2>
          <form className="space-y-4 w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
            {currentStep === 1 && (
              <div>
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black hover:scale-105 transition-all duration-300"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name</label>
                    <input
                      id="middleName"
                      name="middleName"
                      type="text"
                      value={formData.middleName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black hover:scale-105 transition-all duration-300"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="flex justify-end items-center mt-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-40 bg-[#FF9D3D] text-white py-2 px-4 border rounded-[8px] transition hover:scale-105 transition-all duration-300"
                  >
                    Next
                  </button>
                </div>
                <div className="text-center text-gray-600 text-sm mt-4">Or Register with</div>
                <div className="flex justify-center gap-4 mt-2">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                    <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black hover:scale-105 transition-all duration-300"
                  />
                  {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
                </div>
                <div>
                  <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">Company Address</label>
                  <input
                    id="companyAddress"
                    name="companyAddress"
                    type="text"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black hover:scale-105 transition-all duration-300"
                  />
                  {errors.companyAddress && <p className="mt-1 text-sm text-red-600">{errors.companyAddress}</p>}
                </div>
                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="e.g., 09123456789"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black hover:scale-105 transition-all duration-300"
                  />
                  {errors.contactNumber && <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-40 bg-gray-300 text-black py-2 px-4 border rounded-[8px] transition hover:scale-105 transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-40 bg-[#FF9D3D] text-white py-2 px-4 border rounded-[8px] transition hover:scale-105 transition-all duration-300"
                  >
                    Next
                  </button>
                </div>
                <div className="text-center text-gray-600 text-sm mt-4">Or Register with</div>
                <div className="flex justify-center gap-4 mt-2">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                    <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black hover:scale-105 transition-all duration-300"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black hover:scale-105 transition-all duration-300"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black hover:scale-105 transition-all duration-300"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-40 bg-gray-300 text-black py-2 px-4 border rounded-[8px] transition hover:scale-105 transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-40 bg-[#FF9D3D] text-white py-2 px-4 border rounded-[8px] transition hover:scale-105 transition-all duration-300"
                  >
                    Sign in
                  </button>
                </div>
                <div className="text-center text-gray-600 text-sm mt-4">Or Register with</div>
                <div className="flex justify-center gap-4 mt-2">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                    <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Side - LOG IN and SIGN UP Text */}
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
          <div className="text-center">
            <h2
              className="text-3xl font-extrabold text-white mb-10 cursor-pointer transition-colors duration-200"
              onClick={handleLoginClick}
            >
              LOG IN
            </h2>
            <h2
              className="text-3xl font-extrabold text-black"
            >
              SIGN UP
            </h2>
          </div>
        </div>
      </div>

      {/* Error Pop-up in Bottom-Right Corner */}
      {registrationError && (
        <div className="fixed bottom-4 right-4 p-4 bg-[#D2665A] text-white/80 rounded-lg shadow-lg z-50">
          <p>{registrationError}</p>
        </div>
      )}
    </div>
  );
};

export default RiderCompanyRegister;