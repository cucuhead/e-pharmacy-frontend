import clsx from 'clsx';
import { formatNumber } from '@utils/formatters';
import styles from './StatCard.module.scss';

const StatCard = ({ label, value, mark, active = false }) => {
  return (
    <div className={clsx(styles.card, active && styles.active)}>
      <div className={styles.header}>
        <span className={styles.iconWrap} aria-hidden="true">
          {mark}
        </span>
        <span>{label}</span>
      </div>
      <div className={styles.value}>{formatNumber(value)}</div>
    </div>
  );
};

export default StatCard;