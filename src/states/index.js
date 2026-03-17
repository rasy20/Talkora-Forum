import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer.js';
import isPreloadReducer from './isPreload/reducer.js';
import isLoadingReducer from './isLoading/reducer.js';
import usersReducer from './users/reducer.js';
import threadsReducer from './threads/reducer.js';
import threadDetailReducer from './threadDetail/reducer.js';
import leaderboardsReducer from './leaderboards/reducer.js';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    isLoading: isLoadingReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;
