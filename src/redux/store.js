import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import dashboardReducer from './dashboard/dashboardSlice';
import ordersReducer from './orders/ordersSlice';
import productsReducer from './products/productsSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
      orders: ordersReducer,
       products: productsReducer,
  },
});