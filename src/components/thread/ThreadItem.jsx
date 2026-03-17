import { useNavigate } from 'react-router-dom';
import VoteButton from '../common/VoteButton.jsx';
import { formatDate } from '../../utils/formatDate.js';
import styles from './ThreadItem.module.css';

function ThreadItem({
  thread, user, authUser, onUpVote, onDownVote,
}) {
  const navigate = useNavigate();

  const isUpVoted = authUser ? thread.upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser
    ? thread.downVotesBy.includes(authUser.id)
    : false;

  function handleUpVote(e) {
    e.stopPropagation();
    if (isUpVoted) {
      onUpVote(thread.id, 0);
    } else {
      onUpVote(thread.id, 1);
    }
  }

  function handleDownVote(e) {
    e.stopPropagation();
    if (isDownVoted) {
      onDownVote(thread.id, 0);
    } else {
      onDownVote(thread.id, -1);
    }
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/threads/${thread.id}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/threads/${thread.id}`)}
      className={`animate-fade-up ${styles.article}`}
    >
      <div className={styles.metaRow}>
        {thread.category && (
          <span className={styles.category}>{thread.category}</span>
        )}
        <span className={styles.date}>{formatDate(thread.createdAt)}</span>
      </div>

      <h3 className={`line-clamp-2 ${styles.title}`}>{thread.title}</h3>

      <p className={`line-clamp-2 ${styles.bodyPreview}`}>
        {thread.body.replace(/<[^>]*>/g, '').substring(0, 180)}
        {thread.body.length > 180 && '…'}
      </p>

      <div className={styles.footer}>
        <div className={styles.authorInfo}>
          {user?.avatar && (
            <img
              src={user.avatar}
              alt={user.name || 'User'}
              className={styles.avatar}
            />
          )}
          <span className={styles.authorName}>{user?.name || 'Unknown'}</span>
        </div>

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
          <span className={styles.commentCount}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {thread.totalComments}
          </span>
        </div>
      </div>
    </article>
  );
}

export default ThreadItem;
