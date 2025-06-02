// Theme configuration using Material-UI's theming system
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Booking Platform primary color
    },
    secondary: {
      main: '#dc004e', // Accent color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontWeight: 500,
    },
  },
});

export default theme;
