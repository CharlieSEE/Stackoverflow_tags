import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { SortingValues } from "../Table";
import type { SetStateAction, Dispatch } from "react";

type SortButtonProps = {
  selectedValue: SortingValues;
  setSelectedValue: Dispatch<SetStateAction<SortingValues>>;
  disabled: boolean;
};

const SortButton = ({
  selectedValue,
  setSelectedValue,
  disabled,
}: SortButtonProps) => {
  return (
    <>
      <FormControl disabled={disabled} sx={{ width: "15vw" }}>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label="Sort"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value as SortingValues)}
        >
          <MenuItem value={SortingValues.DESCENDING}>Descending</MenuItem>
          <MenuItem value={SortingValues.ASCENDING}>Ascending</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default SortButton;
