import { ActionType } from './action.js';

function applyVoteToDetail(threadDetail, userId, voteType) {
  const upVotesBy = threadDetail.upVotesBy.filter((id) => id !== userId);
  const downVotesBy = threadDetail.downVotesBy.filter((id) => id !== userId);

  if (voteType === 1) {
    upVotesBy.push(userId);
  } else if (voteType === -1) {
    downVotesBy.push(userId);
  }

  return { ...threadDetail, upVotesBy, downVotesBy };
}

function applyVoteToComment(comments, commentId, userId, voteType) {
  return comments.map((comment) => {
    if (comment.id !== commentId) return comment;

    const upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
    const downVotesBy = comment.downVotesBy.filter((id) => id !== userId);

    if (voteType === 1) {
      upVotesBy.push(userId);
    } else if (voteType === -1) {
      downVotesBy.push(userId);
    }

    return { ...comment, upVotesBy, downVotesBy };
  });
}

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.CREATE_COMMENT:
      return {
        ...threadDetail,
        comments: [...threadDetail.comments, action.payload.comment],
      };
    case ActionType.TOGGLE_VOTE_THREAD_DETAIL:
      return applyVoteToDetail(
        threadDetail,
        action.payload.userId,
        action.payload.voteType,
      );
    case ActionType.TOGGLE_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: applyVoteToComment(
          threadDetail.comments,
          action.payload.commentId,
          action.payload.userId,
          action.payload.voteType,
        ),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
