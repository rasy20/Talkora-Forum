import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../../states/shared/action.js';
import { asyncToggleVoteThread } from '../../states/threads/action.js';
import ThreadList from '../../components/thread/ThreadList.jsx';
import CategoryFilter from '../../components/thread/CategoryFilter.jsx';
import styles from './HomePage.module.css';

function HomePage() {
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = [
    ...new Set(threads.map((t) => t.category).filter(Boolean)),
  ];

  const filteredThreads = selectedCategory
    ? threads.filter((t) => t.category === selectedCategory)
    : threads;

  function handleUpVote(threadId, voteType) {
    dispatch(asyncToggleVoteThread({ threadId, voteType }));
  }

  function handleDownVote(threadId, voteType) {
    dispatch(asyncToggleVoteThread({ threadId, voteType }));
  }

  return (
    <div>
      <header className={`animate-fade-up ${styles.header}`}>
        <p className={styles.eyebrow}>Komunitas</p>
        <h1 className={styles.title}>Diskusi Terbaru</h1>
        <p className={styles.subtitle}>
          Temukan percakapan menarik dan bergabung dengan komunitas.
        </p>
      </header>

      {categories.length > 0 && (
        <div className={`animate-fade-up ${styles.filterSection}`}>
          <p className={styles.filterLabel}>Filter Kategori</p>
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      )}

      <ThreadList
        threads={filteredThreads}
        users={users}
        authUser={authUser}
        onUpVote={handleUpVote}
        onDownVote={handleDownVote}
      />
    </div>
  );
}

export default HomePage;
