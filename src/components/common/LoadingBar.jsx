import { useSelector } from 'react-redux';
import styles from './LoadingBar.module.css';

function LoadingBar() {
  const isLoading = useSelector((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className={styles.loadingBarContainer}>
      <div className={styles.loadingBarFill} />
    </div>
  );
}

export default LoadingBar;
