import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../../states/authUser/action.js';
import Logo from '../../assets/logo.svg';
import styles from './Navigation.module.css';

function Navigation() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  function onLogout() {
    dispatch(asyncUnsetAuthUser());
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logoLink}>
          <img src={Logo} alt="Logo" className={styles.logoIcon} />
        </Link>

        <div className={styles.navActions}>
          <Link to="/" className={styles.navLink}>
            Threads
          </Link>
          <Link to="/leaderboards" className={styles.navLink}>
            Leaderboard
          </Link>

          {authUser ? (
            <div className={styles.authGroup}>
              <Link to="/new" className={styles.btnPrimary}>
                + Buat Thread
              </Link>
              <div className={styles.userInfo}>
                <img
                  src={authUser.avatar}
                  alt={authUser.name}
                  className={styles.userAvatar}
                />
                <span className={styles.userName}>{authUser.name}</span>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className={styles.btnLogout}
              >
                Keluar
              </button>
            </div>
          ) : (
            <Link to="/login" className={styles.btnPrimary}>
              Masuk
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
