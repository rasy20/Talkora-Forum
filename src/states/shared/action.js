import { setIsLoading, unsetIsLoading } from '../isLoading/action.js';
import { receiveThreads } from '../threads/action.js';
import { receiveUsers } from '../users/action.js';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(setIsLoading());
    try {
      const api = await import('../../utils/api.js');
      const [users, threads] = await Promise.all([
        api.getAllUsers(),
        api.getAllThreads(),
      ]);
      dispatch(receiveUsers(users));
      dispatch(receiveThreads(threads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(unsetIsLoading());
    }
  };
}

export { asyncPopulateUsersAndThreads };
