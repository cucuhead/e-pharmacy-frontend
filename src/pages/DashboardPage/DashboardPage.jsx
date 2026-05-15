import { useAuth } from '@hooks/useAuth';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>
        Dashboard (placeholder)
      </h1>
      <p style={{ color: '#898989' }}>
        Welcome, <strong>{user?.name}</strong>
      </p>
      <p style={{ color: '#898989', fontSize: '14px', marginTop: '24px' }}>
        Real dashboard UI (3 cards + 2 tables) coming next.
      </p>
    </div>
  );
};

export default DashboardPage;