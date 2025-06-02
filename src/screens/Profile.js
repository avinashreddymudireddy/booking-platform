import React, { useState, useEffect } from 'react';
import useProfile from '../hooks/useProfile';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import FormField from '../components/FormField';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Typography, Paper } from '@mui/material';

function Profile() {
  const { profile, loading, error } = useProfile();
  const { updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
    }
  }, [profile]);

  function handleSubmit(e) {
    e.preventDefault();
    updateProfile({ name, email });
    setSuccess(true);
  }

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Profile</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormField label="Name" value={name} onChange={setName} name="name" />
        <FormField label="Email" value={email} onChange={setEmail} name="email" type="email" />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Save
        </Button>
        {success && (
          <Typography color="success.main" sx={{ mt: 1 }}>
            Profile updated successfully!
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default Profile;
