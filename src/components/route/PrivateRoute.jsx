import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isRefreshing } = useAuth();
  const location = useLocation();

  // App boot sırasında user fetch ediliyorsa — bekle, redirect yapma
  if (isRefreshing) {
    return null; // sonra loading spinner ekleyeceğiz
  }

  if (!isAuthenticated) {
    // Mevcut konumu state'e koyuyoruz, login sonrası geri dönülebilsin
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;