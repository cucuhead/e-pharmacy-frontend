import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

import {
  fetchSuppliers,
  createSupplier,
  updateSupplier,
} from '@redux/suppliers/suppliersOperations';
import { formatMoney } from '@utils/formatters';

import Input from '@components/common/Input';
import Button from '@components/common/Button';
import Pagination from '@components/common/Pagination';
import SupplierFormModal from '@components/suppliers/SupplierFormModal';

import styles from './SuppliersPage.module.scss';

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = dayjs(dateStr);
  return d.isValid() ? d.format('MMMM D, YYYY') : '—';
};

const SuppliersPage = () => {
  const dispatch = useDispatch();
  const { items, meta, isLoading, isMutating, error } = useSelector(
    (state) => state.suppliers
  );

  const [searchInput, setSearchInput] = useState('');
  const [appliedName, setAppliedName] = useState('');
  const [page, setPage] = useState(1);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const loadSuppliers = () => {
    dispatch(fetchSuppliers({ name: appliedName, page, limit: 5 }));
  };

  useEffect(() => {
    loadSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedName, page]);

  const handleFilter = (e) => {
    e.preventDefault();
    setPage(1);
    setAppliedName(searchInput);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > meta.totalPages) return;
    setPage(newPage);
  };

  const openAddModal = () => {
    setEditTarget(null);
    setFormModalOpen(true);
  };

  const openEditModal = (supplier) => {
    setEditTarget(supplier);
    setFormModalOpen(true);
  };

  const handleFormSubmit = async (values) => {
    if (editTarget) {
      const result = await dispatch(
        updateSupplier({ id: editTarget._id, ...values })
      );
      if (updateSupplier.fulfilled.match(result)) {
        toast.success('Supplier updated');
        setFormModalOpen(false);
        loadSuppliers();
      } else {
        toast.error(result.payload || 'Update failed');
      }
    } else {
      const result = await dispatch(createSupplier(values));
      if (createSupplier.fulfilled.match(result)) {
        toast.success('Supplier added');
        setFormModalOpen(false);
        setPage(1);
        setAppliedName('');
        setSearchInput('');
        loadSuppliers();
      } else {
        toast.error(result.payload || 'Create failed');
      }
    }
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

        <Button variant="secondary" onClick={openAddModal}>
          Add a new suppliers
        </Button>
      </div>

      {/* Table */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>All suppliers</div>

        {isLoading && <div className={styles.loading}>Loading suppliers...</div>}
        {error && <div className={styles.errorMsg}>{error}</div>}
        {!isLoading && !error && items.length === 0 && (
          <div className={styles.empty}>No suppliers found</div>
        )}

        {!isLoading && !error && items.length > 0 && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Suppliers Info</th>
                  <th>Address</th>
                  <th>Company</th>
                  <th>Delivery date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((s) => (
                  <tr key={s._id}>
                    <td className={styles.nameCell}>
                      <span className={styles.truncate}>{s.name}</span>
                    </td>
                    <td>
                      <span className={styles.truncate}>{s.address}</span>
                    </td>
                    <td>{s.company}</td>
                    <td className={styles.nowrap}>
                      {formatDate(s.deliveryDate)}
                    </td>
                    <td className={styles.nowrap}>{formatMoney(s.amount)}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          s.status === 'Active'
                            ? styles.statusActive
                            : styles.statusDeactive
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={styles.editBtn}
                        onClick={() => openEditModal(s)}
                        aria-label={`Edit ${s.name}`}
                      >
                        <span aria-hidden="true">✎</span> Edit
                      </button>
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

      {/* Add / Edit modal */}
      <SupplierFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editTarget}
        isSubmitting={isMutating}
      />
    </div>
  );
};

export default SuppliersPage;