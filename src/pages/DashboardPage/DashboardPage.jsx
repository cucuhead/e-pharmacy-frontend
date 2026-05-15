import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDashboard } from '@redux/dashboard/dashboardOperations';
import StatCard from '@components/dashboard/StatCard';
import RecentCustomers from '@components/dashboard/RecentCustomers';
import IncomeExpenses from '@components/dashboard/IncomeExpenses';

import styles from './DashboardPage.module.scss';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { stats, recentCustomers, incomeExpenses, isLoading, error } =
    useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  if (isLoading && !stats.allProducts) {
    return <div className={styles.loading}>Loading dashboard...</div>;
  }

  if (error) {
    return <div className={styles.errorMsg}>{error}</div>;
  }

  return (
    <div className={styles.page}>
      <section className={styles.stats}>
        <StatCard label="All products" value={stats.allProducts} mark="P" active />
        <StatCard label="All suppliers" value={stats.allSuppliers} mark="S" />
        <StatCard label="All customers" value={stats.allCustomers} mark="C" />
      </section>

      <section className={styles.tables}>
        <RecentCustomers customers={recentCustomers} />
        <IncomeExpenses items={incomeExpenses} />
      </section>
    </div>
  );
};

export default DashboardPage;