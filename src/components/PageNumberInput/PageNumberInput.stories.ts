import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import PageNumberInput from ".";
import { any } from "prop-types";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/PageNumber",
  component: PageNumberInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    perPage: Number,
    disabled: Boolean,
    setPerPage: any,
  },
} satisfies Meta<typeof PageNumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    perPage: 11,
    disabled: false,
    setPerPage: () => null,
  },
};
