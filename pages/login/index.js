import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

// Hook form and yup

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// MUI imports 

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';

// Reducer 

import { login } from '@/store/auth';

// component imports

import PublicRoute from '@/components/PublicRoute';

// Api 
import { loginApi } from '@/services/apiService';


// Login Schema 

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const response = await loginApi(email, password);
      console.log(response)
      if (response?.status === "success") {
        setServerError('');
        sessionStorage.setItem('authToken', response.token);
        sessionStorage.setItem('user', JSON.stringify(response.user));
        dispatch(login(response));
        router.push('/dashboard');
      } else {
        setServerError(response.message ?? 'Failed to log in. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error in handleLogin:', error);
      setServerError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <PublicRoute>
      <Container
        component="main"
        maxWidth={false}
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: 'url("/images/loginImg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <Paper elevation={3} style={{ padding: 20, width: '100%', maxWidth: 400, margin: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              style={{
                marginBottom: 10,
                fontSize: '14px'
              }}
              InputProps={{
                style: {
                  height: '2.5rem'
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '12px',
                  marginTop: '-2px',
                  fontWeight: 600
                },
              }}
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              style={{
                marginBottom: 20,
                fontSize: '14px',
              }}
              InputProps={{
                style: {
                  height: '2.5rem'
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '12px',
                  marginTop: '-2px',
                  fontWeight: 600
                },
              }}
            />
            <Box display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ backgroundColor: '#314b31', color: 'white', textTransform: 'none' }}
                startIcon={<LockOpenIcon />}
              >
                Login
              </Button>
            </Box>
          </form>
          {serverError && <Typography
            color="error"
            style={{
              fontSize: '12px',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {serverError}
          </Typography>}
        </Paper>
      </Container>
    </PublicRoute>
  );
};

export default LoginPage;
