'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/utils/api';
import Link from 'next/link';
import { Eye, EyeOff } from 'react-feather';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await apiRequest('api/login/', 'POST', formData);
      console.log('Login Response:', response);
      
      if (response.access && response.refresh) {
        localStorage.setItem('accessToken', response.access);
        localStorage.setItem('refreshToken', response.refresh);
        console.log('Login successful');
        router.push('/dashboard');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600/20 via-teal-500/20 to-purple-600/20">
      <div className="absolute inset-0 -z-10">
        <img src="/placeholder.svg?height=1080&width=1920" alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-teal-500/40 to-purple-600/40" />
      </div>
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-8">LOGIN</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && <div className="text-red-600 text-sm text-center">{errorMessage}</div>}
          <div className="space-y-4">
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-teal-500 hover:from-blue-600 hover:via-blue-700 hover:to-teal-600 text-white font-medium transition-all duration-200 disabled:opacity-50">
            {isSubmitting ? 'Logging in...' : 'LOGIN'}
          </button>
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
