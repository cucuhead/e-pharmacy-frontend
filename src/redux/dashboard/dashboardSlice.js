import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboard } from './dashboardOperations';

const initialState = {
  stats: {
    allProducts: 0,
    allSuppliers: 0,
    allCustomers: 0,
  },
  recentCustomers: [],
  incomeExpenses: [],
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.stats = action.payload.stats;
        state.recentCustomers = action.payload.recentCustomers;
        state.incomeExpenses = action.payload.incomeExpenses;
        state.isLoading = false;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;