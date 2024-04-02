import { Box, IconButton } from "@mui/material";
import { useMemo, type Dispatch, type SetStateAction } from "react";
import PageNumberInput from "../PageNumberInput";
import SortButton from "../SortButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { SortingValues } from "../Table";
import type { Tag } from "../../api/useTags";
import FilterButton from "../FilterButton";

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
      <FilterButton
        tags={tags}
        isLoading={isLoading}
        isDisabled={isDisabled}
        setSelectedTag={setSelectedTag}
      />
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
