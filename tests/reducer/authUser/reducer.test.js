/**
 * Skenario pengujian untuk authUserReducer:
 *
 * 1. Mengembalikan null sebagai initial state jika action tidak dikenal
 * 2. SET_AUTH_USER — menetapkan data user yang terautentikasi
 * 3. UNSET_AUTH_USER — menghapus data user (kembali null)
 */

import { describe, it, expect } from 'vitest';
import authUserReducer from '../../../src/states/authUser/reducer';
import { ActionType } from '../../../src/states/authUser/action';

describe('authUserReducer', () => {
  it('should return null as initial state when given unknown action', () => {
    const nextState = authUserReducer(undefined, { type: 'UNKNOWN' });

    expect(nextState).toBeNull();
  });

  it('should set authUser when given SET_AUTH_USER action', () => {
    const authUser = {
      id: 'user-1',
      name: 'febss rasy',
      email: 'febss@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser },
    };

    const nextState = authUserReducer(null, action);

    expect(nextState).toEqual(authUser);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    const initialState = {
      id: 'user-1',
      name: 'febss rasy',
      email: 'febss@example.com',
    };
    const action = { type: ActionType.UNSET_AUTH_USER };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBeNull();
  });
});
