/**
 * Skenario pengujian untuk leaderboardsReducer:
 *
 * 1. Mengembalikan [] sebagai initial state jika action tidak dikenal
 * 2. RECEIVE_LEADERBOARDS — mengganti data leaderboards dengan data baru
 */

import { describe, it, expect } from 'vitest';
import leaderboardsReducer from '../../../src/states/leaderboards/reducer';
import { ActionType } from '../../../src/states/leaderboards/action';

describe('leaderboardsReducer', () => {
  it('should return empty array as initial state when given unknown action', () => {
    const nextState = leaderboardsReducer(undefined, { type: 'UNKNOWN' });

    expect(nextState).toEqual([]);
  });

  it('should return leaderboards when given RECEIVE_LEADERBOARDS action', () => {
    const leaderboards = [
      { user: { id: 'user-1', name: 'febss rasy', avatar: 'url' }, score: 10 },
      { user: { id: 'user-2', name: 'feb rasy', avatar: 'url' }, score: 5 },
    ];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: { leaderboards },
    };

    const nextState = leaderboardsReducer([], action);

    expect(nextState).toEqual(leaderboards);
  });
});
