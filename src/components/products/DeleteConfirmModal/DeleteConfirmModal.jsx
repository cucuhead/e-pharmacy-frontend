import Modal from '@components/common/Modal';
import Button from '@components/common/Button';

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  productName = '',
  isDeleting = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete product">
      <p style={{ marginBottom: '24px', color: '#1D1E21' }}>
        Are you sure you want to delete{' '}
        <strong>{productName || 'this product'}</strong>? This action cannot be
        undone.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
        <Button variant="cancel" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;