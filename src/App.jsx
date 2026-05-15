import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchUserInfo } from '@redux/auth/authOperations';
import { getAccessToken } from '@services/axios';

import PrivateRoute from '@components/route/PrivateRoute';
import PublicRoute from '@components/route/PublicRoute';

import LoginPage from '@pages/LoginPage/LoginPage';
import DashboardPage from '@pages/DashboardPage/DashboardPage';

function App() {
  const dispatch = useDispatch();

  // App boot sırasında token varsa user bilgisini çek
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

      {/* Private */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      {/* Default redirect: kullanıcı root'a giderse home'a yönlendir */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Catch-all: bilinmeyen URL'ler home'a */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;