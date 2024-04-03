import type { Meta, StoryObj } from "@storybook/react";
import TableControls from ".";
import { SortingValues } from "../Table";

const meta = {
  title: "TableControls",
  component: TableControls,
  args: {
    tags: [
      { name: "tag1", count: 323232 },
      { name: "tag2", count: 9832932 },
      { name: "tag3", count: 25435 },
      { name: "tag4", count: 756778 },
    ],
    isLoading: false,
    isDisabled: false,
    selectedSorting: SortingValues.DESCENDING,
    setSelectedSorting: () => null,
    selectedTag: null,
    setSelectedTag: () => null,
    perPage: 25,
    setPerPage: () => null,
    pageCount: 1,
    setPageCount: () => null,
    hasMore: true,
  },
  argTypes: {
    selectedSorting: {
      options: [SortingValues.DESCENDING, SortingValues.ASCENDING],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TableControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const WhileLoading: Story = {
  args: {
    isLoading: true,
    isDisabled: true,
  },
};

export const WhileNoData: Story = {
  args: {
    isDisabled: true,
  },
};

export const WhenNoMoreToLoad: Story = {
  args: {
    hasMore: false,
  },
};
