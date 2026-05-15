import { createAsyncThunk } from '@reduxjs/toolkit';
import api, {
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from '@services/axios';

// POST /api/user/login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/user/login', { email, password });
      const { accessToken, refreshToken, user } = data.data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      return { user, accessToken };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed. Please try again.';
      return rejectWithValue(message);
    }
  }
);

// GET /api/user/logout
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await api.get('/user/logout');
    } catch (error) {
      // Logout failure shouldn't block UI — clear locally anyway
      console.warn('Logout API call failed, clearing local tokens:', error.message);
    } finally {
      clearTokens();
    }
    return null;
  }
);

// GET /api/user/user-info (called on app boot if token exists)
export const fetchUserInfo = createAsyncThunk(
  'auth/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/user/user-info');
      return data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch user info';
      return rejectWithValue(message);
    }
  }
);