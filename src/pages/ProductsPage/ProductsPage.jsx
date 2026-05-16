import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@redux/products/productsOperations';
import { formatMoney } from '@utils/formatters';

import Input from '@components/common/Input';
import Button from '@components/common/Button';
import Pagination from '@components/common/Pagination';
import ProductFormModal from '@components/products/ProductFormModal';
import DeleteConfirmModal from '@components/products/DeleteConfirmModal';

import styles from './ProductsPage.module.scss';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items, meta, isLoading, isMutating, error } = useSelector(
    (state) => state.products
  );

  const [searchInput, setSearchInput] = useState('');
  const [appliedName, setAppliedName] = useState('');
  const [page, setPage] = useState(1);

  // Modal state
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // null → Add, dolu → Edit
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Listeyi getir
  const loadProducts = () => {
    dispatch(fetchProducts({ name: appliedName, page, limit: 5 }));
  };

  useEffect(() => {
    loadProducts();
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

  // --- Add ---
  const openAddModal = () => {
    setEditTarget(null);
    setFormModalOpen(true);
  };

  // --- Edit ---
  const openEditModal = (product) => {
    setEditTarget(product);
    setFormModalOpen(true);
  };

  const handleFormSubmit = async (values) => {
    if (editTarget) {
      const result = await dispatch(
        updateProduct({ id: editTarget._id, ...values })
      );
      if (updateProduct.fulfilled.match(result)) {
        toast.success('Product updated');
        setFormModalOpen(false);
        loadProducts();
      } else {
        toast.error(result.payload || 'Update failed');
      }
    } else {
      const result = await dispatch(createProduct(values));
      if (createProduct.fulfilled.match(result)) {
        toast.success('Product added');
        setFormModalOpen(false);
        // Yeni ürün eklendi → ilk sayfaya dön ki görünsün
        setPage(1);
        setAppliedName('');
        setSearchInput('');
        loadProducts();
      } else {
        toast.error(result.payload || 'Create failed');
      }
    }
  };

  // --- Delete ---
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const result = await dispatch(deleteProduct(deleteTarget._id));
    if (deleteProduct.fulfilled.match(result)) {
      toast.success('Product deleted');
      setDeleteTarget(null);
      // Son sayfadaki tek kayıt silindiyse bir önceki sayfaya çekil
      if (items.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        loadProducts();
      }
    } else {
      toast.error(result.payload || 'Delete failed');
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
              placeholder="Product Name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary">
            Filter
          </Button>
        </form>

        <Button variant="primary" className={styles.addBtn} onClick={openAddModal}>
          <span aria-hidden="true">+</span> Add a new product
        </Button>
      </div>

      {/* Table */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>All products</div>

        {isLoading && <div className={styles.loading}>Loading products...</div>}
        {error && <div className={styles.errorMsg}>{error}</div>}
        {!isLoading && !error && items.length === 0 && (
          <div className={styles.empty}>No products found</div>
        )}

        {!isLoading && !error && items.length > 0 && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product Info</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Suppliers</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((product) => (
                  <tr key={product._id}>
                    <td className={styles.nameCell}>
                      <span className={styles.truncate}>{product.name}</span>
                    </td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className={styles.truncate}>
                        {product.suppliers}
                      </span>
                    </td>
                    <td className={styles.price}>
                      {formatMoney(product.price)}
                    </td>
                    <td>
                      <div className={styles.actionCell}>
                        <button
                          type="button"
                          className={`${styles.iconBtn} ${styles.editBtn}`}
                          onClick={() => openEditModal(product)}
                          aria-label={`Edit ${product.name}`}
                          title="Edit"
                        >
                          ✎
                        </button>
                        <button
                          type="button"
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          onClick={() => setDeleteTarget(product)}
                          aria-label={`Delete ${product.name}`}
                          title="Delete"
                        >
                          ✕
                        </button>
                      </div>
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
      <ProductFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editTarget}
        isSubmitting={isMutating}
      />

      {/* Delete confirm modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        productName={deleteTarget?.name}
        isDeleting={isMutating}
      />
    </div>
  );
};

export default ProductsPage;