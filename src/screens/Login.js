import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, Alert } from '@mui/material';
import FormField from '../components/FormField';
import { useAuth } from '../context/AuthContext';

import { API_URL } from '../context/authConfig';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Validation
    if (!email || !password || (!isLogin && !name)) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        console.log('Attempting login with:', { email });
        await login(email, password);
        navigate('/profile');
      } else {
        console.log('Attempting registration with:', { email, name });
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password, name })
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Registration successful');
          await login(email, password);
          navigate('/profile');
        } else {
          console.log('Registration failed:', data.message);
          setError(data.message || 'Registration failed');
        }
      }
    } catch (e) {
      console.error('Form submission error:', e);
      setError(e.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        {!isLogin && (
          <FormField 
            label="Name" 
            value={name} 
            onChange={setName} 
            name="name" 
            type="text"
            required
          />
        )}
        <FormField 
          label="Email" 
          value={email} 
          onChange={setEmail} 
          name="email" 
          type="email"
          required
        />
        <FormField 
          label="Password" 
          value={password} 
          onChange={setPassword} 
          name="password" 
          type="password"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
          sx={{ mt: 2 }}
        >
          {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
        </Button>
        <Button
          type="button"
          color="secondary"
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => {
            setIsLogin(!isLogin);
            setError(null);
            setEmail('');
            setPassword('');
            setName('');
          }}
        >
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </Button>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Test Credentials:<br />
          Email: test@example.com<br />
          Password: test123
        </Typography>
      </Box>
    </Paper>
  );
}

export default Login;
