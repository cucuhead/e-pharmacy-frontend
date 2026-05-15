import { formatMoney } from '@utils/formatters';
import styles from './RecentCustomers.module.scss';

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const RecentCustomers = ({ customers = [] }) => {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>Recent Customers</div>

      {customers.length === 0 ? (
        <div className={styles.empty}>No recent customers</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Spent</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c._id}>
                  <td>
                    <div className={styles.nameCell}>
                      {c.image ? (
                        <img
                          src={c.image}
                          alt=""
                          className={styles.avatar}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className={styles.avatarFallback} aria-hidden="true">
                          {getInitials(c.name)}
                        </span>
                      )}
                      <span className={styles.name}>{c.name}</span>
                    </div>
                  </td>
                  <td className={styles.email}>{c.email}</td>
                  <td className={styles.spent}>{formatMoney(c.spent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentCustomers;