import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import Modal from '@components/common/Modal';
import Input from '@components/common/Input';
import Button from '@components/common/Button';

import styles from './SupplierFormModal.module.scss';

const supplierSchema = yup.object({
  name: yup.string().trim().required('Suppliers info is required'),
  address: yup.string().trim().required('Address is required'),
  company: yup.string().trim().required('Company is required'),
  deliveryDate: yup
    .mixed()
    .required('Delivery date is required')
    .test('valid-date', 'Invalid date', (v) => v && dayjs(v).isValid()),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Amount is required')
    .min(0, 'Amount cannot be negative'),
  status: yup
    .string()
    .oneOf(['Active', 'Deactive'], 'Invalid status')
    .required('Status is required'),
});

const EMPTY = {
  name: '',
  address: '',
  company: '',
  deliveryDate: null,
  amount: '',
  status: 'Active',
};

const SupplierFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
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
    resolver: yupResolver(supplierSchema),
    defaultValues: EMPTY,
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        initialData
          ? {
              name: initialData.name || '',
              address: initialData.address || '',
              company: initialData.company || '',
              deliveryDate: initialData.deliveryDate
                ? dayjs(initialData.deliveryDate)
                : null,
              amount: initialData.amount ?? '',
              status: initialData.status || 'Active',
            }
          : EMPTY
      );
    }
  }, [isOpen, initialData, reset]);

  const submitHandler = (values) => {
    onSubmit({
      ...values,
      amount: Number(values.amount),
      deliveryDate: dayjs(values.deliveryDate).toISOString(),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit supplier' : 'Add a new suppliers'}
      size="large"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(submitHandler)}
          noValidate
        >
          {/* Row 1: Suppliers Info | Address */}
          <div className={styles.row}>
            <div className={styles.field}>
              <Input
                type="text"
                placeholder="Suppliers Info"
                error={errors.name?.message}
                {...register('name')}
              />
            </div>
            <div className={styles.field}>
              <Input
                type="text"
                placeholder="Address"
                error={errors.address?.message}
                {...register('address')}
              />
            </div>
          </div>

          {/* Row 2: Company | Delivery date */}
          <div className={styles.row}>
            <div className={styles.field}>
              <Input
                type="text"
                placeholder="Company"
                error={errors.company?.message}
                {...register('company')}
              />
            </div>
            <div className={styles.field}>
              <Controller
                name="deliveryDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className={styles.datePicker}
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    format="MMMM D, YYYY"
                    slotProps={{
                      textField: {
                        placeholder: 'Delivery date',
                        fullWidth: true,
                      },
                    }}
                  />
                )}
              />
              {errors.deliveryDate && (
                <span className={styles.error}>
                  {errors.deliveryDate.message}
                </span>
              )}
            </div>
          </div>

          {/* Row 3: Amount | Status */}
          <div className={styles.row}>
            <div className={styles.field}>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="Amount"
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === 'e') e.preventDefault();
                }}
                error={errors.amount?.message}
                {...register('amount')}
              />
            </div>
            <div className={styles.field}>
              <select className={styles.select} {...register('status')}>
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
              </select>
              {errors.status && (
                <span className={styles.error}>{errors.status.message}</span>
              )}
            </div>
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
      </LocalizationProvider>
    </Modal>
  );
};

export default SupplierFormModal;