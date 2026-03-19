const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboards(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: { leaderboards },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    const { setIsLoading, unsetIsLoading } =
      await import('../isLoading/action.js');
    dispatch(setIsLoading());
    try {
      const { getLeaderboards } = await import('../../utils/api.js');
      const leaderboards = await getLeaderboards();
      dispatch(receiveLeaderboards(leaderboards));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(unsetIsLoading());
    }
  };
}

export { ActionType, receiveLeaderboards, asyncReceiveLeaderboards };
