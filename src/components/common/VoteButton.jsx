import { HiThumbUp, HiThumbDown } from 'react-icons/hi';
import styles from './VoteButton.module.css';

function VoteButton({
  type, count, isVoted, onVote,
}) {
  const isUp = type === 'up';

  let stateClass = styles.inactive;
  if (isVoted) {
    stateClass = isUp ? styles.upVoted : styles.downVoted;
  }

  return (
    <button
      type="button"
      onClick={onVote}
      className={`${styles.button} ${stateClass}`}
    >
      <span className={styles.icon}>{isUp ? <HiThumbUp /> : <HiThumbDown />}</span>
      <span className={styles.count}>{count}</span>
    </button>
  );
}

export default VoteButton;
