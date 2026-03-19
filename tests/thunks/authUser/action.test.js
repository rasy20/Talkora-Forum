/**
 * Skenario pengujian untuk asyncSetAuthUser thunk:
 *
 * 1. Dispatch setAuthUser dengan profil user setelah login sukses
 * 2. Menampilkan alert dan tidak dispatch setAuthUser jika login gagal
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncSetAuthUser } from '../../../src/states/authUser/action.js';

vi.mock('../../../src/utils/api.js', () => ({
  login: vi.fn(),
  putAccessToken: vi.fn(),
  getOwnProfile: vi.fn(),
}));

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch setAuthUser when login succeeds', async () => {
    const fakeToken = 'fake-token-123';
    const fakeUser = {
      id: 'user-1',
      name: 'febss rasy',
      email: 'febss@example.com',
    };

    const api = await import('../../../src/utils/api.js');
    api.login.mockResolvedValue(fakeToken);
    api.getOwnProfile.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();

    await asyncSetAuthUser({
      email: 'febss@example.com',
      password: 'password',
    })(dispatch);

    expect(api.login).toHaveBeenCalledWith({
      email: 'febss@example.com',
      password: 'password',
    });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'SET_AUTH_USER',
        payload: { authUser: fakeUser },
      }),
    );
  });

  it('should alert and not dispatch setAuthUser when login fails', async () => {
    const api = await import('../../../src/utils/api.js');
    api.login.mockRejectedValue(new Error('Email or password is wrong'));
    window.alert = vi.fn();

    const dispatch = vi.fn();

    await asyncSetAuthUser({ email: 'wrong@email.com', password: 'wrong' })(
      dispatch,
    );

    expect(window.alert).toHaveBeenCalledWith('Email or password is wrong');
    expect(dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'SET_AUTH_USER',
      }),
    );
  });
});
