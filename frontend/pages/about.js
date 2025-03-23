import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Divider,
  Paper
} from '@mui/material';
import Layout from '../components/Layout';

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Lead Stylist',
      image: '/images/placeholder-person.svg',
      bio: 'With over 15 years of experience in the beauty industry, Sarah founded Katy Regal Beauty Salon with a vision to provide exceptional services in a welcoming environment.'
    },
    {
      name: 'Michael Chen',
      role: 'Senior Hair Stylist',
      image: '/images/placeholder-person.svg',
      bio: 'Michael specializes in cutting-edge hair designs and color techniques. He has won multiple styling awards and brings international experience to the salon.'
    },
    {
      name: 'Jessica Rodriguez',
      role: 'Nail Art Specialist',
      image: '/images/placeholder-person.svg',
      bio: 'Jessica is known for her intricate nail designs and attention to detail. She stays updated with the latest trends to offer innovative nail services.'
    },
  ];

  return (
    <Layout>
      <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            About Katy Regal
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Your premier destination for beauty and relaxation
          </Typography>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Paper elevation={0} sx={{ p: 4, mb: 6, bgcolor: 'background.paper' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Our Story
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" paragraph>
            Founded in 2015, Katy Regal Beauty Salon began with a simple mission: to provide exceptional beauty services in a welcoming and relaxing environment. What started as a small studio has grown into a full-service beauty destination that our community has come to love and trust.
          </Typography>
          <Typography variant="body1" paragraph>
            Our founder, Sarah Johnson, envisioned a place where clients could not only receive top-quality beauty treatments but also enjoy a rejuvenating experience that leaves them feeling refreshed and confident. This vision continues to guide everything we do.
          </Typography>
          <Typography variant="body1">
            Today, Katy Regal Beauty Salon is proud to offer a comprehensive range of services, from expert hair styling and coloring to luxurious facials, massage therapy, and nail care. Our team of professionals is dedicated to helping you look and feel your best.
          </Typography>
        </Paper>

        {/* Our Mission Section */}
        <Paper elevation={0} sx={{ p: 4, mb: 6, bgcolor: 'background.paper' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Our Mission
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" paragraph>
            At Katy Regal Beauty Salon, our mission is to enhance the natural beauty of our clients through personalized services that nurture both body and spirit. We believe in:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" variant="body1" paragraph>
              <strong>Excellence</strong> - Delivering exceptional results through continuous education and using premium products
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              <strong>Personalization</strong> - Tailoring our services to meet the unique needs and preferences of each client
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              <strong>Wellness</strong> - Promoting overall well-being through our therapeutic treatments and positive atmosphere
            </Typography>
            <Typography component="li" variant="body1">
              <strong>Sustainability</strong> - Using eco-friendly products and practices that are kind to our planet
            </Typography>
          </Box>
        </Paper>

        {/* Meet Our Team Section */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mt: 8, mb: 4 }}>
          Meet Our Team
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="260"
                  image={member.image}
                  alt={member.name}
                  onError={(e) => {
                    e.target.src = '/images/service-placeholder.svg';
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography>
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default About; 