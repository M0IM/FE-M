import type {Meta, StoryObj} from '@storybook/react';

import {Logo} from './Logo.tsx';

const meta = {
  title: 'icon/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      description: '크기를 선택해주세요.',
      options: ['SM', 'MD', 'LG'],
    },
    background: {
      control: 'select',
      description: '투명 색상인지, 배경이 있는 색상인지 선택해주세요.',
      options: ['TRANSPARENT', 'BACKGROUND'],
    },
    onPress: {
      action: 'clicked',
      description: '버튼 클릭 이벤트',
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Transparent: Story = {
  args: {
    size: 'MD',
    background: 'TRANSPARENT',
  },
};

export const Background: Story = {
  args: {
    size: 'MD',
    background: 'BACKGROUND',
  },
};
