import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchUserInfo } from '@redux/auth/authOperations';
import { getAccessToken } from '@services/axios';

import PrivateRoute from '@components/route/PrivateRoute';
import PublicRoute from '@components/route/PublicRoute';
import SharedLayout from '@components/layout/SharedLayout';

import LoginPage from '@pages/LoginPage/LoginPage';
import DashboardPage from '@pages/DashboardPage/DashboardPage';
import OrdersPage from '@pages/OrdersPage/OrdersPage';
import ProductsPage from '@pages/ProductsPage/ProductsPage';
import SuppliersPage from '@pages/SuppliersPage/SuppliersPage';
import CustomersPage from '@pages/CustomersPage/CustomersPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (getAccessToken()) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* Public */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Private — hepsi SharedLayout içinde */}
      <Route
        element={
          <PrivateRoute>
            <SharedLayout />
          </PrivateRoute>
        }
      >
        <Route path="/home" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/customers" element={<CustomersPage />} />
      </Route>

      {/* Defaults */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;