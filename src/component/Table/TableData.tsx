import { ListCellTest, ListRowTest } from "@/types/filed";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";
import CellItems from "./CellItems";
import React from "react";

interface TableProps {
  listRows: ListRowTest[];
  listCells: ListCellTest[];
}

const TableData: React.FC<TableProps> = (props) => {
  const { listRows, listCells } = props;

  const TableCustomContainer = styled(TableContainer)(() => ({
    border: "none",
  }));

  const TableCustom = styled(Table)(() => ({
    border: "none",
  }));

  const TableCustomRow = styled(TableRow)(() => ({
    height: "60px",
  }));

  const TableCustomCell = styled(TableCell)(() => ({
    border: "none",
  }));

  return (
    <TableCustomContainer
      sx={{
        boxShadow: "unset",
        "& .MuiTableContainer-root": {
          boxShadow: "unset",
        },
      }}
    >
      <TableCustom
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableCustomRow sx={{ backgroundColor: "#f0629282" }}>
            {listRows.map((item: ListRowTest) => (
              <TableCustomCell key={item.id} align="left">
                {item.label}
              </TableCustomCell>
            ))}
          </TableCustomRow>
        </TableHead>
        <TableBody>
          {listCells.map((cell: ListCellTest, index) => (
            <TableCustomRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: cell.selected ? "#f0629282" : "transparent",
              }}
            >
              {listRows.map((row: ListRowTest) => (
                <TableCustomCell key={`${row.key}-${cell.id}`}>
                  <CellItems
                    cell={cell}
                    row={row}
                    index={index}
                    listButton={[]}
                  />
                </TableCustomCell>
              ))}
            </TableCustomRow>
          ))}
        </TableBody>
      </TableCustom>
    </TableCustomContainer>
  );
};

export default TableData;
