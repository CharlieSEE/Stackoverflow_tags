import { Input } from "@mui/material";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

type PageNumberInputProps = {
  perPage: number;
  disabled: boolean;
  setPerPage: any;
};

const handleNumberInputChange = (
  e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
): number => {
  const value = Number(e.target.value);
  const TOP_LIMIT = 100;
  const BOTTOM_LIMIT = 0;

  if (value >= BOTTOM_LIMIT && value <= TOP_LIMIT) return value;
  if (value > TOP_LIMIT) return TOP_LIMIT;
  if (value < BOTTOM_LIMIT) return BOTTOM_LIMIT;
  throw new Error("Page number out of bounds");
};

const PageNumberInput = ({
  perPage,
  disabled,
  setPerPage,
}: PageNumberInputProps) => {
  const [inputValue, setInputValue] = useState(perPage);
  const [debouncedInputValue, setDebouncedInputValue] = useState(inputValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
      setPerPage(debouncedInputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [debouncedInputValue, inputValue, setPerPage]);

  return (
    <Input
      type="number"
      value={inputValue}
      disabled={disabled}
      onChange={(e) => setInputValue(handleNumberInputChange(e))}
    />
  );
};

export default PageNumberInput;
