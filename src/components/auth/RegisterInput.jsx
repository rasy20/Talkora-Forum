import { useState } from 'react';
import styles from './AuthInput.module.css';

function RegisterInput({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ name, email, password });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label htmlFor="name" className={styles.label}>
          Nama
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama lengkap Anda"
          className={styles.input}
          required
        />
      </div>
      <div>
        <label htmlFor="register-email" className={styles.label}>
          Email
        </label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="anda@email.com"
          className={styles.input}
          required
        />
      </div>
      <div>
        <label htmlFor="register-password" className={styles.label}>
          Password
        </label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Minimal 6 karakter"
          className={styles.input}
          minLength={6}
          required
        />
      </div>
      <button type="submit" className={styles.submitBtn}>
        Buat Akun
      </button>
    </form>
  );
}

export default RegisterInput;
