import { putAccessToken } from '../../utils/api.js';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUser(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: { authUser },
  };
}

function unsetAuthUser() {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    try {
      const api = await import('../../utils/api.js');
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUser());
    putAccessToken('');
  };
}

export {
  ActionType,
  setAuthUser,
  unsetAuthUser,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
