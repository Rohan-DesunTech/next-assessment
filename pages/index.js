import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login } from '@/store/auth';


export default function Home() {

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authToken = sessionStorage.getItem('authToken');
      const user = sessionStorage.getItem('user');

      if (authToken) {
        router.push('/dashboard');
        dispatch(login({ user: JSON.parse(user), token: authToken }));
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  return (
    <>
     
    </>
  )
}
