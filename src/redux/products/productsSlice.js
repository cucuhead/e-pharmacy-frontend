import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from './productsOperations';

const initialState = {
  items: [],
  meta: { total: 0, page: 1, limit: 5, totalPages: 1 },
  isLoading: false,
  isMutating: false, // create/update/delete sırasında true
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.meta = action.payload.meta;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // CREATE / UPDATE / DELETE — ortak isMutating yönetimi
      .addCase(createProduct.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.isMutating = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.isMutating = false;
      })

      .addCase(updateProduct.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.isMutating = false;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isMutating = false;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isMutating = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isMutating = false;
      });
  },
});

export default productsSlice.reducer;