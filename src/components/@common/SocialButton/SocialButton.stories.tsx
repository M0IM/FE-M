import type {Meta, StoryObj} from '@storybook/react';

import {SocialButton} from './SocialButton';

const meta = {
  title: 'button/Typography',
  component: SocialButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    provider: {
      control: 'select',
      description: '어떠한 소셜로그인 provider인지 선택해주세요.',
      options: ['KAKAO', 'APPLE', 'GOOGLE', 'NAVER'],
    },
    size: {
      control: 'select',
      description: '크기를 선택해주세요.',
      options: ['SM', 'MD', 'LG'],
    },
    onPress: {
      action: 'clicked',
      description: '버튼 클릭 이벤트',
    },
  },
} satisfies Meta<typeof SocialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Apple: Story = {
  args: {
    provider: 'APPLE',
    size: 'MD',
  },
};

export const Google: Story = {
  args: {
    provider: 'GOOGLE',
    size: 'MD',
  },
};

export const Kakao: Story = {
  args: {
    provider: 'KAKAO',
    size: 'MD',
  },
};

export const Naver: Story = {
  args: {
    provider: 'NAVER',
    size: 'MD',
  },
};
