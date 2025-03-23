import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Layout from '../../components/Layout';
import ServiceGrid from '../../components/ServiceGrid';
import Head from 'next/head';

const ServicesPage = () => {
  return (
    <Layout>
      <Head>
        <title>Our Services | Katy Regal Beauty Salon</title>
        <meta name="description" content="Explore our comprehensive range of beauty services at Katy Regal Beauty Salon - from haircuts and styling to manicures, facials, and much more." />
      </Head>
      
      <Box 
        sx={{ 
          backgroundImage: 'linear-gradient(to right, #f8bbd0, #f48fb1)',
          pt: 8, 
          pb: 8,
          mb: 4
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
            Our Services
          </Typography>
          <Typography variant="h5" align="center" color="white" paragraph>
            Discover our comprehensive range of beauty services designed to pamper and rejuvenate you
          </Typography>
        </Container>
      </Box>
      
      <ServiceGrid />
    </Layout>
  );
};

export default ServicesPage; 