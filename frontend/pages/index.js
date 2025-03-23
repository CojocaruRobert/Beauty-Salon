import React from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function Home() {
  // Sample featured services
  const featuredServices = [
    {
      id: 'haircut',
      name: 'Premium Haircuts',
      description: 'Expert cuts tailored to your style and face shape',
      image: '/images/service-placeholder.svg',
    },
    {
      id: 'facial',
      name: 'Facial Treatments',
      description: 'Rejuvenate your skin with our premium facial treatments',
      image: '/images/service-placeholder.svg',
    },
    {
      id: 'nails',
      name: 'Nail Services',
      description: 'Manicures and pedicures for elegant, healthy nails',
      image: '/images/service-placeholder.svg',
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Katy Regal | Premium Beauty Services</title>
        <meta name="description" content="Experience luxury beauty services at Katy Regal. We offer premium haircuts, styling, facials, massages, manicures, and more." />
      </Head>

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(/images/service-placeholder.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="inherit"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Katy Regal Beauty Salon
          </Typography>
          <Typography variant="h5" align="center" color="inherit" paragraph>
            Experience luxury beauty services with our expert stylists and premium products.
            Book your appointment today and indulge in the ultimate pampering experience.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button 
              component={Link} 
              href="/services" 
              variant="contained" 
              size="large" 
              color="primary"
              sx={{ mx: 1, fontWeight: 'bold', px: 4, py: 1.5 }}
            >
              Our Services
            </Button>
            <Button 
              component={Link} 
              href="/contact" 
              variant="outlined" 
              size="large"
              sx={{ 
                mx: 1, 
                fontWeight: 'bold', 
                px: 4, 
                py: 1.5, 
                borderColor: 'white', 
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              Book Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Services Section */}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Typography variant="h3" align="center" color="textPrimary" gutterBottom sx={{ mb: 6, fontWeight: 'bold' }}>
          Our Featured Services
        </Typography>
        <Grid container spacing={4}>
          {featuredServices.map((service) => (
            <Grid item key={service.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  }
                }}
              >
                <CardMedia
                  component="div"
                  sx={{ pt: '56.25%', position: 'relative' }}
                >
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {service.name}
                  </Typography>
                  <Typography>
                    {service.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button 
                    component={Link} 
                    href="/services" 
                    size="small" 
                    color="primary"
                    fullWidth
                    variant="contained"
                  >
                    Learn More
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button 
            component={Link} 
            href="/services" 
            variant="outlined" 
            size="large"
            sx={{ fontWeight: 'bold', px: 4 }}
          >
            View All Services
          </Button>
        </Box>
      </Container>

      {/* About Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 8,
          background: '#f8f9fa',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', height: 400 }}>
                <Image
                  src="/images/service-placeholder.svg"
                  alt="About Katy Regal Beauty Salon"
                  fill
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" color="textPrimary" gutterBottom sx={{ fontWeight: 'bold' }}>
                About Our Salon
              </Typography>
              <Typography variant="body1" paragraph>
                At Katy Regal Beauty Salon, we pride ourselves on providing exceptional beauty services in a luxurious and relaxing environment. Our team of skilled professionals is committed to delivering personalized care that enhances your natural beauty.
              </Typography>
              <Typography variant="body1" paragraph>
                With years of experience and continuous training, our stylists stay current with the latest trends and techniques to offer you the best service possible. We use only premium products that are gentle on your hair and skin while delivering outstanding results.
              </Typography>
              <Button 
                component={Link} 
                href="/about" 
                variant="contained" 
                color="primary"
                sx={{ mt: 2, fontWeight: 'bold' }}
              >
                Learn More About Us
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
} 