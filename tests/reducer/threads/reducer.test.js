/**
 * Skenario pengujian untuk threadsReducer:
 *
 * 1. Mengembalikan initial state (array kosong) jika action tidak dikenal
 * 2. RECEIVE_THREADS — mengganti seluruh daftar thread
 * 3. CREATE_THREAD — menambahkan thread baru ke posisi awal array
 * 4. TOGGLE_VOTE_THREAD (upvote) — menambah userId ke upVotesBy
 * 5. TOGGLE_VOTE_THREAD (downvote) — menambah userId ke downVotesBy
 * 6. TOGGLE_VOTE_THREAD (neutral) — menghapus userId dari kedua array
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from '../../../src/states/threads/reducer';
import { ActionType } from '../../../src/states/threads/action';

describe('threadsReducer', () => {
  it('should return the initial state when given unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return threads when given RECEIVE_THREADS action', () => {
    const initialState = [];
    const threads = [
      {
        id: 'thread-1', title: 'Thread 1', upVotesBy: [], downVotesBy: [],
      },
      {
        id: 'thread-2', title: 'Thread 2', upVotesBy: [], downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(threads);
  });

  it('should prepend new thread when given CREATE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1', title: 'Thread 1', upVotesBy: [], downVotesBy: [],
      },
    ];
    const newThread = {
      id: 'thread-2', title: 'Thread 2', upVotesBy: [], downVotesBy: [],
    };
    const action = {
      type: ActionType.CREATE_THREAD,
      payload: { thread: newThread },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toHaveLength(2);
    expect(nextState[0]).toEqual(newThread);
  });

  it('should add userId to upVotesBy when given TOGGLE_VOTE_THREAD with voteType 1', () => {
    const initialState = [
      {
        id: 'thread-1', title: 'Thread 1', upVotesBy: [], downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-1', voteType: 1 },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toContain('user-1');
    expect(nextState[0].downVotesBy).not.toContain('user-1');
  });

  it('should add userId to downVotesBy when given TOGGLE_VOTE_THREAD with voteType -1', () => {
    const initialState = [
      {
        id: 'thread-1', title: 'Thread 1', upVotesBy: [], downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-1', voteType: -1 },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].downVotesBy).toContain('user-1');
    expect(nextState[0].upVotesBy).not.toContain('user-1');
  });

  it('should remove userId from both arrays when given TOGGLE_VOTE_THREAD with voteType 0', () => {
    const initialState = [
      {
        id: 'thread-1', title: 'Thread 1', upVotesBy: ['user-1'], downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-1', voteType: 0 },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).not.toContain('user-1');
    expect(nextState[0].downVotesBy).not.toContain('user-1');
  });
});
