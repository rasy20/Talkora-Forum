import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncCreateComment,
  asyncToggleVoteThreadDetail,
  asyncToggleVoteComment,
} from '../../states/threadDetail/action.js';
import ThreadDetail from '../../components/thread/ThreadDetail.jsx';
import CommentList from '../../components/comment/CommentList.jsx';
import CommentInput from '../../components/comment/CommentInput.jsx';
import styles from './DetailPage.module.css';

function DetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  function handleUpVoteThread(voteType) {
    dispatch(asyncToggleVoteThreadDetail({ threadId: id, voteType }));
  }

  function handleDownVoteThread(voteType) {
    dispatch(asyncToggleVoteThreadDetail({ threadId: id, voteType }));
  }

  function handleUpVoteComment(commentId, voteType) {
    dispatch(asyncToggleVoteComment({ threadId: id, commentId, voteType }));
  }

  function handleDownVoteComment(commentId, voteType) {
    dispatch(asyncToggleVoteComment({ threadId: id, commentId, voteType }));
  }

  function handleComment(content) {
    dispatch(asyncCreateComment({ threadId: id, content }));
  }

  if (!threadDetail) {
    return (
      <div className={`animate-fade-up ${styles.loadingContainer}`}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div>
      <ThreadDetail
        thread={threadDetail}
        authUser={authUser}
        onUpVote={handleUpVoteThread}
        onDownVote={handleDownVoteThread}
      />
      {authUser ? (
        <CommentInput onComment={handleComment} />
      ) : (
        <p className={styles.loginPrompt}>
          <a href="/login" className={styles.loginLink}>
            Login
          </a>{' '}
          untuk memberikan komentar.
        </p>
      )}
      <CommentList
        comments={threadDetail.comments}
        authUser={authUser}
        onUpVote={handleUpVoteComment}
        onDownVote={handleDownVoteComment}
      />
    </div>
  );
}

export default DetailPage;
