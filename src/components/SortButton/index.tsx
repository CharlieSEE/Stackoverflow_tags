import React, { useState } from "react";
import SortIcon from "@mui/icons-material/Sort";

const SortButtonMenu = () => {
  return <div>Menu</div>;
};

const SortButton = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setMenuIsOpen(!menuIsOpen)}>
        <SortIcon />
      </button>
      {menuIsOpen && <SortButtonMenu />}
    </>
  );
};

export default SortButton;
