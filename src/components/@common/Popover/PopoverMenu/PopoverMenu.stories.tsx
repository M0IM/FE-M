import { Meta, StoryObj } from "@storybook/react";
import PopoverMenu from "./PopoverMenu";

const meta = {
    title: 'button/PopoverMenu',
    component: PopoverMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        isPopover: {
            control: 'boolean',
            description: '팝오버되었는지 여부를 알려주세요.',
            defaultValue: true,
        },
        menu: {
            control: 'object',
            description: '메뉴로 보여줄 리스트를 입력해주세요.',
            defaultValue: []
        }
    }
} satisfies Meta<typeof PopoverMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isPopover: true,
        menu: [
            {
                id: 1,
                title: '전체',
                onPress: () => console.log(1)
            }
        ]
    }
};