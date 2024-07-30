import { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";

const meta = {
  title: 'icon/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      description: '크기를 선택해주세요.',
      options: ['XS', 'SM', 'MD', 'LG']
    },
    uri: {
      control: 'text',
      description: '유저 이미지 uri를 입력해주세요.',
      defaultValue: ''
    },
    iconColor: {
      control: 'text',
      description: '기본 유저 아이콘 색상을 입력해주세요.',
      defaultValue: '#E9ECEF'
    }
  }
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'SM',
    uri: '',
    iconColor: ''
  }
};

export const UserImg: Story = {
  args: {
    size: 'MD',
    uri: 'https://images.unsplash.com/photo-1721670472474-2f5e2fa80fd0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D',
    iconColor: ''
  }
};