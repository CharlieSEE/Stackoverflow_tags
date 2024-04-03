import type { Meta, StoryObj } from "@storybook/react";
import PageNumberInput from ".";

const meta = {
  title: "PageNumber",
  component: PageNumberInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    perPage: { control: { disable: true } },
  },
  args: {
    perPage: 25,
    disabled: false,
    setPerPage: () => null,
  },
} satisfies Meta<typeof PageNumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
