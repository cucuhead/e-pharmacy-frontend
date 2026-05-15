import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

const PublicRoute = ({ children, redirectTo = '/home' }) => {
  const { isAuthenticated, isRefreshing } = useAuth();

  if (isRefreshing) {
    return null;
  }

  // Zaten login olmuş kullanıcı login sayfasını görmemeli
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default PublicRoute;