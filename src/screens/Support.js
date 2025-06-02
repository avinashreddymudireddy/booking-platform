import React, { useState } from 'react';
import FormField from '../components/FormField';
import useSupportRequests from '../hooks/useSupportRequests';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';

function Support() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { submitRequest, loading, error } = useSupportRequests();
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await submitRequest({ subject, message });
    if (result.success) setSuccess(true);
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Support</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormField label="Subject" value={subject} onChange={setSubject} name="subject" />
        <TextField
          label="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          name="message"
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        {success && <Typography color="success.main" sx={{ mt: 1 }}>Your request has been submitted!</Typography>}
      </Box>
    </Paper>
  );
}

export default Support;
