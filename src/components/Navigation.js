import React from 'react';
import { Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navigation() {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/movies', label: 'Movies' },
    { to: '/concerts', label: 'Concerts' },
    { to: '/events', label: 'Events' },
    { to: '/offers', label: 'Offers' },
    { to: '/bookings', label: 'Bookings' },
    { to: '/history', label: 'History' },
    { to: '/profile', label: 'Profile' },
    { to: '/search', label: 'Search' },
    { to: '/support', label: 'Support' },
  ];
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
      {links.map(link => (
        <Button
          key={link.to}
          component={RouterLink}
          to={link.to}
          color="inherit"
          size="small"
        >
          {link.label}
        </Button>
      ))}
    </Box>
  );
}

export default Navigation;
