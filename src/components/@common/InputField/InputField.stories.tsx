import type {Meta, StoryObj} from '@storybook/react';

import {InputField} from './InputField.tsx';

const meta = {
  title: 'input/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'disabled 속성을 선택해주세요.',
    },
    error: {
      control: 'string',
      description: '에러 메세지를 입력해주세요.',
    },
    touched: {
      control: 'boolean',
      description: 'Input에 UserInteraction이 있을 경우.',
    },
    icon: {
      control: 'string',
      description: '아이콘을 넣어주세요',
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    error: '비밀번호가 일치하지 않습니다.',
    touched: false,
  },
};

export const Error: Story = {
  args: {
    disabled: true,
    error: '비밀번호가 일치하지 않습니다.',
    touched: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    error: 'Input이 disabled된 상태입니다.',
    touched: false,
  },
};
