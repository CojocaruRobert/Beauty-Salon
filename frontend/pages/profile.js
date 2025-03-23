import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, Avatar, TextField, Button, Snackbar, Alert, Divider, CircularProgress } from '@mui/material';
import Layout from '../components/Layout';
import withAuth from '../utils/withAuth';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectAuthStatus, selectIsAuthenticated, restoreAuthState, selectLastAction } from '../store/authSlice';

// ClientOnly component to prevent hydration errors
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  if (!hasMounted) {
    return null;
  }
  
  return <>{children}</>;
};

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const authStatus = useSelector(selectAuthStatus);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const lastAction = useSelector(selectLastAction);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Initialize form data with user data when available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Ensure auth state is up to date
      dispatch(restoreAuthState());
      
      // Mark initial load as complete after a short delay
      setTimeout(() => {
        setIsInitialLoad(false);
      }, 500);
    }
  }, [dispatch]);
  
  // Update form when user data changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // In a real implementation, this would call an API endpoint
    setSnackbar({
      open: true,
      message: 'Profile updated successfully!',
      severity: 'success',
    });
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'Passwords do not match!',
        severity: 'error',
      });
      return;
    }

    // In a real implementation, this would call an API endpoint
    setSnackbar({
      open: true,
      message: 'Password updated successfully!',
      severity: 'success',
    });
    
    // Reset password fields
    setFormData((prev) => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };
  
  // Show loading state during initial load
  if (isInitialLoad && typeof window !== 'undefined') {
    return (
      <Layout title="Loading Profile | Katy Regal Beauty Salon">
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '70vh' 
          }}
        >
          <CircularProgress color="primary" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading your profile...
          </Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout title="My Profile | Katy Regal Beauty Salon">
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        
        <ClientOnly>
          {authStatus === 'loading' ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : !user ? (
            <Alert severity="warning" sx={{ my: 2 }}>
              Profile data could not be loaded. Please try logging in again.
            </Alert>
          ) : (
            <>
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        bgcolor: 'primary.main',
                        fontSize: '2rem',
                        mr: 3 
                      }}
                    >
                      {user?.name?.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h5">{user?.name}</Typography>
                      <Typography variant="body1" color="text.secondary">
                        {user?.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Update Profile
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                      
                      <form onSubmit={handleProfileUpdate}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              disabled
                              helperText="Email cannot be changed"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              fullWidth
                            >
                              Update Profile
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Change Password
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                      
                      <form onSubmit={handlePasswordUpdate}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Current Password"
                              name="currentPassword"
                              type="password"
                              value={formData.currentPassword}
                              onChange={handleChange}
                              required
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="New Password"
                              name="newPassword"
                              type="password"
                              value={formData.newPassword}
                              onChange={handleChange}
                              required
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Confirm New Password"
                              name="confirmPassword"
                              type="password"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              fullWidth
                            >
                              Change Password
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Account Settings
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Button variant="outlined" color="error">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </ClientOnly>
      </Container>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

// Export the component with authentication protection
export default withAuth(Profile, { 
  requireAuth: true,
  redirectTo: '/login'
}); 