import type { Meta, StoryObj } from "@storybook/react";
import FilterButton from ".";

const meta = {
  title: "FilterButton",
  component: FilterButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
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
} satisfies Meta<typeof FilterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const WhileLoading: Story = {
  args: {
    isLoading: true,
  },
};

export const WhileNoData: Story = {
  args: {
    isDisabled: true,
  },
};
