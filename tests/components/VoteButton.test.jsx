import React from 'react';
/**
 * Skenario pengujian untuk komponen VoteButton:
 *
 * 1. Merender ikon upvote (SVG) dan jumlah count untuk type="up"
 * 2. Merender ikon downvote (SVG) dan jumlah count untuk type="down"
 * 3. Memanggil onVote saat tombol diklik
 * 4. Menerapkan class yang sesuai saat isVoted true
 */

import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButton from '../../src/components/common/VoteButton';

describe('VoteButton component', () => {
  it('should render upvote icon and count for type="up"', () => {
    const { container } = render(
      <VoteButton type="up" count={10} isVoted={false} onVote={() => {}} />,
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should render downvote icon and count for type="down"', () => {
    const { container } = render(
      <VoteButton type="down" count={3} isVoted={false} onVote={() => {}} />,
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should call onVote when button is clicked', async () => {
    const mockOnVote = vi.fn();
    render(<VoteButton type="up" count={0} isVoted={false} onVote={mockOnVote} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(mockOnVote).toHaveBeenCalledTimes(1);
  });

  it('should have correct state class when isVoted is true for upvote', () => {
    const { container } = render(
      <VoteButton type="up" count={1} isVoted onVote={() => {}} />,
    );

    const button = container.querySelector('button');
    expect(button.className).toContain('upVoted');
  });
});
