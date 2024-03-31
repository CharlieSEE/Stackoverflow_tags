import { Box, TextField, Autocomplete, IconButton } from "@mui/material";
import { useMemo, type Dispatch, type SetStateAction } from "react";
import PageNumberInput from "../PageNumberInput";
import SortButton from "../SortButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { SortingValues } from "../Table";
import type { Tag } from "../../api/useTags";

type TableControlsProps = {
  tags: Tag[] | null;
  isLoading: boolean;
  isDisabled: boolean;
  selectedSorting: SortingValues;
  setSelectedSorting: Dispatch<SetStateAction<SortingValues>>;
  selectedTag: string | null;
  setSelectedTag: Dispatch<SetStateAction<string | null>>;
  perPage: number;
  setPerPage: Dispatch<SetStateAction<number>>;
  pageCount: number;
  setPageCount: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
};

const TableControls = ({
  tags,
  isLoading,
  isDisabled,
  selectedSorting,
  setSelectedSorting,
  selectedTag,
  setSelectedTag,
  perPage,
  setPerPage,
  pageCount,
  setPageCount,
  hasMore,
}: TableControlsProps) => {
  const leftArrowDisabled = useMemo(
    () => isDisabled || pageCount === 1,
    [isDisabled, pageCount]
  );

  const rightArrowDisabled = useMemo(
    () => isDisabled || !hasMore || !!selectedTag,
    [hasMore, isDisabled, selectedTag]
  );
  return (
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
          onChange={(_, newValue) => setSelectedTag(newValue)}
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
            disabled={leftArrowDisabled}
            onClick={() =>
              setPageCount((prevState) => (prevState > 1 ? prevState - 1 : 1))
            }
            children={<ArrowBackIosNewIcon />}
          />
          Page: {pageCount}
          <IconButton
            disabled={rightArrowDisabled}
            onClick={() =>
              setPageCount((prevState) => (hasMore ? prevState + 1 : prevState))
            }
            children={<ArrowForwardIosIcon />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TableControls;
