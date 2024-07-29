import { Meta, StoryObj } from "@storybook/react";
import ProfileBar from "./ProfileBar";

const meta = {
  title: 'bar/ProfileBar',
  component: ProfileBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    uri: {
      control: 'text',
      description: '유저 이미지 uri를 입력해주세요.',
      defaultValue: '',
    },
    username: {
      control: 'text',
      description: '유저 이름을 입력해주세요.',
      defaultValue: '차다인',
    },
    label: {
      control: 'text',
      description: '라벨의 문구를 입력해주세요.',
      defaultValue: ''
    }
  }
} satisfies Meta<typeof ProfileBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    uri: '',
    username: '차다인',
    label: '모임장'
  }
};