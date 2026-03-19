const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  CREATE_COMMENT: 'CREATE_COMMENT',
  TOGGLE_VOTE_THREAD_DETAIL: 'TOGGLE_VOTE_THREAD_DETAIL',
  TOGGLE_VOTE_COMMENT: 'TOGGLE_VOTE_COMMENT',
};

function receiveThreadDetail(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function clearThreadDetail() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function createCommentAction(comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: { comment },
  };
}

function toggleVoteThreadDetail({ userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD_DETAIL,
    payload: { userId, voteType },
  };
}

function toggleVoteComment({ commentId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_COMMENT,
    payload: { commentId, userId, voteType },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    const { setIsLoading, unsetIsLoading } =
      await import('../isLoading/action.js');
    dispatch(setIsLoading());
    dispatch(clearThreadDetail());
    try {
      const api = await import('../../utils/api.js');
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetail(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(unsetIsLoading());
    }
  };
}

function asyncCreateComment({ threadId, content }) {
  return async (dispatch) => {
    const { setIsLoading, unsetIsLoading } =
      await import('../isLoading/action.js');
    dispatch(setIsLoading());
    try {
      const api = await import('../../utils/api.js');
      const comment = await api.createComment(threadId, content);
      dispatch(createCommentAction(comment));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(unsetIsLoading());
    }
  };
}

function asyncToggleVoteThreadDetail({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert('Anda harus login untuk vote!');
      return;
    }

    dispatch(toggleVoteThreadDetail({ userId: authUser.id, voteType }));

    try {
      const api = await import('../../utils/api.js');
      if (voteType === 1) {
        await api.upVoteThread(threadId);
      } else if (voteType === -1) {
        await api.downVoteThread(threadId);
      } else {
        await api.neutralVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleVoteThreadDetail({ userId: authUser.id, voteType: 0 }));
    }
  };
}

function asyncToggleVoteComment({ threadId, commentId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert('Anda harus login untuk vote!');
      return;
    }

    dispatch(toggleVoteComment({ commentId, userId: authUser.id, voteType }));

    try {
      const api = await import('../../utils/api.js');
      if (voteType === 1) {
        await api.upVoteComment(threadId, commentId);
      } else if (voteType === -1) {
        await api.downVoteComment(threadId, commentId);
      } else {
        await api.neutralVoteComment(threadId, commentId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleVoteComment({ commentId, userId: authUser.id, voteType: 0 }),
      );
    }
  };
}

export {
  ActionType,
  receiveThreadDetail,
  clearThreadDetail,
  createCommentAction,
  toggleVoteThreadDetail,
  toggleVoteComment,
  asyncReceiveThreadDetail,
  asyncCreateComment,
  asyncToggleVoteThreadDetail,
  asyncToggleVoteComment,
};
