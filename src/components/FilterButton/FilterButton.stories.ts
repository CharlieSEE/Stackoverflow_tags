import type { Meta, StoryObj } from "@storybook/react";
import FilterButton from ".";

const meta = {
  title: "FilterButton",
  component: FilterButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FilterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    tags: [
      { name: "tag1", count: 1 },
      { name: "tag2", count: 1 },
      { name: "tag3", count: 1 },
    ],
    isLoading: false,
    isDisabled: false,
    setSelectedTag: () => null,
  },
};
