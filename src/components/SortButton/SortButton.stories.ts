import type { Meta, StoryObj } from "@storybook/react";
import SortButton from ".";
import { SortingValues } from "../Table";

const meta = {
  title: "SortButton",
  component: SortButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    selectedValue: SortingValues.DESCENDING,
    setSelectedValue: () => null,
    disabled: false,
  },
  argTypes: {
    selectedValue: {
      options: [SortingValues.DESCENDING, SortingValues.ASCENDING],
    },
  },
} satisfies Meta<typeof SortButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
