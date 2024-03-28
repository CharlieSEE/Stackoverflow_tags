import React, { useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import { Button, IconButton } from "@mui/material";

const SortButtonMenu = () => {
  return <div>Menu</div>;
};

const SortButton = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  return (
    <>
      <IconButton
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        children={<SortIcon />}
      />
      {menuIsOpen && <SortButtonMenu />}
    </>
  );
};

export default SortButton;
