import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncCreateThread } from '../../states/threads/action.js';
import ThreadInput from '../../components/thread/ThreadInput.jsx';
import styles from './CreateThreadPage.module.css';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onCreateThread({ title, body, category }) {
    await dispatch(asyncCreateThread({ title, body, category }));
    navigate('/');
  }

  return (
    <div className={`animate-fade-up ${styles.container}`}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Thread Baru</p>
        <h1 className={styles.title}>Buat Diskusi Baru</h1>
        <ThreadInput onCreateThread={onCreateThread} />
      </div>
    </div>
  );
}

export default CreateThreadPage;
