import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectIsAuthenticated, 
  selectIsAdmin, 
  selectAuthStatus,
  restoreAuthState 
} from '../store/authSlice';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * Higher-Order Component for protecting routes that require authentication
 * @param {React.Component} Component - The component to wrap with authentication
 * @param {Object} options - Configuration options
 * @param {boolean} options.requireAuth - Redirect to login if not authenticated
 * @param {boolean} options.requireAdmin - Redirect to home if not admin
 * @param {string} options.redirectTo - Path to redirect to if authentication check fails
 * @returns {React.Component} Protected component
 */
const withAuth = (
  Component,
  { requireAuth = true, requireAdmin = false, redirectTo = '/login' } = {}
) => {
  const ProtectedRoute = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isAdmin = useSelector(selectIsAdmin);
    const authStatus = useSelector(selectAuthStatus);
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [redirectProcess, setRedirectProcess] = useState({
      needed: false,
      triggered: false,
      destination: ''
    });

    // Wait for the component to mount before checking authentication
    // This prevents hydration errors
    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Handle auth check
    useEffect(() => {
      // Skip auth check if not mounted yet (prevents hydration issues)
      if (!isMounted) {
        return;
      }
      
      const checkAuth = async () => {
        try {
          // Restore auth state from localStorage
          if (!authChecked) {
            dispatch(restoreAuthState());
            setAuthChecked(true);
          }
          
          // Wait for auth status to be determined
          if (authStatus === 'loading') {
            return;
          }
          
          // Determine if user should be redirected
          const shouldRedirect = 
            (requireAuth && !isAuthenticated) || 
            (requireAdmin && (!isAuthenticated || !isAdmin));
          
          // Set redirect state if needed but not already triggered
          if (shouldRedirect && !redirectProcess.triggered) {
            setRedirectProcess({
              needed: true,
              triggered: false,
              destination: redirectTo
            });
          }
          
          // Loading is complete regardless of authentication status
          setIsLoading(false);
        } catch (error) {
          console.error('withAuth: Error during auth check', error);
          setIsLoading(false);
          
          if (requireAuth) {
            setRedirectProcess({
              needed: true,
              triggered: false,
              destination: redirectTo
            });
          }
        }
      };
      
      checkAuth();
    }, [isMounted, isAuthenticated, isAdmin, authStatus, authChecked, router.pathname]);

    // Handle redirect if needed
    useEffect(() => {
      if (!isMounted) return;
      
      const handleRedirect = async () => {
        // If redirect is needed but not triggered yet
        if (redirectProcess.needed && !redirectProcess.triggered && !isLoading) {
          // Mark as triggered to prevent multiple redirects
          setRedirectProcess(prev => ({
            ...prev,
            triggered: true
          }));
          
          // Perform the redirect
          try {
            await router.push(redirectProcess.destination);
          } catch (error) {
            console.error('withAuth: Error during redirect', error);
          }
        }
      };
      
      handleRedirect();
    }, [redirectProcess, isLoading, isMounted, router]);

    // Don't render anything during SSR or first client render to prevent hydration errors
    if (!isMounted) {
      return null;
    }

    // Show loading state while checking authentication
    if (isLoading) {
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh' 
          }}
        >
          <CircularProgress color="primary" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Verifying authentication...
          </Typography>
        </Box>
      );
    }

    // If redirect is needed but not triggered yet, show loading
    if (redirectProcess.needed && !redirectProcess.triggered) {
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh' 
          }}
        >
          <CircularProgress color="primary" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Redirecting to {redirectProcess.destination}...
          </Typography>
        </Box>
      );
    }

    // If we get here, either:
    // 1. Authentication is not required, or
    // 2. User is authenticated and allowed to access this route
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    ProtectedRoute.getInitialProps = Component.getInitialProps;
  }

  return ProtectedRoute;
};

export default withAuth; 