import { Meta, StoryObj } from "@storybook/react";
import ScheduleCard from "./ScheduleCard";

const meta = {
  title: 'card/ScheduleCard',
  component: ScheduleCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    schedule: {
      control: 'text',
      description: '일정 제목을 입력해주세요.',
      defaultValue: '매주 월요일 정기 스터디'
    },
    date: {
      control: 'text',
      description: '일정 날짜를 입력해주세요.',
      defaultValue: '2024년 07월 24일 오후 5:30'
    },
    time: {
      control: 'text',
      description: '일정 시간을 입력해주세요.',
      defaultValue: '3시간 후'
    },
    spaceName: {
      control: 'text',
      description: '모임 이름을 입력해주세요.',
      defaultValue: '우리 동네 배드민턴'
    },
  }
} satisfies Meta<typeof ScheduleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    schedule: '매주 월요일 정기 스터디',
    date: '2024년 07월 24일 오후 5:30',
    time: '3시간 후',
    spaceName: '우리 동네 배드민턴'
  },
};