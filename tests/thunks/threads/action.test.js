/**
 * Skenario pengujian untuk asyncToggleVoteThread thunk:
 *
 * 1. Dispatch toggleVoteThread secara optimistis sebelum API call (upvote)
 * 2. Revert vote (dispatch voteType 0) jika API throw error
 * 3. Menampilkan alert dan tidak dispatch jika user belum login
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncToggleVoteThread } from '../../../src/states/threads/action.js';

vi.mock('../../../src/utils/api.js', () => ({
  upVoteThread: vi.fn(),
  downVoteThread: vi.fn(),
  neutralVoteThread: vi.fn(),
}));

describe('asyncToggleVoteThread thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch toggleVoteThread optimistically and call upVoteThread API', async () => {
    const api = await import('../../../src/utils/api.js');
    api.upVoteThread.mockResolvedValue({ id: 'vote-1', voteType: 1 });

    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });

    await asyncToggleVoteThread({ threadId: 'thread-1', voteType: 1 })(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'TOGGLE_VOTE_THREAD',
        payload: { threadId: 'thread-1', userId: 'user-1', voteType: 1 },
      }),
    );
    expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
  });

  it('should revert vote when API call fails', async () => {
    const api = await import('../../../src/utils/api.js');
    api.upVoteThread.mockRejectedValue(new Error('API error'));
    window.alert = vi.fn();

    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });

    await asyncToggleVoteThread({ threadId: 'thread-1', voteType: 1 })(
      dispatch,
      getState,
    );

    // First dispatch: optimistic update
    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        payload: { threadId: 'thread-1', userId: 'user-1', voteType: 1 },
      }),
    );
    // Second dispatch: revert
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        payload: { threadId: 'thread-1', userId: 'user-1', voteType: 0 },
      }),
    );
    expect(window.alert).toHaveBeenCalledWith('API error');
  });

  it('should alert and not dispatch when user is not logged in', async () => {
    window.alert = vi.fn();
    const dispatch = vi.fn();
    const getState = () => ({ authUser: null });

    await asyncToggleVoteThread({ threadId: 'thread-1', voteType: 1 })(
      dispatch,
      getState,
    );

    expect(window.alert).toHaveBeenCalledWith('Anda harus login untuk vote!');
    expect(dispatch).not.toHaveBeenCalled();
  });
});
