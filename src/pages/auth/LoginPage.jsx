import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../../states/authUser/action.js';
import LoginInput from '../../components/auth/LoginInput.jsx';
import styles from './AuthPage.module.css';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onLogin({ email, password }) {
    await dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <div className={`animate-fade-up ${styles.cardWrapper}`}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Selamat Datang</h1>
            <p className={styles.subtitle}>Masuk untuk melanjutkan ke Talkora</p>
          </div>
          <LoginInput onLogin={onLogin} />
          <p className={styles.footer}>
            Belum punya akun?
            {' '}
            <Link to="/register" className={styles.link}>
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
