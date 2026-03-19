const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  CREATE_THREAD: 'CREATE_THREAD',
  TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD',
};

function receiveThreads(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads },
  };
}

function createThreadAction(thread) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: { thread },
  };
}

function toggleVoteThread({ threadId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD,
    payload: { threadId, userId, voteType },
  };
}

function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    const { setIsLoading, unsetIsLoading } =
      await import('../isLoading/action.js');
    dispatch(setIsLoading());
    try {
      const api = await import('../../utils/api.js');
      const thread = await api.createThread({ title, body, category });
      dispatch(createThreadAction(thread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(unsetIsLoading());
    }
  };
}

function asyncToggleVoteThread({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert('Anda harus login untuk vote!');
      return;
    }

    dispatch(toggleVoteThread({ threadId, userId: authUser.id, voteType }));

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
      dispatch(
        toggleVoteThread({ threadId, userId: authUser.id, voteType: 0 }),
      );
    }
  };
}

export {
  ActionType,
  receiveThreads,
  createThreadAction,
  toggleVoteThread,
  asyncCreateThread,
  asyncToggleVoteThread,
};
