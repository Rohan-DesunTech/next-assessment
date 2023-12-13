import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { login } from '@/store/auth';
import { useDispatch } from 'react-redux';

const PublicRoute = ({ children }) => {

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authToken = sessionStorage.getItem('authToken');
      const user = sessionStorage.getItem('user');

      if (authToken) {
        router.push('/dashboard');
        dispatch(login({ user: JSON.parse(user), token: authToken }));
      }
    }
  }, [router]);

  return children;
};

export default PublicRoute;
