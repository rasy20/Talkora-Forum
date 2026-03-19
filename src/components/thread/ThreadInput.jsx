import { useState } from 'react';
import styles from './ThreadInput.module.css';

function ThreadInput({ onCreateThread }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onCreateThread({ title, body, category: category || undefined });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label htmlFor="thread-title" className={styles.label}>
          Judul
        </label>
        <input
          id="thread-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tulis judul yang menarik"
          className={styles.input}
          required
        />
      </div>
      <div>
        <label htmlFor="thread-category" className={styles.label}>
          Kategori <span className={styles.hint}>(opsional)</span>
        </label>
        <input
          id="thread-category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Contoh: General, Tech, Random"
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="thread-body" className={styles.label}>
          Isi Thread
        </label>
        <textarea
          id="thread-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Bagikan pemikiran Anda…"
          className={styles.textarea}
          rows={6}
          required
        />
      </div>
      <button
        type="submit"
        disabled={!title.trim() || !body.trim()}
        className={styles.submitBtn}
      >
        Publikasikan Thread
      </button>
    </form>
  );
}

export default ThreadInput;
