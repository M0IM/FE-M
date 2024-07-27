import { Meta, StoryObj } from "@storybook/react";
import SpacePreviewCard from "./SpacePreviewCard";

const meta = {
  title: 'card/SpacePreviewCard',
  component: SpacePreviewCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    spaceImg: {
      control: 'text',
      description: '모임 대표 이미지 uri를 입력해주세요.',
      defaultValue: ''
    },
    spaceName: {
      control: 'text',
      descripiton: '모임 이름을 입력해주세요.',
      defaultValue: '우리 동네 배드민턴'
    },
    memberCount: {
      control: 'number',
      description: '모임 멤버 수를 입력해주세요.',
      defaultValue: 20,
    },
    region: {
      control: 'text',
      description: '모임 활동 지역을 입력해주세요.',
      defaultValue: '서울'
    }
  }
} satisfies Meta<typeof SpacePreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    spaceImg: '',
    spaceName: '우리 동네 배드민턴',
    memberCount: 20,
    region: '서울'
  }
};