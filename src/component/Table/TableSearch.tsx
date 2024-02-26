import { ListButtonOptions, ListCellItems, ListRows } from "@/types/list";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import ButtonInherit from "../Button/ButtonInherit";
import InputSearch from "../Input/InputSearch";
import CellItems from "./CellItems";
import TablePaginationActions from "./TablePaginationActions";

interface PropTable {
  listRows: ListRows[];
  listCellItem: ListCellItems[];
  listButton: ListButtonOptions[];
}

const TableSearch: React.FC<PropTable> = (props) => {
  const { listRows, listCellItem, listButton } = props;

  const TableCellCustom = styled(TableCell)(() => ({
    border: "1px solid #0000004f !important",
    borderBottom: "unset !important",
  }));

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {listRows.map((item: ListRows, index) => (
                <TableCellCustom
                  key={index}
                  sx={{ padding: "5px 10px", ...item.style }}
                >
                  <Box className="flex-center">
                    {item?.button ? (
                      <ButtonInherit
                        title={
                          <Box className="flex-center">
                            <FontAwesomeIcon icon={faPlus} />
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "600",
                                marginLeft: "10px",
                              }}
                            >
                              {item.label}
                            </Typography>
                          </Box>
                        }
                        style={{
                          width: "100%",
                          height: "50px",
                          textTransform: "inherit",
                          backgroundColor: "#ff0000bf !important",
                          border: "unset !important",
                          color: "#fff",
                        }}
                        action={item.action}
                        loading={false}
                        disabled={false}
                      />
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          marginRight: "10px",
                        }}
                      >
                        {item.label}
                      </Typography>
                    )}
                    {item?.search ? (
                      <InputSearch
                        style={{ width: item.key === "id" ? "120px" : "260px" }}
                        positionIcon="end"
                      />
                    ) : null}
                  </Box>
                </TableCellCustom>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listCellItem.map((cell: ListCellItems, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {listRows.map((row: ListRows) => (
                  <TableCellCustom key={`${row.key}-${cell.id}`}>
                    <CellItems
                      row={row}
                      cell={cell}
                      index={index}
                      listButton={listButton}
                    />
                  </TableCellCustom>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePaginationActions />
    </>
  );
};

export default TableSearch;
