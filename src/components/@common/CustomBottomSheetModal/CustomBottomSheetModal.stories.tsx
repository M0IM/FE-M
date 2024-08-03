import { Meta, StoryObj } from "@storybook/react";
import CustomBottomSheetModal from "./CustomBottomSheetModal";

const meta = {
    title: 'modal/CustomBottomSheetModal',
    component: CustomBottomSheetModal,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'object',
            description: '바텀 시트에 표시될 UI를 입력해주세요.',
            defaultValue: <></>
        },
        minHeight: {
            control: 'text',
            description: '바텀 시트의 최소 높이를 입력해주세요.'
        },
        maxHeight: {
            control: 'text',
            description: '바텀 시트의 최대 높이를 입력해주세요.'
        }
    }
} satisfies Meta<typeof CustomBottomSheetModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <></>,
        minHeight: '25%',
        maxHeight: '80%'
    }
};