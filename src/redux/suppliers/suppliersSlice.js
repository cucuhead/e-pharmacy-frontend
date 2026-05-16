import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSuppliers,
  createSupplier,
  updateSupplier,
} from './suppliersOperations';

const initialState = {
  items: [],
  meta: { total: 0, page: 1, limit: 5, totalPages: 1 },
  isLoading: false,
  isMutating: false,
  error: null,
};

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.meta = action.payload.meta;
        state.isLoading = false;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createSupplier.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(createSupplier.fulfilled, (state) => {
        state.isMutating = false;
      })
      .addCase(createSupplier.rejected, (state) => {
        state.isMutating = false;
      })

      .addCase(updateSupplier.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(updateSupplier.fulfilled, (state) => {
        state.isMutating = false;
      })
      .addCase(updateSupplier.rejected, (state) => {
        state.isMutating = false;
      });
  },
});

export default suppliersSlice.reducer;