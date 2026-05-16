import { createSlice } from '@reduxjs/toolkit';
import { fetchOrders } from './ordersOperations';

const initialState = {
  items: [],
  meta: { total: 0, page: 1, limit: 5, totalPages: 1 },
  filters: { name: '' },
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setNameFilter: (state, action) => {
      state.filters.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.meta = action.payload.meta;
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setNameFilter } = ordersSlice.actions;
export default ordersSlice.reducer;