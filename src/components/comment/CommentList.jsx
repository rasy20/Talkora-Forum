import CommentItem from './CommentItem.jsx';
import styles from './CommentList.module.css';

function CommentList({
  comments, authUser, onUpVote, onDownVote,
}) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Komentar
        <span className={styles.count}>
          (
          {comments.length}
          )
        </span>
      </h2>
      <div className={`stagger-children ${styles.list}`}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            authUser={authUser}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        ))}
        {comments.length === 0 && (
          <p className={styles.emptyText}>
            Belum ada komentar. Jadilah yang pertama!
          </p>
        )}
      </div>
    </div>
  );
}

export default CommentList;
