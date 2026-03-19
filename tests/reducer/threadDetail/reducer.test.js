/**
 * Skenario pengujian untuk threadDetailReducer:
 *
 * 1. Mengembalikan null sebagai initial state jika action tidak dikenal
 * 2. RECEIVE_THREAD_DETAIL — menetapkan detail thread
 * 3. CLEAR_THREAD_DETAIL — mengembalikan state ke null
 * 4. CREATE_COMMENT — menambahkan komentar baru ke array comments
 * 5. TOGGLE_VOTE_THREAD_DETAIL — upvote menambah userId ke upVotesBy
 * 6. TOGGLE_VOTE_COMMENT — upvote pada komentar spesifik
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from '../../../src/states/threadDetail/reducer';
import { ActionType } from '../../../src/states/threadDetail/action';

describe('threadDetailReducer', () => {
  it('should return null as initial state when given unknown action', () => {
    const nextState = threadDetailReducer(undefined, { type: 'UNKNOWN' });

    expect(nextState).toBeNull();
  });

  it('should set thread detail when given RECEIVE_THREAD_DETAIL action', () => {
    const threadDetail = {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Body 1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail },
    };

    const nextState = threadDetailReducer(null, action);

    expect(nextState).toEqual(threadDetail);
  });

  it('should return null when given CLEAR_THREAD_DETAIL action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread 1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toBeNull();
  });

  it('should append comment when given CREATE_COMMENT action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread 1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const newComment = {
      id: 'comment-1',
      content: 'Komentar pertama',
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.CREATE_COMMENT,
      payload: { comment: newComment },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments).toHaveLength(1);
    expect(nextState.comments[0]).toEqual(newComment);
  });

  it('should add userId to upVotesBy when given TOGGLE_VOTE_THREAD_DETAIL with voteType 1', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread 1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD_DETAIL,
      payload: { userId: 'user-1', voteType: 1 },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.upVotesBy).toContain('user-1');
  });

  it('should add userId to upVotesBy of specific comment when given TOGGLE_VOTE_COMMENT', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread 1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'test',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.TOGGLE_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1', voteType: 1 },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments[0].upVotesBy).toContain('user-1');
  });
});
