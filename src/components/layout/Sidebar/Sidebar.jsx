import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', mark: 'D' },
  { to: '/orders', label: 'Orders', mark: 'O' },
  { to: '/products', label: 'Products', mark: 'P' },
  { to: '/suppliers', label: 'Suppliers', mark: 'S' },
  { to: '/customers', label: 'Customers', mark: 'C' },
];

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            title={item.label}
            aria-label={item.label}
            className={({ isActive }) =>
              clsx(styles.navItem, isActive && styles.active)
            }
          >
            {item.mark}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;