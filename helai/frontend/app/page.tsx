'use client';

import { useEffect, useState } from 'react';

const HomePage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    // Check the registration status from localStorage
    const registrationStatus = localStorage.getItem('isRegistered');
    if (registrationStatus === 'true') {
      setIsRegistered(true);
    }

    // Fetch data from home API
    const fetchHomeData = async () => {
      const homeRes = await fetch('/api/home');
      const homeData = await homeRes.json();
      setWelcomeMessage(homeData.message);
    };

    fetchHomeData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {isRegistered ? welcomeMessage : 'Click below to register:'}
        </h2>

        {!isRegistered && (
          <a
            href="/register"
            className="text-center text-indigo-600 hover:text-indigo-700 block mt-4"
          >
            Go to Registration Page
          </a>
        )}
      </div>
    </div>
  );
};

export default HomePage;
