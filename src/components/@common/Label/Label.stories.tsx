import { Meta, StoryObj } from "@storybook/react";
import Label from "./Label";

const meta = {
  title: 'icon/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      description: '라벨의 색상을 선택해주세요.',
      options: ['main', 'gray', 'dark']
    },
    variant: {
      control: 'select',
      description: '라벨의 유형을 선택해주세요',
      options: ['filled', 'outlined']
    },
    label: {
      control: 'text',
      description: '라벨의 문구를 입력해주세요.',
      defaultValue: '모임장'
    }
  }
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  args: {
    color: 'dark',
    variant: 'outlined',
    label: '모임장'
  }
};

export const Filled: Story = {
  args: {
    color: 'main',
    variant: 'filled',
    label: '모임장'
  }
};