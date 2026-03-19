/**
 * Skenario pengujian untuk asyncReceiveLeaderboards thunk:
 *
 * 1. Dispatch receiveLeaderboards dengan data saat sukses
 * 2. Alert dan tetap dispatch unsetIsLoading saat gagal
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncReceiveLeaderboards } from '../../../src/states/leaderboards/action.js';

const fakeLeaderboards = [
  { user: { id: 'user-1', name: 'febss rasy', avatar: 'url' }, score: 10 },
  { user: { id: 'user-2', name: 'feb rasy', avatar: 'url' }, score: 5 },
];

vi.mock('../../../src/utils/api.js', () => ({
  getLeaderboards: vi.fn(),
}));

vi.mock('../../../src/states/isLoading/action.js', () => ({
  setIsLoading: vi.fn(() => ({ type: 'SET_IS_LOADING' })),
  unsetIsLoading: vi.fn(() => ({ type: 'UNSET_IS_LOADING' })),
}));

describe('asyncReceiveLeaderboards thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch receiveLeaderboards when data fetching succeeds', async () => {
    const api = await import('../../../src/utils/api.js');
    api.getLeaderboards.mockResolvedValue(fakeLeaderboards);

    const dispatch = vi.fn();
    await asyncReceiveLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_IS_LOADING' });
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'RECEIVE_LEADERBOARDS',
        payload: { leaderboards: fakeLeaderboards },
      }),
    );
    expect(dispatch).toHaveBeenCalledWith({ type: 'UNSET_IS_LOADING' });
  });

  it('should alert and still dispatch unsetIsLoading when data fetching fails', async () => {
    const api = await import('../../../src/utils/api.js');
    api.getLeaderboards.mockRejectedValue(new Error('Server error'));
    window.alert = vi.fn();

    const dispatch = vi.fn();
    await asyncReceiveLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_IS_LOADING' });
    expect(window.alert).toHaveBeenCalledWith('Server error');
    expect(dispatch).toHaveBeenCalledWith({ type: 'UNSET_IS_LOADING' });
  });
});
