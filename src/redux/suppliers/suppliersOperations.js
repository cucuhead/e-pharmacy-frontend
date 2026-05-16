import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

// GET /api/suppliers?name=...&page=...&limit=...
export const fetchSuppliers = createAsyncThunk(
  'suppliers/fetch',
  async ({ name = '', page = 1, limit = 5 } = {}, { rejectWithValue }) => {
    try {
      const params = { page, limit };
      if (name.trim()) params.name = name.trim();

      const { data } = await api.get('/suppliers', { params });
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to load suppliers';
      return rejectWithValue(message);
    }
  }
);

// POST /api/suppliers
export const createSupplier = createAsyncThunk(
  'suppliers/create',
  async (supplierData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/suppliers', supplierData);
      return data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to create supplier';
      return rejectWithValue(message);
    }
  }
);

// PUT /api/suppliers/:id
export const updateSupplier = createAsyncThunk(
  'suppliers/update',
  async ({ id, ...supplierData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/suppliers/${id}`, supplierData);
      return data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to update supplier';
      return rejectWithValue(message);
    }
  }
);