// Add this line at the top of your LoginForm.tsx file
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { apiRequest } from '@/utils/api';

// Your LoginForm component code here

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   // Testing toast on component mount
  //   toast.success('Toast is working!', {
  //     position: 'top-center',  // Correct position usage as string
  //     autoClose: 3000,
  //     theme: 'colored',
  //   });
  // }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await apiRequest('account_users/login/', 'POST', formData);
      console.log('User ID:', response.id);
      localStorage.setItem('accessToken', response.access);
      localStorage.setItem('refreshToken', response.refresh);
      router.push('/home');
    } catch (error: any) {
      toast.dismiss();
  
      // Triggering the error toast with backend error message
      toast.error(error.message || 'An unexpected error occurred. Please try again later.', {
        position: 'top-center', // Correct position usage as a string
        autoClose: 5000,
        theme: 'colored',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
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
          <h1 className="text-2xl font-bold text-center mb-8">LOGIN</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-teal-500 hover:from-blue-600 hover:via-blue-700 hover:to-teal-600 text-white font-medium transition-all duration-200 disabled:opacity-50"
            >
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
    </>
  );
}
