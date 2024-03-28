import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Input,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SortButton from "../SortButton";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import useTags from "../../api/useTags";
import type { Tag } from "../../api/useTags";

const TableComp = ({ rows }: { rows: Tag[] | null }) => {
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
  const {
    tags: resTags,
    isLoading,
    error,
    hasMore,
  } = useTags({
    page: pageCount.toString(),
    pageSize: perPage.toString(),
  });
  const [tags, setTags] = useState(resTags);

  useEffect(() => {
    setTags(resTags);
  }, [resTags]);

  if (error)
    return <div>There was an error while fetching data: {error.message}</div>;

  return (
    <TableContainer component={Paper}>
      <Box display={"flex"} flexDirection={"row"}>
        <SortButton />
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <div>Amount of rows</div>
          <Input
            type="number"
            value={perPage}
            //! check if not out of bounds or set max and min
            onChange={(e) => setPerPage(Number(e.target.value))}
          />
          {/* //! Put to end */}
          <Box>
            <IconButton
              disabled={isLoading || pageCount === 1}
              onClick={() =>
                setPageCount((prevState) => (prevState > 1 ? prevState - 1 : 1))
              }
              children={<ArrowBackIosNewIcon />}
            />
            Page: {pageCount}
            <IconButton
              disabled={isLoading || !hasMore}
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
      {isLoading ? <CircularProgress /> : <TableComp rows={tags} />}
    </TableContainer>
  );
}
