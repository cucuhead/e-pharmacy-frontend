import { formatMoney } from '@utils/formatters';
import Avatar from '@components/common/Avatar';
import styles from './RecentCustomers.module.scss';



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
                     <Avatar name={c.name} />
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