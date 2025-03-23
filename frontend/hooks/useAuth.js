import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { 
  selectUser, 
  selectIsAuthenticated, 
  selectIsAdmin, 
  selectAuthStatus, 
  selectAuthError,
  restoreAuthState,
  logout
} from '../store/authSlice';

/**
 * Custom hook for handling authentication state and methods
 * @param {Object} options - Configuration options
 * @param {boolean} options.requireAuth - Redirect to login if not authenticated
 * @param {boolean} options.requireAdmin - Redirect to home if not admin
 * @param {string} options.redirectTo - Path to redirect to if authentication check fails
 * @returns {Object} Authentication state and methods
 */
export const useAuth = (options = {}) => {
  const { 
    requireAuth = false, 
    requireAdmin = false,
    redirectTo = '/login'
  } = options;
  
  const dispatch = useDispatch();
  const router = useRouter();
  
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  
  // Ensure auth state is loaded from localStorage on mount
  useEffect(() => {
    dispatch(restoreAuthState());
  }, [dispatch]);
  
  // Handle protection logic
  useEffect(() => {
    // Don't run on server-side
    if (typeof window === 'undefined') return;
    
    // Wait until we've checked auth state
    if (status === 'loading') return;
    
    const shouldRedirect = 
      (requireAuth && !isAuthenticated) || 
      (requireAdmin && !isAdmin);
    
    if (shouldRedirect) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isAdmin, requireAuth, requireAdmin, redirectTo, router, status]);
  
  // Logout and redirect
  const handleLogout = (redirectPath = '/') => {
    dispatch(logout());
    router.push(redirectPath);
  };
  
  return {
    user,
    isAuthenticated,
    isAdmin,
    status,
    error,
    logout: handleLogout,
  };
};

export default useAuth; 