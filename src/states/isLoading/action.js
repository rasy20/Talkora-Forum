const ActionType = {
  SET_IS_LOADING: 'SET_IS_LOADING',
  UNSET_IS_LOADING: 'UNSET_IS_LOADING',
};

function setIsLoading() {
  return {
    type: ActionType.SET_IS_LOADING,
  };
}

function unsetIsLoading() {
  return {
    type: ActionType.UNSET_IS_LOADING,
  };
}

export { ActionType, setIsLoading, unsetIsLoading };
