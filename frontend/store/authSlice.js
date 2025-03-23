import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function to safely access localStorage
const safeLocalStorage = {
  getItem: (key) => {
    try {
      if (typeof window === 'undefined') return null;
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  },
  removeItem: (key) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  }
};

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Registration failed');
      }

      if (!data.success) {
        return rejectWithValue(data.message || 'Registration failed');
      }
      
      // Check for token in the correct location (inside data.data)
      if (data.data && data.data.token) {
        try {
          // Clear any existing values first to prevent conflicts
          safeLocalStorage.removeItem('token');
          safeLocalStorage.removeItem('user');
          
          // Set new values using token from data.data
          safeLocalStorage.setItem('token', data.data.token);
          
          // Store user data without the token to avoid duplication
          const { token, ...userData } = data.data;
          safeLocalStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      } else {
        console.error('Register: No token received from server');
      }
      
      return data.data;
    } catch (error) {
      console.error('Registration error:', error);
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      if (!data.success) {
        return rejectWithValue(data.message || 'Login failed');
      }
      
      // Check for token in the correct location (inside data.data)
      if (data.data && data.data.token) {
        try {
          // Clear any existing values first to prevent conflicts
          safeLocalStorage.removeItem('token');
          safeLocalStorage.removeItem('user');
          
          // Set new values using token from data.data
          safeLocalStorage.setItem('token', data.data.token);
          
          // Store user data without the token to avoid duplication
          const { token, ...userData } = data.data;
          safeLocalStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      } else {
        console.error('Login: No token received from server');
        return rejectWithValue('No authentication token received');
      }
      
      return data.data;
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

// Check authentication state (for page refreshes)
export const checkAuthState = createAsyncThunk(
  'auth/checkState',
  async (_, { rejectWithValue }) => {
    try {
      if (typeof window === 'undefined') {
        return null; // Running on server
      }

      const token = safeLocalStorage.getItem('token');
      const userStr = safeLocalStorage.getItem('user');
      
      if (!token || !userStr) {
        return null;
      }
      
      let user;
      try {
        user = JSON.parse(userStr);
      } catch (error) {
        console.error('checkAuthState: Error parsing user from localStorage:', error);
        // Clear invalid data
        safeLocalStorage.removeItem('user');
        safeLocalStorage.removeItem('token');
        return null;
      }
      
      return user;
    } catch (error) {
      console.error('Auth state check error:', error);
      return rejectWithValue(error.message || 'Failed to restore session');
    }
  }
);

// Check if user is already logged in (from localStorage)
const getUserFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const user = safeLocalStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error('Error getting user from storage:', e);
      return null;
    }
  }
  return null;
};

const getTokenFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      return safeLocalStorage.getItem('token');
    } catch (e) {
      console.error('Error getting token from storage:', e);
      return null;
    }
  }
  return null;
};

// Initial state - IMPORTANT: must be the same on server and client initially to prevent hydration errors
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  lastAction: null,
  lastActionTime: null
};

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      if (typeof window !== 'undefined') {
        try {
          safeLocalStorage.removeItem('token');
          safeLocalStorage.removeItem('user');
        } catch (error) {
          console.error('Error clearing localStorage:', error);
        }
      }
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.lastAction = 'logout';
      state.lastActionTime = new Date().toISOString();
    },
    clearError: (state) => {
      state.error = null;
    },
    restoreAuthState: (state) => {
      if (typeof window === 'undefined') {
        return;
      }

      try {
        const token = safeLocalStorage.getItem('token');
        const userStr = safeLocalStorage.getItem('user');
        
        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);
            
            state.token = token;
            state.user = user;
            state.isAuthenticated = true;
            state.status = 'succeeded';
            state.lastAction = 'restore';
            state.lastActionTime = new Date().toISOString();
          } catch (parseError) {
            console.error('RestoreAuthState: Error parsing user JSON', parseError);
            safeLocalStorage.removeItem('user');
            safeLocalStorage.removeItem('token');
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.status = 'idle';
            state.lastAction = 'restore_failed';
            state.lastActionTime = new Date().toISOString();
          }
        } else {
          // If we're here, we need to reset the state to ensure consistency
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          state.status = 'idle';
          state.lastAction = 'restore_empty';
          state.lastActionTime = new Date().toISOString();
        }
      } catch (error) {
        console.error('RestoreAuthState: Error restoring auth state', error);
        // If there's an error, reset the state to be safe
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.lastAction = 'restore_error';
        state.lastActionTime = new Date().toISOString();
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle register
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.lastAction = 'register_pending';
        state.lastActionTime = new Date().toISOString();
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = getTokenFromStorage();
        state.lastAction = 'register_fulfilled';
        state.lastActionTime = new Date().toISOString();
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Registration failed';
        state.lastAction = 'register_rejected';
        state.lastActionTime = new Date().toISOString();
      })
      
      // Handle login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.lastAction = 'login_pending';
        state.lastActionTime = new Date().toISOString();
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = getTokenFromStorage();
        state.lastAction = 'login_fulfilled';
        state.lastActionTime = new Date().toISOString();
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
        state.lastAction = 'login_rejected';
        state.lastActionTime = new Date().toISOString();
      })
      
      // Handle check auth state
      .addCase(checkAuthState.pending, (state) => {
        state.status = 'loading';
        state.lastAction = 'checkState_pending';
        state.lastActionTime = new Date().toISOString();
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.token = getTokenFromStorage();
          state.isAuthenticated = true;
          state.status = 'succeeded';
          state.lastAction = 'checkState_fulfilled';
          state.lastActionTime = new Date().toISOString();
        } else {
          // No valid auth state found
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          state.status = 'idle';
          state.lastAction = 'checkState_empty';
          state.lastActionTime = new Date().toISOString();
        }
      })
      .addCase(checkAuthState.rejected, (state, action) => {
        console.error('checkAuthState.rejected:', action.error);
        state.status = 'failed';
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.lastAction = 'checkState_rejected';
        state.lastActionTime = new Date().toISOString();
      });
  },
});

export const { logout, clearError, restoreAuthState } = authSlice.actions;

// Export selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';
export const selectLastAction = (state) => ({ 
  action: state.auth.lastAction, 
  time: state.auth.lastActionTime 
});

export default authSlice.reducer; 