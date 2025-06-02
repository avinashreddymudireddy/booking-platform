import React from 'react';
import TextField from '@mui/material/TextField';

const FormField = ({ label, type = 'text', value, onChange, name }) => (
  <TextField
    label={label}
    type={type}
    value={value}
    onChange={e => onChange(e.target.value)}
    name={name}
    fullWidth
    margin="normal"
  />
);

export default FormField;
