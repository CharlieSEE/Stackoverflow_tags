import type { Meta, StoryObj } from "@storybook/react";
import TableContent from ".";

const meta = {
  title: "TableContent",
  component: TableContent,
  tags: ["autodocs"],
} satisfies Meta<typeof TableContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    rows: [
      { name: "tag1", count: 323232 },
      { name: "tag2", count: 9832932 },
    ],
  },
};
