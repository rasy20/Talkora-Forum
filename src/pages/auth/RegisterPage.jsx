import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../utils/api.js';
import RegisterInput from '../../components/auth/RegisterInput.jsx';
import styles from './AuthPage.module.css';

function RegisterPage() {
  const navigate = useNavigate();

  async function onRegister({ name, email, password }) {
    try {
      await register({ name, email, password });
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={`animate-fade-up ${styles.cardWrapper}`}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Buat Akun Baru</h1>
            <p className={styles.subtitle}>
              Bergabung dengan komunitas Talkora
            </p>
          </div>
          <RegisterInput onRegister={onRegister} />
          <p className={styles.footer}>
            Sudah punya akun?{' '}
            <Link to="/login" className={styles.link}>
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
