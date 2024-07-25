import type {Meta, StoryObj} from '@storybook/react';

import {Typography} from './Typography.tsx';

const meta = {
  title: 'text/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fontWeight: {
      control: 'options',
      description: 'fontWeight를 설정해주세요.',
      options: ['MEDIUM', 'LIGHT', 'BOLD'],
    },
    children: {
      control: 'text',
      description: '텍스트 내용',
    },
    className: {
      control: 'text',
      description: '스타일 내용을 작성해주세요.(native-wind)',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fontWeight: 'BOLD',
    children: '텍스트 내용입니다.',
  },
};
