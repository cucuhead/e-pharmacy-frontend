import clsx from 'clsx';
import { formatSignedMoney } from '@utils/formatters';
import styles from './IncomeExpenses.module.scss';

const TYPE_STYLES = {
  Income: { badge: styles.income, amount: styles.amountIncome },
  Expense: { badge: styles.expense, amount: styles.amountExpense },
  Error: { badge: styles.error, amount: styles.amountError },
};

const IncomeExpenses = ({ items = [] }) => {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>Income/Expenses</div>
      <div className={styles.subHeader}>Today</div>

      {items.length === 0 ? (
        <div className={styles.empty}>No transactions</div>
      ) : (
        <div className={styles.list}>
          {items.map((item) => {
            const typeStyles = TYPE_STYLES[item.type] || TYPE_STYLES.Error;
            return (
              <div key={item._id} className={styles.row}>
                <span className={clsx(styles.badge, typeStyles.badge)}>
                  {item.type}
                </span>
                <span className={styles.title}>{item.name}</span>
                <span className={clsx(styles.amount, typeStyles.amount)}>
                  {formatSignedMoney(item.amount)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IncomeExpenses;