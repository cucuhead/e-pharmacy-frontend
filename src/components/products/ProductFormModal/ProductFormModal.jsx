import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Select } from '@blueprintjs/select';
import { Button as BpButton } from '@blueprintjs/core';

import Modal from '@components/common/Modal';
import Input from '@components/common/Input';
import Button from '@components/common/Button';

import styles from './ProductFormModal.module.scss';

// Şartname kategorileri (mockup Edit dropdown'undaki liste)
const CATEGORIES = [
  'Medicine',
  'Heart',
  'Head',
  'Hand',
  'Leg',
  'Dental Care',
  'Skin Care',
  'Eye Care',
  'Visit Care',
];

const productSchema = yup.object({
  name: yup.string().trim().required('Product info is required'),
  category: yup.string().trim().required('Category is required'),
  stock: yup
    .number()
    .typeError('Stock must be a number')
    .required('Stock is required')
    .min(0, 'Stock cannot be negative'),
  suppliers: yup.string().trim().required('Suppliers is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .min(0, 'Price cannot be negative'),
});

const EMPTY = { name: '', category: '', stock: '', suppliers: '', price: '' };

const ProductFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null, // null → Add modu, dolu → Edit modu
  isSubmitting = false,
}) => {
  const isEdit = Boolean(initialData);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: EMPTY,
  });

  // Modal açıldığında: Edit ise initialData yükle, Add ise temizle
  useEffect(() => {
    if (isOpen) {
      reset(
        initialData
          ? {
              name: initialData.name || '',
              category: initialData.category || '',
              stock: initialData.stock ?? '',
              suppliers: initialData.suppliers || '',
              price: initialData.price ?? '',
            }
          : EMPTY
      );
    }
  }, [isOpen, initialData, reset]);

  const submitHandler = (values) => {
    onSubmit({
      ...values,
      stock: Number(values.stock),
      price: Number(values.price),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
       size="large"
      title={isEdit ? 'Edit product' : 'Add a new product'}
    >
      <form
        className={styles.form}
        onSubmit={handleSubmit(submitHandler)}
        noValidate
      >
        {/* Row 1: Product Info | Category */}
        <div className={styles.row}>
          <div className={styles.field}>
            <Input
              type="text"
              placeholder="Product Info"
              error={errors.name?.message}
              {...register('name')}
            />
          </div>

          <div className={styles.field}>
            {/* Blueprint.js category dropdown */}
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  className={styles.categorySelect}
                  items={CATEGORIES}
                  filterable={false}
                  popoverProps={{
                    usePortal: false,
                    minimal: true,
                    matchTargetWidth: true,
                  }}
                itemRenderer={(item, { handleClick, modifiers }) => (
  <div
    key={item}
    className={`${styles.menuItem} ${
      modifiers.active ? styles.menuItemActive : ''
    }`}
    onClick={handleClick}
    role="option"
    aria-selected={modifiers.active}
  >
    {item}
  </div>
)}
                  onItemSelect={(item) => field.onChange(item)}
                >
                  <BpButton
                    text={
                      field.value || (
                        <span className={styles.placeholder}>Category</span>
                      )
                    }
                    rightIcon="caret-down"
                  />
                </Select>
              )}
            />
            {errors.category && (
              <span className={styles.error}>{errors.category.message}</span>
            )}
          </div>
        </div>

        {/* Row 2: Stock | Suppliers */}
        <div className={styles.row}>
          <div className={styles.field}>
            <Input
              type="number"
              min="0"
              placeholder="Stock"
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e') e.preventDefault();
              }}
              error={errors.stock?.message}
              {...register('stock')}
            />
          </div>

          <div className={styles.field}>
            <Input
              type="text"
              placeholder="Suppliers"
              error={errors.suppliers?.message}
              {...register('suppliers')}
            />
          </div>
        </div>

        {/* Row 3: Price | (empty) */}
        <div className={styles.row}>
          <div className={styles.field}>
            <Input
              type="number"
              min="0"
              step="0.01"
              placeholder="Price"
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e') e.preventDefault();
              }}
              error={errors.price?.message}
              {...register('price')}
            />
          </div>
          <div className={styles.field} aria-hidden="true" />
        </div>

        <div className={styles.actions}>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEdit ? 'Save' : 'Add'}
          </Button>
          <Button type="button" variant="cancel" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductFormModal;