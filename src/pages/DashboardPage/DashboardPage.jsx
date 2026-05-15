import { useDispatch } from 'react-redux';
import { logout } from '@redux/auth/authOperations';
import { useAuth } from '@hooks/useAuth';
import Button from '@components/common/Button';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '40px auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>
        Dashboard (placeholder)
      </h1>
      <p style={{ marginBottom: '8px' }}>
        Welcome, <strong>{user?.name || 'Loading...'}</strong>
      </p>
      <p style={{ marginBottom: '24px', color: '#898989' }}>{user?.email}</p>
      <Button onClick={handleLogout} variant="danger">
        Logout
      </Button>
    </div>
  );
};

export default DashboardPage;