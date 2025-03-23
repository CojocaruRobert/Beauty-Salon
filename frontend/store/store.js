import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './servicesSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    auth: authReducer,
  },
}); 