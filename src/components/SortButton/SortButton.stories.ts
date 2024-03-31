import type { Meta, StoryObj } from "@storybook/react";
import SortButton from ".";
import { any } from "prop-types";
import { SortingValues } from "../Table";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/SortButton",
  component: SortButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SortButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    selectedValue: SortingValues.DESCENDING,
    setSelectedValue: () => null,
    disabled: false,
  },
};
