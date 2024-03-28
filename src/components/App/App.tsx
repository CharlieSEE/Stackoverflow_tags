import "./App.css";
import TagsTableContainer from "../Table";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      padding={"5em"}
      paddingTop={"3em"}
    >
      <h1>StackExchange API</h1>
      <TagsTableContainer />
    </Box>
  );
}

export default App;
