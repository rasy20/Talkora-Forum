import { ActionType } from './action.js';

function isLoadingReducer(isLoading = false, action = {}) {
  switch (action.type) {
    case ActionType.SET_IS_LOADING:
      return true;
    case ActionType.UNSET_IS_LOADING:
      return false;
    default:
      return isLoading;
  }
}

export default isLoadingReducer;
