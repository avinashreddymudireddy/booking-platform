import React from 'react';
import { Box, Grid, Typography, Link, TextField, Button } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.200', py: 6, mt: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>About Us</Typography>
          <Link href="#" display="block" color="text.secondary">Company Info</Link>
          <Link href="#" display="block" color="text.secondary">Careers</Link>
          <Link href="#" display="block" color="text.secondary">Blog</Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>Support</Typography>
          <Link href="#" display="block" color="text.secondary">Help Center</Link>
          <Link href="#" display="block" color="text.secondary">Contact Us</Link>
          <Link href="#" display="block" color="text.secondary">FAQs</Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>Legal</Typography>
          <Link href="#" display="block" color="text.secondary">Terms</Link>
          <Link href="#" display="block" color="text.secondary">Privacy</Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>Follow Us</Typography>
          <Link href="#" display="block" color="text.secondary">Facebook</Link>
          <Link href="#" display="block" color="text.secondary">Instagram</Link>
          <Link href="#" display="block" color="text.secondary">Twitter</Link>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 4 }}>     
        <Typography variant="h6" gutterBottom>Newsletter</Typography>
        <Box component="form" sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <TextField
            type="email"
            placeholder="Enter your email"
            required
            variant="outlined"
            size="small"
            sx={{ bgcolor: 'common.white', mr: 1 }}
          />
          <Button variant="contained" color="primary">Subscribe</Button>
        </Box>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="text.secondary">© 2025 Booking Platform. All rights reserved.</Typography>
      </Box>
    </Box>
  );
}

export default Footer;
