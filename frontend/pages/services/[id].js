import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceById, selectSelectedService, selectServiceStatus, selectServiceError } from '../../store/servicesSlice';
import Layout from '../../components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import { Container, Typography, Box, Button, Grid, Chip, Paper, Divider, CircularProgress } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';

const ServiceDetailPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  
  const service = useSelector(selectSelectedService);
  const status = useSelector(selectServiceStatus);
  const error = useSelector(selectServiceError);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchServiceById(id));
    }
  }, [id, dispatch]);
  
  if (status === 'loading') {
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }
  
  if (status === 'failed') {
    return (
      <Layout>
        <Box sx={{ textAlign: 'center', color: 'error.main', p: 5 }}>
          <Typography variant="h5" component="h1" gutterBottom>Error Loading Service</Typography>
          <Typography variant="body1">{error}</Typography>
          <Button 
            component={Link} 
            href="/services" 
            variant="contained" 
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 3 }}
          >
            Back to Services
          </Button>
        </Box>
      </Layout>
    );
  }
  
  if (!service) {
    return (
      <Layout>
        <Box sx={{ textAlign: 'center', p: 5 }}>
          <Typography variant="h5" component="h1" gutterBottom>Service Not Found</Typography>
          <Button 
            component={Link} 
            href="/services" 
            variant="contained" 
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 3 }}
          >
            Back to Services
          </Button>
        </Box>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Head>
        <title>{service.name} | Katy Regal Beauty Salon</title>
        <meta name="description" content={service.description} />
      </Head>
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Button 
          component={Link} 
          href="/services" 
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 4 }}
        >
          Back to Services
        </Button>
        
        <Grid container spacing={4}>
          {/* Service Image */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                position: 'relative', 
                height: { xs: '300px', md: '450px' },
                overflow: 'hidden',
                borderRadius: 2
              }}
            >
              <Image
                src={service.image || '/images/service-placeholder.svg'}
                alt={service.name}
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
              <Chip
                label={service.category}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  py: 0.5,
                }}
              />
            </Paper>
          </Grid>
          
          {/* Service Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {service.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 3 }}>
              <AttachMoneyIcon color="primary" sx={{ fontSize: '2rem', mr: 1 }} />
              <Typography variant="h4" component="span" fontWeight="bold">
                ${service.price}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" component="span">
                {service.duration} minutes
              </Typography>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Description
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              {service.description}
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              fullWidth
              sx={{ 
                mt: 2, 
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: 2
              }}
            >
              Book Now
            </Button>
          </Grid>
        </Grid>
        
        {/* Additional Information Section */}
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            What to Expect
          </Typography>
          <Typography variant="body1" paragraph>
            Our {service.name} service is designed to provide you with a luxurious and rejuvenating experience. Our professional stylists use only premium products to ensure the best results.
          </Typography>
          <Typography variant="body1">
            Please arrive 15 minutes before your appointment time. If you need to cancel or reschedule, please do so at least 24 hours in advance.
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default ServiceDetailPage; 