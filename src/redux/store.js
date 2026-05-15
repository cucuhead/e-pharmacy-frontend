import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // Day 3+ slice'lar eklendiğinde buraya: products, customers, vs.
});