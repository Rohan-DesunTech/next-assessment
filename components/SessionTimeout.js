import { logout } from '@/store/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const SessionTimeout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Logout user after 30 minutes of inactivity
      dispatch(logout());
    }, 30 * 60 * 1000);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  return null;
};

export default SessionTimeout;
