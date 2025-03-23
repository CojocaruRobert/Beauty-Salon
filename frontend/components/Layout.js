import React from 'react';
import Navbar from './Navbar';
import { Box, Container, Typography, Grid, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        mt: 'auto',
        backgroundColor: 'primary.main',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              KATY REGAL BEAUTY SALON
            </Typography>
            <Typography variant="body2">
              Providing premium beauty services and treatments to enhance your natural beauty and boost your confidence.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <MuiLink href="https://instagram.com" target="_blank" color="inherit">
                <InstagramIcon />
              </MuiLink>
              <MuiLink href="https://facebook.com" target="_blank" color="inherit">
                <FacebookIcon />
              </MuiLink>
              <MuiLink href="https://twitter.com" target="_blank" color="inherit">
                <TwitterIcon />
              </MuiLink>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              QUICK LINKS
            </Typography>
            <Typography component="div">
              <Box component={Link} href="/" sx={{ display: 'block', color: 'white', mb: 1, textDecoration: 'none' }}>
                Home
              </Box>
              <Box component={Link} href="/services" sx={{ display: 'block', color: 'white', mb: 1, textDecoration: 'none' }}>
                Services
              </Box>
              <Box component={Link} href="/about" sx={{ display: 'block', color: 'white', mb: 1, textDecoration: 'none' }}>
                About Us
              </Box>
              <Box component={Link} href="/contact" sx={{ display: 'block', color: 'white', mb: 1, textDecoration: 'none' }}>
                Contact
              </Box>
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              CONTACT US
            </Typography>
            <Typography variant="body2" paragraph>
              123 Beauty Street<br />
              Salon City, SC 12345
            </Typography>
            <Typography variant="body2" paragraph>
              Phone: (123) 456-7890<br />
              Email: info@katyregal.com
            </Typography>
            <Typography variant="body2">
              Hours: Mon-Sat: 9AM - 7PM<br />
              Sunday: 10AM - 5PM
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, borderTop: 1, borderColor: 'rgba(255,255,255,0.2)', pt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Katy Regal Beauty Salon. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout; 