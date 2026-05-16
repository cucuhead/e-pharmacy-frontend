import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

// GET /api/customers?name=...&page=...&limit=...
export const fetchCustomers = createAsyncThunk(
  'customers/fetch',
  async ({ name = '', page = 1, limit = 5 } = {}, { rejectWithValue }) => {
    try {
      const params = { page, limit };
      if (name.trim()) params.name = name.trim();

      const { data } = await api.get('/customers', { params });
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to load customers';
      return rejectWithValue(message);
    }
  }
);