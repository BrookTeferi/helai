'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
  
    if (!agreeTerms) {
      setErrorMessage('Please agree to the Terms of Service.')
      return
    }
  
    try {
      const res = await fetch('/account_users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
  
      // Check if the response is JSON
      const contentType = res.headers.get('Content-Type')
      if (res.ok) {
        if (contentType && contentType.includes('application/json')) {
          const result = await res.json()
  
          // Handle successful response
          localStorage.setItem('userCreated', 'true')
          router.push('/login')
        } else {
          // Handle non-JSON responses (like error pages)
          const text = await res.text()
          console.error('Non-JSON response:', text)
          setErrorMessage('An unexpected error occurred. Please try again.')
        }
      } else {
        // Handle HTTP errors (e.g., 404, 500)
        const errorText = await res.text()
        console.error('Error response:', errorText)
        setErrorMessage('Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrorMessage('An error occurred. Please try again.')
    }
  } 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600/20 via-teal-500/20 to-purple-600/20 bg-cover bg-center" style={{ backgroundImage: 'url(/images/background-image.jpg)' }}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-teal-500/40 to-purple-600/40" />
      </div>

      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-8 pl-12">CREATE ACCOUNT</h1> {/* Added padding to move heading */}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="text-red-600 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
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

            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
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
            Have already an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
