import { Meta, StoryObj } from "@storybook/react";
import ScheduleBox from "./ScheduleBox";

const meta = {
    title: 'box/ScheduleBox',
    component: ScheduleBox,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: '일정 제목을 입력해주세요.',
            defaultValue: '매주 월요일 정기 스터디'
        },
        startTime: {
            control: 'text',
            description: '일정 날짜를 입력해주세요.',
            defaultValue: '오후 5 : 30'
        },
        bottomText: {
            control: 'text',
            description: '날짜 밑에 넣을 문구를 입력해주세요.',
            defaultValue: '상명대학교 G208'
        },
        isRegistered: {
            control: 'boolean',
            description: '일정 참여 신청 여부를 알려주세요.',
            defaultValue: true,
        }
    }
} satisfies Meta<typeof ScheduleBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: '일정 제목을 입력해주세요.',
        startTime: '오후 5 : 30',
        bottomText: '상명대학교 G208',
        isRegistered: true
    }
};