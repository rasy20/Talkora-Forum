import React from 'react';
/**
 * Skenario pengujian untuk komponen ThreadItem:
 *
 * 1. Merender judul thread, kategori, dan nama penulis
 * 2. Merender jumlah vote dan komentar
 * 3. Memanggil onUpVote saat tombol upvote diklik
 */

import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ThreadItem from '../../src/components/thread/ThreadItem';

const fakeThread = {
  id: 'thread-1',
  title: 'Judul Thread Pertama',
  body: '<p>Isi dari thread pertama</p>',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 5,
};

const fakeUser = {
  id: 'user-1',
  name: 'febss rasy',
  avatar: 'https://ui-avatars.com/api/?name=John',
};

const fakeAuthUser = {
  id: 'user-2',
  name: 'feb rasy',
};

function renderThreadItem(props = {}) {
  return render(
    <MemoryRouter>
      <ThreadItem
        thread={fakeThread}
        user={fakeUser}
        authUser={fakeAuthUser}
        onUpVote={props.onUpVote || (() => {})}
        onDownVote={props.onDownVote || (() => {})}
      />
    </MemoryRouter>,
  );
}

describe('ThreadItem component', () => {
  it('should render thread title, category, and author name', () => {
    renderThreadItem();

    expect(screen.getByText('Judul Thread Pertama')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('febss rasy')).toBeInTheDocument();
  });

  it('should render vote counts and comment count', () => {
    renderThreadItem();

    const zeroCounts = screen.getAllByText('0');
    expect(zeroCounts).toHaveLength(2);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should call onUpVote when upvote button is clicked', async () => {
    const mockOnUpVote = vi.fn();
    renderThreadItem({ onUpVote: mockOnUpVote });

    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[1]); // buttons[0] is the article, buttons[1] is upvote

    expect(mockOnUpVote).toHaveBeenCalledWith('thread-1', 1);
  });
});
