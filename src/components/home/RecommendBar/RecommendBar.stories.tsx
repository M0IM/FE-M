import { Meta, StoryObj } from "@storybook/react";
import RecommendBar from "./RecommendBar";

const meta = {
  title: 'bar/RecommendBar',
  component: RecommendBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    profileImg: {
      control: 'text',
      description: '프로필 사진 uri를 입력해주세요.',
      defaultValue: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fCVFQSVCMyVBMCVFQyU5NiU5MSVFQyU5RCVCNHxlbnwwfHwwfHx8MA%3D%3D'
    },
    username: {
      control: 'text',
      description: '유저 이름을 입력해주세요.',
      defaultValue: '다인'
    }
  }
} satisfies Meta<typeof RecommendBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    profileImg: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fCVFQSVCMyVBMCVFQyU5NiU5MSVFQyU5RCVCNHxlbnwwfHwwfHx8MA%3D%3D',
    username: '다인'
  }
};