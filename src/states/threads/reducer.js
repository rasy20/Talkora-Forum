import { ActionType } from './action.js';

function applyVote(threads, threadId, userId, voteType) {
  return threads.map((thread) => {
    if (thread.id !== threadId) return thread;

    const upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
    const downVotesBy = thread.downVotesBy.filter((id) => id !== userId);

    if (voteType === 1) {
      upVotesBy.push(userId);
    } else if (voteType === -1) {
      downVotesBy.push(userId);
    }

    return { ...thread, upVotesBy, downVotesBy };
  });
}

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.CREATE_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.TOGGLE_VOTE_THREAD:
      return applyVote(
        threads,
        action.payload.threadId,
        action.payload.userId,
        action.payload.voteType,
      );
    default:
      return threads;
  }
}

export default threadsReducer;
