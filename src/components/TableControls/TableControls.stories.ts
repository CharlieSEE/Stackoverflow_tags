import type { Meta, StoryObj } from "@storybook/react";
import TableControls from ".";
import { SortingValues } from "../Table";

const meta = {
  title: "TableControls",
  component: TableControls,

  tags: ["autodocs"],
} satisfies Meta<typeof TableControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    tags: [
      { name: "tag1", count: 323232 },
      { name: "tag2", count: 9832932 },
    ],
    isLoading: false,
    isDisabled: false,
    selectedSorting: SortingValues.DESCENDING,
    setSelectedSorting: () => null,
    selectedTag: "",
    setSelectedTag: () => null,
    perPage: 25,
    setPerPage: () => null,
    pageCount: 1,
    setPageCount: () => null,
    hasMore: true,
  },
};
