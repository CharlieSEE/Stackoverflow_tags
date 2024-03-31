import type { Meta, StoryObj } from "@storybook/react";
import Table from ".";


const meta = {
  title: "TagTable",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {};
