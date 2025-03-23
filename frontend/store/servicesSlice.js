import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Async thunk to fetch all services
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/services`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch services');
      }
      
      const data = await response.json();
      if (!data.success) {
        return rejectWithValue(data.message || 'Failed to fetch services');
      }
      
      return data.data; // Our API returns data in a 'data' property
    } catch (error) {
      console.error('Service fetch error:', error);
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

// Async thunk to fetch a single service
export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/services/${id}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch service');
      }
      
      const data = await response.json();
      if (!data.success) {
        return rejectWithValue(data.message || 'Failed to fetch service');
      }
      
      return data.data; // Our API returns data in a 'data' property
    } catch (error) {
      console.error('Service detail fetch error:', error);
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

// Initial state
const initialState = {
  services: [],
  selectedService: null,
  categories: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// Create slice
const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    // Any additional reducers if needed
    clearSelectedService: (state) => {
      state.selectedService = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchServices
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.services = action.payload;
        
        // Extract unique categories
        const uniqueCategories = [...new Set(action.payload.map(service => service.category))];
        state.categories = uniqueCategories;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch services';
      })
      
      // Handle fetchServiceById
      .addCase(fetchServiceById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedService = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch service';
      });
  }
});

// Export actions
export const { clearSelectedService } = servicesSlice.actions;

// Export selectors
export const selectAllServices = (state) => state.services.services;
export const selectServiceById = (state) => state.services.selectedService;
export const selectServiceCategories = (state) => state.services.categories;
export const selectServicesStatus = (state) => state.services.status;
export const selectServicesError = (state) => state.services.error;
export const selectServicesByCategory = (state, category) => 
  state.services.services.filter(service => service.category === category);

export default servicesSlice.reducer; 