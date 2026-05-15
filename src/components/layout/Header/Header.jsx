import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { logout } from '@redux/auth/authOperations';
import { useAuth } from '@hooks/useAuth';

import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await dispatch(logout());
    toast.info('Logged out');
    navigate('/login', { replace: true });
  };

  // Şartname: Logo tıklanınca login değilse /login, login ise /home
  const logoTarget = isAuthenticated ? '/home' : '/login';

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Link to={logoTarget} className={styles.logoLink} aria-label="E-Pharmacy home">
          <span className={styles.logoMark} aria-hidden="true" />
        </Link>

        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Medicine store</h1>
          <div className={styles.subtitle}>
            <Link to="/dashboard" className={styles.subtitleLink}>
              Dashboard
            </Link>
            <span className={styles.divider}>|</span>
            <span className={styles.email}>{user?.email || 'vendor@gmail.com'}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={styles.logoutBtn}
        onClick={handleLogout}
        aria-label="Logout"
      >
        Out
      </button>
    </header>
  );
};

export default Header;