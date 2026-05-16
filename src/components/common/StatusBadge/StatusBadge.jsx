import clsx from 'clsx';
import styles from './StatusBadge.module.scss';

const StatusBadge = ({ status }) => {
  const key = String(status || '').toLowerCase();
  const variant = styles[key] || styles.default;

  return (
    <span className={clsx(styles.badge, variant)}>{status || 'Unknown'}</span>
  );
};

export default StatusBadge;