import { TableContainer, Paper, CircularProgress } from "@mui/material";
import { useMemo, useState } from "react";
import useTags from "../../api/useTags";
import type { Tag } from "../../api/useTags";
import TableControls from "../TableControls";
import TableContent from "../TableContent";

export enum SortingValues {
  DESCENDING = "Descending",
  ASCENDING = "Ascending",
}

export default function Table() {
  const [pageCount, setPageCount] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedSorting, setSelectedSorting] = useState<SortingValues>(
    SortingValues.DESCENDING
  );

  const { tags, isLoading, error, hasMore } = useTags({
    page: pageCount.toString(),
    pageSize: perPage.toString(),
  });

  const rows = useMemo(() => {
    if (selectedTag) return tags?.filter((tag) => tag.name === selectedTag);

    return selectedSorting === SortingValues.DESCENDING
      ? tags?.sort((tagA: Tag, tagB: Tag) => {
          return tagB.count - tagA.count;
        })
      : tags?.sort((tagA: Tag, tagB: Tag) => {
          return tagA.count - tagB.count;
        });
  }, [selectedSorting, selectedTag, tags]);

  const isDisabled = useMemo(() => isLoading || !tags, [isLoading, tags]);

  if (error)
    return <div>There was an error while fetching data: {error.message}</div>;

  return (
    <TableContainer component={Paper}>
      <TableControls
        tags={tags}
        isLoading={isLoading}
        isDisabled={isDisabled}
        selectedSorting={selectedSorting}
        setSelectedSorting={setSelectedSorting}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        perPage={perPage}
        setPerPage={setPerPage}
        pageCount={pageCount}
        setPageCount={setPageCount}
        hasMore={hasMore}
      />
      {isLoading ? <CircularProgress /> : <TableContent rows={rows} />}
    </TableContainer>
  );
}
