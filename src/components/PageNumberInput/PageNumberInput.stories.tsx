import type { Meta, StoryObj } from "@storybook/react";
import PageNumberInput from ".";

const meta = {
  title: "PageNumber",
  component: PageNumberInput,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    perPage: { control: { type: "number" } },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageNumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    perPage: 11,
    disabled: false,
    setPerPage: () => null,
  },
};
