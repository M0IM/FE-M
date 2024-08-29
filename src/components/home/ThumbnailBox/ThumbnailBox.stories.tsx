import { Meta, StoryObj } from "@storybook/react";
import ThumbnailBox from "./ThumbnailBox";

const meta = {
  title: 'box/ThubnailBox',
  component: ThumbnailBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    thumbnail: {
      control: 'text',
      description: '모임 소개 영상 썸네일 uri를 입력해주세요.',
      defaultValue: 'https://images.unsplash.com/photo-1721497683471-0b27ad466e23?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MHx8fGVufDB8fHx8fA%3D%3D'
    },
    spaceName: {
      control: 'text',
      description: '모임 이름을 입력해주세요.',
      defaultValue: '풍경찍는 모임'
    },
    spaceImg: {
      control: 'text',
      description: '모임 대표 사진 uri를 입력해주세요.',
      defaultValue: ''
    }
  }
} satisfies Meta<typeof ThumbnailBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    thumbnail: 'https://images.unsplash.com/photo-1721497683471-0b27ad466e23?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MHx8fGVufDB8fHx8fA%3D%3D',
    spaceName: '풍경찍는 모임',
    spaceImg: ''
  }
};