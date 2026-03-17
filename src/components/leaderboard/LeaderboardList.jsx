import styles from './LeaderboardList.module.css';

function LeaderboardItem({ rank, user, score }) {
  const isTop3 = rank <= 3;
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div
      className={`animate-fade-up ${styles.item} ${isTop3 ? styles.itemTop3 : styles.itemNormal}`}
    >
      <div className={styles.rankSection}>
        {isTop3 ? (
          <span className={styles.rankMedal}>{medals[rank - 1]}</span>
        ) : (
          <span className={styles.rankNormal}>{rank}</span>
        )}
      </div>

      <img
        src={user.avatar}
        alt={user.name}
        className={`${styles.avatar} ${isTop3 ? styles.avatarTop3 : styles.avatarNormal}`}
      />

      <div className={styles.infoSection}>
        <p className={styles.name}>{user.name}</p>
        <p className={styles.email}>{user.email}</p>
      </div>

      <div className={styles.scoreSection}>
        <span
          className={`${styles.score} ${isTop3 ? styles.scoreTop3 : styles.scoreNormal}`}
        >
          {score}
        </span>
        <p className={styles.scoreLabel}>poin</p>
      </div>
    </div>
  );
}

function LeaderboardList({ leaderboards }) {
  if (leaderboards.length === 0) {
    return (
      <div className={`animate-fade-up ${styles.emptyState}`}>
        <p className={styles.emptyTitle}>Belum ada data leaderboard</p>
        <p className={styles.emptyDesc}>
          Mulai berkontribusi untuk muncul di sini.
        </p>
      </div>
    );
  }

  return (
    <div className={`stagger-children ${styles.list}`}>
      {leaderboards.map((item, index) => (
        <LeaderboardItem
          key={item.user.id}
          rank={index + 1}
          user={item.user}
          score={item.score}
        />
      ))}
    </div>
  );
}

export default LeaderboardList;
