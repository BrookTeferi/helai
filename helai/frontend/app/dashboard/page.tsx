'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NewUserDashboard from '@/components/dashboard/NewUserDashboard';
import ExistingUserDashboard from '@/components/dashboard/ExistingUserDashboard';

type User = {
  isNewUser: boolean;
  userName: string;
  onboardingStatus?: string;
  profileCompletion?: number;
  nextSteps?: string[];
  courseProgress?: number;
  totalCourses?: number;
  completedCourses?: number;
};

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          router.push('/login');
          return;
        }

        let response = await fetch('http://localhost:8000/api/user/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            router.push('/login');
            return;
          }

          const refreshResponse = await fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            localStorage.setItem('accessToken', refreshData.access);
            response = await fetch('http://localhost:8000/api/user/', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${refreshData.access}`,
              },
            });
          } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            router.push('/login');
            return;
          }
        }

        if (!response.ok) throw new Error('Failed to fetch user data');
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Unable to load user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="page-container">
      {user.isNewUser ? (
        <NewUserDashboard
          userName={user.userName}
          onboardingStatus={user.onboardingStatus || 'Incomplete'}
          profileCompletion={user.profileCompletion || 0}
          nextSteps={user.nextSteps || []}
        />
      ) : (
        <ExistingUserDashboard
          userName={user.userName}
          courseProgress={user.courseProgress || 0}
          totalCourses={user.totalCourses || 0}
          completedCourses={user.completedCourses || 0}
        />
      )}
    </div>
  );
};

export default DashboardPage;
