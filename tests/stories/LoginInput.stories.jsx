import LoginInput from '../../src/components/auth/LoginInput';
import '../../src/styles/global.css';

const meta = {
  title: 'Auth/LoginInput',
  component: LoginInput,
  tags: ['autodocs'],
  argTypes: {
    onLogin: { action: 'login submitted' },
  },
};

export default meta;

export const Default = {
  args: {},
};
