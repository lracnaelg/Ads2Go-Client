import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

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
  const cleanedNumber = number.replace(/[^\d]/g, '');
  const mobileRegex = /^((\+?63)?9\d{9})$/;

  if (!cleanedNumber) {
    return 'Contact number is required';
  }

  if (!mobileRegex.test(cleanedNumber)) {
    return 'Please use a valid Philippine mobile number starting with 9 and 9 digits after (e.g., +639XXXXXXXXX)';
  }

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
  const { register } = useAuth();

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

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});

    if (!validateForm()) return;

    try {
      // Split the name into first, middle, and last
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts[nameParts.length - 1];
      const middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : null;

      const registrationData = {
        firstName,
        middleName,
        lastName,
        email: email.trim(),
        password,
        contactNumber: contactNumber.trim(),
        houseAddress: houseAddress.trim()
      };

      const success = await register(registrationData);

      if (success) {
        navigate('/verify-email');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred.'
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name': setName(value); break;
      case 'email': setEmail(value); break;
      case 'password': setPassword(value); break;
      case 'confirmPassword': setConfirmPassword(value); break;
      case 'houseAddress': setHouseAddress(value); break;
      case 'contactNumber': setContactNumber(value); break;
      default: break;
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
    if (field === 'password') setShowPassword(!showPassword);
    else setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    if (propRegistrationError) setError(propRegistrationError);
  }, [propRegistrationError]);

  useEffect(() => {
    if (registrationSuccess) navigate('/verify-email');
  }, [registrationSuccess, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{ backgroundImage: "url('image/image.jpeg')" }}
    >
      <div className="max-w-md w-full space-y-8 p-10 rounded-xl shadow-lg bg-white bg-opacity-90">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields remain unchanged */}
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
              type="button"
              onClick={handleLoginClick}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} ;

const InputField = ({
  id,
  label,
  name,
  type = 'text',
  value,
  onChange,
  error
}: any) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium">
      {label}
    </label>
    <input
      id={id}
      name={name || id}
      type={type}
      value={value}
      onChange={onChange}
      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
    {error && <span className="text-red-600">{error}</span>}
  </div>
);

const PasswordField = ({
  id,
  label,
  name,
  value,
  onChange,
  show,
  toggle,
  error
}: any) => (
  <div className="relative">
    <label htmlFor={id} className="block text-sm font-medium">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        name={name || id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={toggle}
      >
        {show ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
      </button>
    </div>
    {error && <span className="text-red-600">{error}</span>}
  </div>
);

export default Register;