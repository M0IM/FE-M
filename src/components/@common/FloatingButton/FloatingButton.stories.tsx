import { Meta, StoryObj } from "@storybook/react";
import FloatingButton from "./FloatingButton";

const meta = {
    title: 'button/FloatingButton',
    component: FloatingButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            description: '플로팅 버튼의 타입을 선택해주세요.',
            options: ['add', 'write']
        }
    }
} satisfies Meta<typeof FloatingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Add: Story = {
    args: {
        type: 'add'
    }
};

export const Write: Story = {
    args: {
        type: 'write'
    }
};