// New layout component to wrap pages with header and container
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container, Box } from '@mui/material';

function Layout({ children }) {
  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
}

export default Layout;
