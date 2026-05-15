import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

// GET /api/dashboard
export const fetchDashboard = createAsyncThunk(
  'dashboard/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/dashboard');
      return data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to load dashboard';
      return rejectWithValue(message);
    }
  }
);