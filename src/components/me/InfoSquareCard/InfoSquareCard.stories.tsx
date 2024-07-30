import { Meta, StoryObj } from "@storybook/react";
import InfoSquareCard from "./InfoSquareCard";

const meta = {
  title: 'card/InfoSquareCard',
  component: InfoSquareCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'object',
      description: '카드에 표시할 요소를 입력해주세요.',
      defaultValue: <></>,
    },
    title: {
      control: 'text',
      description: '카드의 제목을 입력해주세요',
      defaultValue: '문의하기'
    }
  }
} satisfies Meta<typeof InfoSquareCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <></>,
    title: '문의하기'
  }
};