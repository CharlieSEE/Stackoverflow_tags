import { TextField, Autocomplete } from "@mui/material";
import type { Tag } from "../../api/useTags";
import { Dispatch, SetStateAction } from "react";

type FilterButtonProps = {
  tags: Tag[] | null;
  isLoading: boolean;
  isDisabled: boolean;
  setSelectedTag: Dispatch<SetStateAction<string | null>>;
};

const FilterButton = ({
  tags,
  isLoading,
  isDisabled,
  setSelectedTag,
}: FilterButtonProps) => {
  return (
    <>
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
    </>
  );
};

export default FilterButton;
