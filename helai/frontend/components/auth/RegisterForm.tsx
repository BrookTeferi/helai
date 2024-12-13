'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/utils/api';
import Link from 'next/link';  // Add Link import for the "Terms of Service" link
import { Eye, EyeOff } from 'react-feather'; // Add icons for password visibility toggle

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    role: 'STUDENT',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);  // Define the showPassword state

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!agreeTerms) {
      setErrorMessage('Please agree to the Terms of Service.');
      return;
    }

    try {
      const response = await apiRequest('account_users/register/', 'POST', formData);

      if (response.is_registering) {
        router.push('/dashboard/new');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600/20 via-teal-500/20 to-purple-600/20">
      <div className="absolute inset-0 -z-10">
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-teal-500/40 to-purple-600/40" />
      </div>

      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-8">CREATE ACCOUNT</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="text-red-600 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />

            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />

            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="rounded border-gray-300"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree all statements in{' '}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms of service
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-teal-500 hover:from-blue-600 hover:via-blue-700 hover:to-teal-600 text-white font-medium transition-all duration-200"
          >
            SIGN UP
          </button>

          <p className="text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
