import VoteButton from '../common/VoteButton.jsx';
import { formatDate } from '../../utils/formatDate.js';
import styles from './CommentItem.module.css';

function CommentItem({
  comment, authUser, onUpVote, onDownVote,
}) {
  const isUpVoted = authUser ? comment.upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser
    ? comment.downVotesBy.includes(authUser.id)
    : false;

  function handleUpVote() {
    onUpVote(comment.id, isUpVoted ? 0 : 1);
  }

  function handleDownVote() {
    onDownVote(comment.id, isDownVoted ? 0 : -1);
  }

  return (
    <div className={`animate-fade-up ${styles.item}`}>
      <div className={styles.header}>
        {comment.owner?.avatar && (
          <img
            src={comment.owner.avatar}
            alt={comment.owner.name}
            className={styles.avatar}
          />
        )}
        <span className={styles.authorName}>{comment.owner?.name}</span>
        <span className={styles.separator}>·</span>
        <span className={styles.date}>{formatDate(comment.createdAt)}</span>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
      <div className={styles.actions}>
        <VoteButton
          type="up"
          count={comment.upVotesBy.length}
          isVoted={isUpVoted}
          onVote={handleUpVote}
        />
        <VoteButton
          type="down"
          count={comment.downVotesBy.length}
          isVoted={isDownVoted}
          onVote={handleDownVote}
        />
      </div>
    </div>
  );
}

export default CommentItem;
