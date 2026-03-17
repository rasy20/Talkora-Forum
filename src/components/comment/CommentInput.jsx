import { useState } from 'react';
import styles from './CommentInput.module.css';

function CommentInput({ onComment }) {
  const [content, setContent] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (content.trim()) {
      onComment(content);
      setContent('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`animate-fade-up ${styles.form}`}>
      <h2 className={styles.title}>
        Beri Komentar
      </h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis pemikiran Anda…"
        className={styles.textarea}
        rows={3}
      />
      <div className={styles.actions}>
        <button
          type="submit"
          disabled={!content.trim()}
          className={styles.submitBtn}
        >
          Kirim Komentar
        </button>
      </div>
    </form>
  );
}

export default CommentInput;
