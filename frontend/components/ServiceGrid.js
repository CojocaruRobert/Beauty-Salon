import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../store/servicesSlice';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Chip, CircularProgress, Container, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const ServiceGrid = () => {
  const dispatch = useDispatch();
  const { services, status, error } = useSelector((state) => state.services);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch services when component mounts
    dispatch(fetchServices());
  }, [dispatch]);

  // Extract unique categories when services load
  useEffect(() => {
    if (services.length > 0) {
      const uniqueCategories = [...new Set(services.map(service => service.category))];
      setCategories(uniqueCategories);
    }
  }, [services]);

  // Filter services by selected category
  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box sx={{ textAlign: 'center', color: 'error.main', p: 3 }}>
        <Typography variant="h6">Failed to load services</Typography>
        <Typography variant="body2">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Category filter */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Services grid */}
      <Grid container spacing={4}>
        {filteredServices.map((service) => (
          <Grid item key={service._id} xs={12} sm={6} md={4}>
            <Link href={`/services/${service._id}`} passHref style={{ textDecoration: 'none' }}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={service.image || '/images/service-placeholder.svg'}
                  alt={service.name}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {service.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {service.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AttachMoneyIcon color="primary" sx={{ mr: 0.5 }} />
                      <Typography variant="subtitle1" fontWeight="bold">${service.price}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon color="primary" sx={{ mr: 0.5 }} />
                      <Typography variant="subtitle2">{service.duration} mins</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Empty state */}
      {filteredServices.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6">No services found in this category</Typography>
        </Box>
      )}
    </Container>
  );
};

export default ServiceGrid; 