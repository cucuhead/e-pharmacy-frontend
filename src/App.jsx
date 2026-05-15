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

// Geçici placeholder sayfalar (Day 8-9'da gerçek içerik gelecek)
const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '40px' }}>
    <h1 style={{ fontSize: '32px' }}>{title} (placeholder)</h1>
    <p style={{ color: '#898989' }}>Coming soon — Day 8/9.</p>
  </div>
);

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
        <Route path="/orders" element={<PlaceholderPage title="Orders" />} />
        <Route path="/products" element={<PlaceholderPage title="Products" />} />
        <Route path="/suppliers" element={<PlaceholderPage title="Suppliers" />} />
        <Route path="/customers" element={<PlaceholderPage title="Customers" />} />
      </Route>

      {/* Defaults */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;