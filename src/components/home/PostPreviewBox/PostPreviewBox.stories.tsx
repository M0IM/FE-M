import { Meta, StoryObj } from "@storybook/react";
import PostPreviewBox from "./PostPreviewBox";

const meta = {
  title: 'box/PostPreviewBox',
  component: PostPreviewBox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    postList: {
      control: 'object',
      description: '게시글 object를 입력해주세요.',
      defaultValue: {}
    }
  }
} satisfies Meta<typeof PostPreviewBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    postList: ''
  }
};