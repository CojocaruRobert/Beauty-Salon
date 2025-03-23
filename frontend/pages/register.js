import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { register, selectAuthStatus, selectAuthError, selectIsAuthenticated, clearError, restoreAuthState } from '../store/authSlice';
import Layout from '../components/Layout';
import Link from 'next/link';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress, 
  Alert, 
  Paper,
  Divider,
  Grid,
  InputAdornment,
  IconButton
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [redirectTriggered, setRedirectTriggered] = useState(false);
  
  const dispatch = useDispatch();
  const router = useRouter();
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  // Debug authentication state
  useEffect(() => {
    console.log('Register page - Auth state changes:');
    console.log('- isAuthenticated:', isAuthenticated);
    console.log('- authStatus:', authStatus);
    console.log('- user:', user ? user.name : 'null');
    console.log('- token exists:', !!token);
    console.log('- isRegistering:', isRegistering);
    console.log('- redirectTriggered:', redirectTriggered);
  }, [isAuthenticated, authStatus, user, token, isRegistering, redirectTriggered]);
  
  // Restore auth state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Register page: Restoring auth state');
      dispatch(restoreAuthState());
      
      // Clear any previous errors when component mounts
      dispatch(clearError());
    }
  }, [dispatch]);
  
  // Handle successful registration
  useEffect(() => {
    if (isRegistering && authStatus === 'succeeded' && isAuthenticated && user && !redirectTriggered) {
      setRedirectTriggered(true);
      
      // Add a small delay to ensure state is properly updated
      setTimeout(() => {
        try {
          router.push('/profile');
        } catch (err) {
          console.error('Error during redirect after registration:', err);
        }
      }, 500);
    }
  }, [authStatus, isAuthenticated, user, router, isRegistering, redirectTriggered]);
  
  // Handle already authenticated user
  useEffect(() => {
    if (!isRegistering && isAuthenticated && user && !redirectTriggered) {
      setRedirectTriggered(true);
      
      // Add a small delay to ensure state is properly updated
      setTimeout(() => {
        try {
          router.push('/profile');
        } catch (err) {
          console.error('Error during redirect for already authenticated user:', err);
        }
      }, 500);
    }
  }, [isAuthenticated, user, router, isRegistering, redirectTriggered]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear field error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.passwordConfirm) {
      errors.passwordConfirm = 'Please confirm your password';
    } else if (formData.password !== formData.passwordConfirm) {
      errors.passwordConfirm = 'Passwords do not match';
    }
    
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone number must be 10 digits';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsRegistering(true);
      setRedirectTriggered(false); // Reset redirect flag on new registration attempt
      // Remove passwordConfirm before sending to API
      const { passwordConfirm, ...userData } = formData;
      dispatch(register(userData));
    }
  };
  
  return (
    <Layout title="Register | Katy Regal Beauty Salon">
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Box 
            sx={{ 
              p: 4, 
              display: 'flex', 
              flexDirection: 'column' 
            }}
          >
            <Typography variant="h4" component="h1" align="center" gutterBottom fontWeight="bold">
              Create an Account
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
              Join us for special offers and promotions
            </Typography>
            
            <ClientOnly>
              {authError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {authError}
                </Alert>
              )}
            </ClientOnly>
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone Number (optional)"
                value={formData.phone}
                onChange={handleChange}
                error={!!formErrors.phone}
                helperText={formErrors.phone || "For appointment reminders and updates"}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!formErrors.password}
                helperText={formErrors.password || "Minimum 6 characters"}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                fullWidth
                id="passwordConfirm"
                name="passwordConfirm"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.passwordConfirm}
                onChange={handleChange}
                error={!!formErrors.passwordConfirm}
                helperText={formErrors.passwordConfirm}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={authStatus === 'loading'}
                sx={{ 
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 1,
                }}
              >
                {authStatus === 'loading' ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Create Account'
                )}
              </Button>
              
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link href="/login" passHref>
                    <Typography 
                      component="a" 
                      variant="body2" 
                      color="primary" 
                      sx={{ 
                        textDecoration: 'none', 
                        fontWeight: 'bold',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Sign in
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </form>
          </Box>
          
          <Box sx={{ bgcolor: 'grey.50', p: 3, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary" align="center" display="block">
              By creating an account, you agree to our{' '}
              <Link href="/terms" passHref>
                <Typography 
                  component="a" 
                  variant="caption" 
                  color="primary"
                  sx={{ textDecoration: 'none' }}
                >
                  Terms of Service
                </Typography>
              </Link>
              {' '}and{' '}
              <Link href="/privacy" passHref>
                <Typography 
                  component="a" 
                  variant="caption" 
                  color="primary"
                  sx={{ textDecoration: 'none' }}
                >
                  Privacy Policy
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
} 