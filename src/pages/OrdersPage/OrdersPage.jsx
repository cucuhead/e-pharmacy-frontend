import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOrders } from '@redux/orders/ordersOperations';
import { formatMoney } from '@utils/formatters';

import Input from '@components/common/Input';
import Button from '@components/common/Button';
import StatusBadge from '@components/common/StatusBadge';
import Pagination from '@components/common/Pagination';
import Avatar from '@components/common/Avatar';
import styles from './OrdersPage.module.scss';



const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { items, meta, isLoading, error } = useSelector(
    (state) => state.orders
  );

  // Local state: input değeri ve uygulanan filtre ayrı
  const [searchInput, setSearchInput] = useState('');
  const [appliedName, setAppliedName] = useState('');
  const [page, setPage] = useState(1);

  // appliedName veya page değişince fetch
  useEffect(() => {
    dispatch(fetchOrders({ name: appliedName, page, limit: 5 }));
  }, [dispatch, appliedName, page]);

  const handleFilter = (e) => {
    e.preventDefault();
    setPage(1); // filtre değişince ilk sayfaya dön
    setAppliedName(searchInput);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > meta.totalPages) return;
    setPage(newPage);
  };

  return (
    <div className={styles.page}>
      {/* Filter bar */}
      <div className={styles.toolbar}>
        <form className={styles.filterForm} onSubmit={handleFilter}>
          <div className={styles.filterInput}>
            <Input
              type="text"
              placeholder="User Name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" size="md">
            Filter
          </Button>
        </form>
      </div>

      {/* Table panel */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>All orders</div>

        {isLoading && <div className={styles.loading}>Loading orders...</div>}

        {error && <div className={styles.errorMsg}>{error}</div>}

        {!isLoading && !error && items.length === 0 && (
          <div className={styles.empty}>No orders found</div>
        )}

        {!isLoading && !error && items.length > 0 && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>User Info</th>
                  <th>Address</th>
                  <th>Products</th>
                  <th>Order date</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((order) => (
                  <tr key={order._id}>
                 <td>
  <div className={styles.userCell}>
    <Avatar src={order.photo} name={order.name} />
    <span className={styles.truncate}>{order.name}</span>
  </div>
</td>
                    <td>
                      <span className={styles.truncate}>{order.address}</span>
                    </td>
                    <td>{order.products}</td>
                    <td className={styles.price}>{formatDate(order.orderDate)}</td>
                    <td className={styles.price}>
                      {formatMoney(order.price)}
                    </td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && !error && meta.totalPages > 1 && (
        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default OrdersPage;