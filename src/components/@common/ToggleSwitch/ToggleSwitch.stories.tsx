import { Meta, StoryObj } from "@storybook/react";
import ToggleSwitch from "./ToggleSwitch";

const meta = {
  title: 'button/ToggleSwitch',
  component: ToggleSwitch,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    isEnabled: {
      control: 'boolean',
      defaultvalue: false,
    },
  }
} satisfies Meta<typeof ToggleSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isEnabled: false
  }
};