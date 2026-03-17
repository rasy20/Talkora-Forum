/**
 * Skenario pengujian untuk asyncPopulateUsersAndThreads thunk:
 *
 * 1. Dispatch receiveUsers dan receiveThreads saat data fetching sukses
 * 2. Dispatch alert saat data fetching gagal
 */

import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import { asyncPopulateUsersAndThreads } from '../../../src/states/shared/action.js';

const fakeUsers = [
  { id: 'user-1', name: 'febss rasy', email: 'febss@example.com' },
];
const fakeThreads = [
  {
    id: 'thread-1', title: 'Thread 1', body: 'Body', upVotesBy: [], downVotesBy: [],
  },
];

// Mock the API module with dynamic import pattern
vi.mock('../../../src/utils/api.js', () => ({
  getAllUsers: vi.fn(),
  getAllThreads: vi.fn(),
}));

// Mock isLoading actions used via static import
vi.mock('../../../src/states/isLoading/action.js', () => ({
  setIsLoading: vi.fn(() => ({ type: 'SET_IS_LOADING' })),
  unsetIsLoading: vi.fn(() => ({ type: 'UNSET_IS_LOADING' })),
}));

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch actions correctly when data fetching succeeds', async () => {
    // Arrange
    const api = await import('../../../src/utils/api.js');
    api.getAllUsers.mockResolvedValue(fakeUsers);
    api.getAllThreads.mockResolvedValue(fakeThreads);

    const dispatch = vi.fn();

    // Action
    await asyncPopulateUsersAndThreads()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_IS_LOADING' });
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'RECEIVE_USERS',
      payload: { users: fakeUsers },
    }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'RECEIVE_THREADS',
      payload: { threads: fakeThreads },
    }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'UNSET_IS_LOADING' });
  });

  it('should dispatch alert when data fetching fails', async () => {
    // Arrange
    const api = await import('../../../src/utils/api.js');
    api.getAllUsers.mockRejectedValue(new Error('Network error'));
    api.getAllThreads.mockRejectedValue(new Error('Network error'));
    window.alert = vi.fn();

    const dispatch = vi.fn();

    // Action
    await asyncPopulateUsersAndThreads()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_IS_LOADING' });
    expect(window.alert).toHaveBeenCalledWith('Network error');
    expect(dispatch).toHaveBeenCalledWith({ type: 'UNSET_IS_LOADING' });
  });
});
