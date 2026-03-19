const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreload(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: { isPreload },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    const { setAuthUser } = await import('../authUser/action.js');
    try {
      const api = await import('../../utils/api.js');
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch {
      dispatch({ type: 'UNSET_AUTH_USER' });
    } finally {
      dispatch(setIsPreload(false));
    }
  };
}

export { ActionType, setIsPreload, asyncPreloadProcess };
