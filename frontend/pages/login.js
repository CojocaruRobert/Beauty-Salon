import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectAuthStatus, selectAuthError, selectIsAuthenticated, clearError, restoreAuthState } from '../store/authSlice';
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
  InputAdornment,
  IconButton
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
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

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [redirectTriggered, setRedirectTriggered] = useState(false);
  
  const dispatch = useDispatch();
  const router = useRouter();
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  
  // Restore auth state and redirect if already authenticated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(restoreAuthState());
      
      // Clear any previous errors when component mounts
      dispatch(clearError());
    }
  }, [dispatch]);
  
  // Handle successful login and redirect
  useEffect(() => {
    if (isLoggingIn && authStatus === 'succeeded' && isAuthenticated && user && !redirectTriggered) {
      setRedirectTriggered(true);
      
      // Add a small delay to ensure state is properly updated
      setTimeout(() => {
        try {
          router.push('/profile');
        } catch (err) {
          console.error('Error during redirect:', err);
        }
      }, 500);
    }
  }, [authStatus, isAuthenticated, user, router, isLoggingIn, redirectTriggered]);
  
  // Handle already authenticated user
  useEffect(() => {
    if (!isLoggingIn && isAuthenticated && user && !redirectTriggered) {
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
  }, [isAuthenticated, user, router, isLoggingIn, redirectTriggered]);
  
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
  
  const validateForm = () => {
    const errors = {};
    
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
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoggingIn(true);
      setRedirectTriggered(false); // Reset redirect flag on new login attempt
      dispatch(login(formData));
    }
  };
  
  return (
    <Layout title="Login | Katy Regal Beauty Salon">
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
              Sign In
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
              Welcome back! Please enter your details below.
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
                id="password"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
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
              
              <Box sx={{ textAlign: 'right', mt: 1, mb: 3 }}>
                <Link href="/forgot-password" passHref>
                  <Typography 
                    component="a" 
                    variant="body2" 
                    color="primary" 
                    sx={{ textDecoration: 'none', fontWeight: 'medium' }}
                  >
                    Forgot password?
                  </Typography>
                </Link>
              </Box>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={authStatus === 'loading'}
                sx={{ 
                  py: 1.5,
                  mb: 3,
                  borderRadius: 1,
                }}
              >
                {authStatus === 'loading' ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign In'
                )}
              </Button>
              
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link href="/register" passHref>
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
                      Sign up
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </form>
          </Box>
          
          <Box sx={{ bgcolor: 'grey.50', p: 3, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary" align="center" display="block">
              By signing in, you agree to our{' '}
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