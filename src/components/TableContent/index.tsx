import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import type { Tag } from "../../api/useTags";

type TableContentProps = { rows: Tag[] | undefined };

const TableContent = ({ rows }: TableContentProps) => {
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
          rows?.map((row: Tag) => (
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

export default TableContent;
