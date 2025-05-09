import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

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
  const navigate = useNavigate();
  const { register } = useAuth();

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
        if (!/^(\+?63)?9\d{9}$/.test(value.replace(/\D/g, ''))) 
          return 'Please use a valid Philippine mobile number (e.g., 09123456789)';
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
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      if (key !== 'middleName') { // Middle name is optional
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationError('');

    if (!validateForm()) return;

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
        userType: 'rider' // or 'company' based on your system
      };

      const success = await register(registrationData);
      if (success) {
        navigate('/verify-email');
      } else {
        setRegistrationError('Registration failed. Please try again.');
      }
    } catch (err) {
      setRegistrationError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 text-gray-900">
      <div className="max-w-md w-full space-y-8 p-10 rounded-xl shadow-lg bg-white">
        <h2 className="text-center text-3xl font-extrabold">
          Create your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="name"
            label="Full Name"
            value={name}
            onChange={handleChange}
            error={validationErrors.name}
          />
          <InputField
            id="email-address"
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            error={validationErrors.email}
          />
          <PasswordField
            id="password"
            label="Password"
            value={password}
            onChange={handleChange}
            show={showPassword}
            toggle={() => togglePasswordVisibility('password')}
            error={validationErrors.password}
          />
          <PasswordField
            id="confirm-password"
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            show={showConfirmPassword}
            toggle={() => togglePasswordVisibility('confirmPassword')}
            error={validationErrors.confirmPassword}
          />
          <InputField
            id="house-address"
            label="House Address"
            name="houseAddress"
            value={houseAddress}
            onChange={handleChange}
            error={validationErrors.houseAddress}
          />
          <InputField
            id="contact-number"
            label="Contact Number"
            name="contactNumber"
            type="tel"
            value={contactNumber}
            onChange={handleChange}
            error={validationErrors.contactNumber}
          />
          {error && <p className="text-center text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 text-sm font-medium"
          >
            Register
          </button>
          <div className="text-center mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RiderCompanyRegister;