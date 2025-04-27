import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface RegisterProps {
  registrationError?: string | null;
  registrationSuccess?: boolean;
}

const validateName = (name: string): string | null => {
  if (!name || name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return 'Name can only contain letters and spaces';
  }
  return null;
};

const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }
  return null;
};

const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
    return 'Password must include uppercase, lowercase, number, and special character';
  }
  return null;
};

const validateContactNumber = (number: string): string | null => {
  // Remove all non-digit characters, including '+' and spaces
  const cleanedNumber = number.replace(/[^\d]/g, '');
  
  console.group('📱 Contact Number Validation');
  console.log('Original Number:', number);
  console.log('Cleaned Number:', cleanedNumber);
  
  // Comprehensive Philippine mobile number validation
  // Covers formats:
  // - +63 9123456789
  // - 09123456789
  // - 9123456789
  // - 639123456789
  const mobileRegex = /^((\+?63)?9\d{9})$/;
  
  if (!cleanedNumber) {
    console.error('❌ No number provided');
    console.groupEnd();
    return 'Contact number is required';
  }
  
  // Additional logging to understand the validation
  console.log('Regex Test Result:', mobileRegex.test(cleanedNumber));
  console.log('Number Length:', cleanedNumber.length);
  console.log('Starts with 9:', cleanedNumber.startsWith('9'));
  
  if (!mobileRegex.test(cleanedNumber)) {
    console.error('❌ Invalid number format', {
      number: cleanedNumber,
      regex: mobileRegex.toString(),
      test: mobileRegex.test(cleanedNumber)
    });
    console.groupEnd();
    return 'Please use a valid Philippine mobile number starting with 9 and 9 digits after (e.g., +639XXXXXXXXX)';
  }
  
  console.log('✅ Number validated successfully');
  console.groupEnd();
  return null;
};

const validateHouseAddress = (address: string): string | null => {
  if (!address || address.trim().length < 5) {
    return 'House address must be at least 5 characters long';
  }
  return null;
};

