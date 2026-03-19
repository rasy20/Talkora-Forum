import VoteButton from '../common/VoteButton.jsx';
import { formatDate } from '../../utils/formatDate.js';
import styles from './ThreadDetail.module.css';

function ThreadDetail({ thread, authUser, onUpVote, onDownVote }) {
  const isUpVoted = authUser ? thread.upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser
    ? thread.downVotesBy.includes(authUser.id)
    : false;

  function handleUpVote() {
    onUpVote(isUpVoted ? 0 : 1);
  }

  function handleDownVote() {
    onDownVote(isDownVoted ? 0 : -1);
  }

  return (
    <article className={`animate-fade-up ${styles.article}`}>
      {thread.category && (
        <span className={styles.category}>{thread.category}</span>
      )}

      <h1 className={styles.title}>{thread.title}</h1>

      <div className={styles.authorRow}>
        {thread.owner?.avatar && (
          <img
            src={thread.owner.avatar}
            alt={thread.owner.name}
            className={styles.avatar}
          />
        )}
        <div>
          <p className={styles.authorName}>{thread.owner?.name}</p>
          <p className={styles.date}>{formatDate(thread.createdAt)}</p>
        </div>
      </div>

      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: thread.body }}
      />

      <div className={styles.actions}>
        <VoteButton
          type="up"
          count={thread.upVotesBy.length}
          isVoted={isUpVoted}
          onVote={handleUpVote}
        />
        <VoteButton
          type="down"
          count={thread.downVotesBy.length}
          isVoted={isDownVoted}
          onVote={handleDownVote}
        />
      </div>
    </article>
  );
}

export default ThreadDetail;
