import VoteButton from '../../src/components/common/VoteButton';
import '../../src/styles/global.css';

const meta = {
  title: 'Common/VoteButton',
  component: VoteButton,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['up', 'down'] },
    onVote: { action: 'voted' },
  },
};

export default meta;

export const UpVoteActive = {
  args: {
    type: 'up',
    count: 10,
    isVoted: true,
  },
};

export const UpVoteInactive = {
  args: {
    type: 'up',
    count: 2,
    isVoted: false,
  },
};

export const DownVoteActive = {
  args: {
    type: 'down',
    count: 5,
    isVoted: true,
  },
};
