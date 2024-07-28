import { Meta, StoryObj } from "@storybook/react";
import SpaceCard from "./SpaceCard";

const meta = {
  title: 'card/SpaceCard',
  component: SpaceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    uri: {
      control: 'text',
      description: '이미지 uri을 입력해주세요.',
      defaultValue: 'https://images.unsplash.com/photo-1721760887035-8b65f87c5c9b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fCVFQiVCMCVCMCVFQiU5MyU5QyVFQiVBRiVCQyVFRCU4NCVCNHxlbnwwfHwwfHx8MA%3D%3D',
    },
    spaceName: {
      control: 'text',
      descrption: '모임 이름을 입력해주세요.',
      defaultValue: '우리 동네 배드민턴'
    }
  }
} satisfies Meta<typeof SpaceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    uri: 'https://images.unsplash.com/photo-1721760887035-8b65f87c5c9b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fCVFQiVCMCVCMCVFQiU5MyU5QyVFQiVBRiVCQyVFRCU4NCVCNHxlbnwwfHwwfHx8MA%3D%3D',
    spaceName: '우리 동네 배드민턴'
  }
};