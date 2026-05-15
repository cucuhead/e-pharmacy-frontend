import { Outlet } from 'react-router-dom';
import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';
import styles from './SharedLayout.module.scss';

const SharedLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SharedLayout;