const Register: React.FC<RegisterProps> = ({ 
  registrationError: propRegistrationError, 
  registrationSuccess 
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [houseAddress, setHouseAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { register } = useAuth();

  console.log('🚀 Register Component Render', { 
    navigate: !!navigate, 
    register: !!register 
  });

  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    contactNumber?: string;
    houseAddress?: string;
  }>({});

  const validateForm = () => {
    const errors: typeof validationErrors = {};

    const nameError = validateName(name);
    if (nameError) errors.name = nameError;

    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    const contactNumberError = validateContactNumber(contactNumber);
    if (contactNumberError) errors.contactNumber = contactNumberError;

    const houseAddressError = validateHouseAddress(houseAddress);
    if (houseAddressError) errors.houseAddress = houseAddressError;

    // Log validation errors
    if (Object.keys(errors).length > 0) {
      console.group('❌ Form Validation Errors');
      Object.entries(errors).forEach(([field, error]) => {
        console.error(`${field}: ${error}`);
      });
      console.groupEnd();
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});

    console.group('🚀 Registration Submission');
    console.log('Current Path:', window.location.pathname);
    console.log('Navigate Function:', !!navigate);
    console.log('Register Function:', !!register);

    const formState = {
      name: name.trim(),
      email: email.trim(), 
      password: '****', 
      houseAddress: houseAddress.trim(), 
      contactNumber: contactNumber.trim()
    };
    console.log('Form State:', formState);

    // Validate all fields before submission
    if (!validateForm()) {
      console.error('❌ Form Validation Failed');
      console.groupEnd();
      return;
    }

    try {
      console.log('📝 Preparing Registration Data');
      const registrationData = {
        name: name.trim(),
        email: email.trim(),
        password,
        houseAddress: houseAddress.trim(),
        contactNumber: contactNumber.trim()
      };

      console.log('📤 Sending Registration Data:', registrationData);
      
      // Detailed error handling for registration
      try {
        const success = await register(registrationData);
        console.log('🎉 Registration Result:', success);

        if (success) {
          console.log('✅ Registration Successful');
          console.log('Redirecting to verification page...');
        } else {
          console.error('❌ Registration Failed');
          setError('Registration failed. Please try again.');
        }
      } catch (registerError) {
        console.error('🚨 Registration Method Error:', registerError);
        
        // More detailed error handling
        if (registerError instanceof Error) {
          console.error('Error Name:', registerError.name);
          console.error('Error Message:', registerError.message);
          setError(registerError.message || 'Registration failed unexpectedly.');
        } else {
          setError('An unexpected error occurred during registration.');
        }
      }
      
      console.groupEnd();
    } catch (err) {
      console.error('🚨 Submission Error:', err);
      
      // More detailed error handling
      if (err instanceof Error) {
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);
        setError(err.message || 'Registration failed. Please try again.');
      } else {
        setError('An unexpected error occurred during registration.');
      }
      
      console.groupEnd();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'houseAddress':
        setHouseAddress(value);
        break;
      case 'contactNumber':
        setContactNumber(value);
        break;
      default:
        break;
    }

    clearFieldError(name as keyof typeof validationErrors);
  };

  const clearFieldError = (fieldName: keyof typeof validationErrors) => {
    if (validationErrors[fieldName]) {
      setValidationErrors(prev => ({
        ...prev,
        [fieldName]: undefined
      }));
    }
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterButtonClick = () => {
    console.group('🔍 Register Button Click Debug');
    console.log('Current Path:', window.location.pathname);
    console.log('Navigate Function:', !!navigate);
    console.log('Form State:', { 
      name, 
      email, 
      password: '****', 
      houseAddress, 
      contactNumber 
    });
    console.groupEnd();

    // Programmatically trigger form submission
    const form = document.querySelector('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  };

  // Update local error state when prop changes
  useEffect(() => {
    if (propRegistrationError) {
      setError(propRegistrationError);
    }
  }, [propRegistrationError]);

  // Redirect on successful registration
  useEffect(() => {
    if (registrationSuccess) {
      navigate('/verify-email');
    }
  }, [registrationSuccess, navigate]);

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`max-w-md w-full space-y-8 p-10 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div>
          <h2 className={`text-center text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Create your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              autoComplete="name"
              className={`appearance-none relative block w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Name"
              value={name}
              onChange={handleChange}
            />
            {validationErrors.name && (
              <span className={`text-center ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{validationErrors.name}</span>
            )}
          </div>

          <div>
            <label htmlFor="email-address" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`appearance-none relative block w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Email address"
              value={email}
              onChange={handleChange}
            />
            {validationErrors.email && (
              <span className={`text-center ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{validationErrors.email}</span>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className={`appearance-none relative block w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility('password')}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {validationErrors.password && (
              <span className={`text-center ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{validationErrors.password}</span>
            )}
          </div>

          <div className="relative">
            <label htmlFor="confirm-password" className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className={`appearance-none relative block w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {validationErrors.confirmPassword && (
              <span className={`text-center ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{validationErrors.confirmPassword}</span>
            )}
          </div>

          <div>
            <label htmlFor="house-address" className="block text-sm font-medium">
              House Address
            </label>
            <input
              id="house-address"
              name="houseAddress"
              type="text"
              autoComplete="street-address"
              required
              className={`appearance-none relative block w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="House Address"
              value={houseAddress}
              onChange={handleChange}
            />
            {validationErrors.houseAddress && (
              <span className={`text-center ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{validationErrors.houseAddress}</span>
            )}
          </div>

          <div>
            <label htmlFor="contact-number" className="block text-sm font-medium">
              Contact Number
            </label>
            <input
              id="contact-number"
              name="contactNumber"
              type="tel"
              autoComplete="tel"
              required
              pattern="[0-9]+"
              className={`appearance-none relative block w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Contact Number"
              value={contactNumber}
              onChange={handleChange}
            />
            {validationErrors.contactNumber && (
              <span className={`text-center ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{validationErrors.contactNumber}</span>
            )}
          </div>

          {error && (
            <div className={`text-center ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              onClick={handleRegisterButtonClick}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-600' : ''}`}
            >
              Register
            </button>
          </div>

          <div className="text-center">
            <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Already have an account?{' '}
              <button 
                type="button"
                onClick={handleLoginClick} 
                className={`font-medium ${theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
