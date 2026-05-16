import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { fetchCustomers } from '@redux/customers/customersOperations';
import { formatMoney } from '@utils/formatters';

import Input from '@components/common/Input';
import Button from '@components/common/Button';
import Pagination from '@components/common/Pagination';
import Avatar from '@components/common/Avatar';

import styles from './CustomersPage.module.scss';

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = dayjs(dateStr);
  return d.isValid() ? d.format('MMMM D, YYYY') : '—';
};

const CustomersPage = () => {
  const dispatch = useDispatch();
  const { items, meta, isLoading, error } = useSelector(
    (state) => state.customers
  );

  const [searchInput, setSearchInput] = useState('');
  const [appliedName, setAppliedName] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCustomers({ name: appliedName, page, limit: 5 }));
  }, [dispatch, appliedName, page]);

  const handleFilter = (e) => {
    e.preventDefault();
    setPage(1);
    setAppliedName(searchInput);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > meta.totalPages) return;
    setPage(newPage);
  };

  return (
    <div className={styles.page}>
      {/* Toolbar */}
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
          <Button type="submit" variant="primary">
            Filter
          </Button>
        </form>
      </div>

      {/* Table */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>All customers</div>

        {isLoading && (
          <div className={styles.loading}>Loading customers...</div>
        )}
        {error && <div className={styles.errorMsg}>{error}</div>}
        {!isLoading && !error && items.length === 0 && (
          <div className={styles.empty}>No customers found</div>
        )}

        {!isLoading && !error && items.length > 0 && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Spent</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Register date</th>
                </tr>
              </thead>
              <tbody>
                {items.map((c) => (
                  <tr key={c._id}>
                    <td>
                      <div className={styles.nameCell}>
                        <Avatar name={c.name} />
                        <span className={styles.truncate}>{c.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.truncate}>{c.email}</span>
                    </td>
                    <td className={styles.nowrap}>{formatMoney(c.spent)}</td>
                    <td className={styles.nowrap}>{c.phone}</td>
                    <td>
                      <span className={styles.truncate}>{c.address}</span>
                    </td>
                    <td className={styles.nowrap}>
                      {formatDate(c.registerDate)}
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

export default CustomersPage;