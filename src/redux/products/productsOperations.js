import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/axios';

// GET /api/products?name=...&page=...&limit=...
export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async ({ name = '', page = 1, limit = 5 } = {}, { rejectWithValue }) => {
    try {
      const params = { page, limit };
      if (name.trim()) params.name = name.trim();

      const { data } = await api.get('/products', { params });
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to load products';
      return rejectWithValue(message);
    }
  }
);

// POST /api/products
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/products', productData);
      return data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to create product';
      return rejectWithValue(message);
    }
  }
);

// PUT /api/products/:id
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, ...productData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/products/${id}`, productData);
      return data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to update product';
      return rejectWithValue(message);
    }
  }
);

// DELETE /api/products/:id
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`);
      return id;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to delete product';
      return rejectWithValue(message);
    }
  }
);