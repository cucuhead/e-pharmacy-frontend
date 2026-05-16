import styles from './Avatar.module.scss';

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const Avatar = ({ name }) => {
  // Seed data'daki Imgur URL'leri çürümüş (ölü placeholder döndürüyor),
  // bu yüzden her zaman baş harf avatarı gösteriyoruz — tutarlı ve temiz.
  return (
    <span className={styles.fallback} aria-hidden="true">
      {getInitials(name)}
    </span>
  );
};

export default Avatar;