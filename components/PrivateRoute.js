// components/PrivateRoute.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NavbarLayout from './Navbar';
import { useDispatch } from 'react-redux';
import { login } from '@/store/auth';

const PrivateRoute = ({ setFilter, filter, fetchEntriesData }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem('filter');
    sessionStorage.removeItem('authToken');
    router.push('/login');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authToken = sessionStorage.getItem('authToken');
      const user = sessionStorage.getItem('user');

      if (!authToken) {
        router.push('/login');
      }
      else {
        dispatch(login({ user: JSON.parse(user), token: authToken }));
      }
    }
  }, [router]);

  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        handleLogout();
      }, 30 * 60 * 1000); // 30 minutes in milliseconds
    };

    console.log("inactivityTimer", inactivityTimer)

    const handleUserActivity = () => {
      resetTimer();
    };

    // Set up event listeners for user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    // Initialize the timer
    resetTimer();

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      clearTimeout(inactivityTimer);
    };
  }, []);

  return <NavbarLayout setFilter={setFilter} filter={filter} fetchEntriesData={fetchEntriesData}/>;
};

export default PrivateRoute;
