import ThreadItem from './ThreadItem.jsx';
import styles from './ThreadList.module.css';

function ThreadList({ threads, users, authUser, onUpVote, onDownVote }) {
  const userMap = {};
  users.forEach((user) => {
    userMap[user.id] = user;
  });

  if (threads.length === 0) {
    return (
      <div className={`animate-fade-up ${styles.emptyState}`}>
        <div className={styles.emptyIcon}>💬</div>
        <p className={styles.emptyTitle}>Belum ada thread</p>
        <p className={styles.emptyDesc}>
          Jadilah yang pertama memulai diskusi.
        </p>
      </div>
    );
  }

  return (
    <div className={`stagger-children ${styles.list}`}>
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          user={userMap[thread.ownerId]}
          authUser={authUser}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      ))}
    </div>
  );
}

export default ThreadList;
