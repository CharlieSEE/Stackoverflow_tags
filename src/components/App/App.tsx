import Table from "../Table";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      padding={"5em"}
      paddingTop={"3em"}
      height={"85vh"}
    >
      <h1>StackExchange API</h1>
      <Table />
    </Box>
  );
}

export default App;
