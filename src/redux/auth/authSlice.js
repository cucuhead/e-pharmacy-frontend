import { createSlice } from '@reduxjs/toolkit';
import { login, logout, fetchUserInfo } from './authOperations';
import { getAccessToken } from '@services/axios';

const initialState = {
  user: null,
  token: getAccessToken(),
  isAuthenticated: !!getAccessToken(),
  isLoading: false,
  isRefreshing: false, // app boot sırasında user fetch ediliyor mu
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })

      // FETCH USER INFO (on app boot)
      .addCase(fetchUserInfo.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isRefreshing = false;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isRefreshing = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;