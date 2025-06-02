import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Box, IconButton, Typography, InputBase, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Navigation from './Navigation';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: theme.spacing(2),
  width: 'auto',
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '12ch',
    '&:focus': { width: '20ch' },
  },
}));

function Header() {
  const { user, logout } = useAuth();
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src="/images/logo.png" alt="Booking Logo" height={40} />
          <Typography variant="h6" component="div" sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
            Booking
          </Typography>
        </Box>
        <Navigation />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
        </Search>
        {user ? (
          <Box sx={{ ml: 2 }}>
            <Typography variant="body1" component="span" sx={{ mr: 1 }}>
              Hello, {user.name}
            </Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Box>
        ) : (
          <Button color="inherit" href="/login">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
