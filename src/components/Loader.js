import React from 'react';
import { Box, CircularProgress } from '@mui/material';

function Loader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
      <CircularProgress />
    </Box>
  );
}

export default Loader;
