import type {Meta, StoryObj} from '@storybook/react';
import {CustomButton} from './CustomButton.tsx';

const meta = {
  title: 'button/CustomButton',
  component: CustomButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '버튼의 텍스트를 입력해주세요.',
      defaultValue: '야호 고구마',
    },
    variant: {
      control: 'select',
      description: '버튼의 variant를 골라주세요.',
      defaultValue: 'filled',
    },
    size: {
      control: 'select',
      description: '버튼의 size를 골라주세요.',
      defaultValue: 'large',
    },
    inValid: {
      control: 'boolean',
      description: '버튼의 disabled 여부를 선택해주세요',
      defaultValue: false,
    },
    textStyle: {
      control: 'text',
      description: '버튼의 텍스트 스타일을 덮어씌울 수 있습니다.',
    },
    className: {
      control: 'text',
      description: '버튼 자체의 스타일을 덮어씌울 수 있습니다.',
    },
    icon: {
      control: 'string',
      description: '버튼의 이미지를 넣을 수 있습니다.',
    },
  },
} satisfies Meta<typeof CustomButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '야호 고구마',
    variant: 'filled',
  },
};

export const Filled: Story = {
  args: {
    label: '야호 고구마',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    label: '야호 사자',
    variant: 'outlined',
  },
};

export const Disabled: Story = {
  args: {
    label: '야호 사자',
    variant: 'outlined',
    disabled: true,
  },
};
