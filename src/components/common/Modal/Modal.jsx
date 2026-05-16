import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

const Modal = ({ isOpen, onClose, title, children, size = 'default' }) => {
  // ESC tuşu ile kapat
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleKeyDown);
    // Modal açıkken arka plan scroll'u kilitle
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  // mousedown overlay'in kendisinde mi başladı? işaretle
  const handleOverlayMouseDown = (e) => {
    e.currentTarget.dataset.overlayMouseDown =
      e.target === e.currentTarget ? 'true' : 'false';
  };

  // mousedown DA overlay'de başladıysa VE mouseup DA overlay'deyse kapat
  const handleOverlayMouseUp = (e) => {
    const startedOnOverlay =
      e.currentTarget.dataset.overlayMouseDown === 'true';
    if (startedOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
    e.currentTarget.dataset.overlayMouseDown = 'false';
  };

  return createPortal(
    <div
      className={styles.overlay}
      onMouseDown={handleOverlayMouseDown}
      onMouseUp={handleOverlayMouseUp}
    >
      <div
        className={`${styles.modal} ${
          size === 'large' ? styles.sizeLarge : styles.sizeDefault
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {title && <h2 className={styles.title}>{title}</h2>}

        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;