import { Meta, StoryObj } from "@storybook/react";
import MySpaceCard from "./MySpaceCard";

const meta = {
  title: 'card/MySpaceCard',
  component: MySpaceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'object',
      description: '카드 우측에 표시할 요소를 입력해주세요.',
      defaultValue: <></>
    },
    spaceName: {
      control: 'text',
      description: '모임 이름을 입력해주세요.',
      defaultValue: '우리 동네 배드민턴'
    },
    spaceImg: {
      control: 'text',
      description: '모임 대표 이미지를 입력해주세요.',
      defaultValue: ''
    },
    description: {
      control: 'text',
      desciption: '모임 소개를 입력해주세요.',
      defaultValue: ''
    },
    category: {
      control: 'text',
      description: '모임 카테고리를 입력해주세요.',
      defaultValue: '외국/언어'
    },
    region: {
      control: 'text',
      description: '모임 활동 지역을 입력해주세요.',
      defaultValue: '서울'
    },
    memberCount: {
      control: 'number',
      description: '모임 참여 인원을 입력해주세요.',
      defaultValue: 6
    }
  }
} satisfies Meta<typeof MySpaceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <></>,
    spaceName: '우리 동네 배드민턴',
    spaceImg: '',
    description: '',
    category: '외국/언어',
    region: '서울',
    memberCount:6
  }
};