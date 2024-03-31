import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  CircularProgress,
  Autocomplete,
  TextField,
} from "@mui/material";
import SortButton from "../SortButton";
import { useMemo, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import useTags from "../../api/useTags";
import type { Tag } from "../../api/useTags";
import PageNumberInput from "../PageNumberInput";

export enum SortingValues {
  DESCENDING = "Descending",
  ASCENDING = "Ascending",
}

const TableComp = ({ rows }: { rows?: Tag[] }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Tags</TableCell>
          <TableCell>Posts</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows &&
          rows?.map((row: any) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.count}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default function TagsTableContainer() {
  const [pageCount, setPageCount] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const { tags, isLoading, error, hasMore } = useTags({
    page: pageCount.toString(),
    pageSize: perPage.toString(),
  });

  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedSorting, setSelectedSorting] = useState<SortingValues>(
    SortingValues.DESCENDING
  );

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
      <Box display={"flex"} flexDirection={"row"} paddingTop={"0.3rem"}>
        {!tags || isLoading ? (
          <TextField disabled label="Filter" />
        ) : (
          <Autocomplete
            disabled={isDisabled}
            disablePortal
            options={tags.map((tag) => tag.name)}
            sx={{ width: "15vw" }}
            renderInput={(params) => <TextField {...params} label="Filter" />}
            onChange={(event: any, newValue: any) => setSelectedTag(newValue)}
          />
        )}
        <SortButton
          disabled={isDisabled}
          selectedValue={selectedSorting}
          setSelectedValue={setSelectedSorting}
        />
        <Box
          display={"flex"}
          marginLeft={"auto"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <Box paddingRight={"0.5rem"}>Amount of rows:</Box>
          <PageNumberInput
            setPerPage={setPerPage}
            perPage={perPage}
            disabled={isDisabled}
          />
          <Box sx={{ marginLeft: "auto" }}>
            <IconButton
              disabled={isDisabled || pageCount === 1}
              onClick={() =>
                setPageCount((prevState) => (prevState > 1 ? prevState - 1 : 1))
              }
              children={<ArrowBackIosNewIcon />}
            />
            Page: {pageCount}
            <IconButton
              disabled={isDisabled || !hasMore || !!selectedTag}
              onClick={() =>
                setPageCount((prevState) =>
                  hasMore ? prevState + 1 : prevState
                )
              }
              children={<ArrowForwardIosIcon />}
            />
          </Box>
        </Box>
      </Box>
      {isLoading ? <CircularProgress /> : <TableComp rows={rows} />}
    </TableContainer>
  );
}
