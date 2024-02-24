import { ListButtonOptions, ListCellItems, ListRows } from "@/types/list";
import { Typography } from "@mui/material";
import React from "react";
import ButtonOptions from "../Button/ButtonOptions";
import { ListCellTest, ListRowTest } from "@/types/filed";

interface PropCell {
  row: ListRows | ListRowTest;
  cell: ListCellItems | ListCellTest;
  index: number;
  listButton?: ListButtonOptions[] | undefined;
}

const CellItems: React.FC<PropCell> = (props) => {
  const { row, cell, index, listButton } = props;

  const renderItem = () => {
    const key = row.key;
    const type = row.type;
    const value = cell[key];

    switch (type) {
      case "index":
        return <Typography>{index + 1}</Typography>;
      case "text":
        return <Typography>{value}</Typography>;
      case "button-options":
        return <ButtonOptions listButton={listButton} />;
      default:
        return;
    }
  };
  return <>{renderItem()}</>;
};

export default CellItems;
