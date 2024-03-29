import { ListCellTest, ListRowTest } from "@/types/filed";
import { ListButtonOptions, ListCellItems, ListRows } from "@/types/list";
import { Autocomplete, Input, TextField, Typography } from "@mui/material";
import React, { memo, useId } from "react";
import ButtonOptions from "../Button/ButtonOptions";
import ButtonInherit from "../Button/ButtonInherit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import AutoMemo from "./AutoMemo";

interface PropCell {
  row: ListRows | ListRowTest;
  cell: ListCellItems | ListCellTest;
  index: number;
  listButton: ListButtonOptions[];
  handleChange: any;
}

interface ListOptionsAuto {
  id: string;
  label: string;
}

const CellItems: React.FC<PropCell> = (props) => {
  const { row, cell, index, listButton, handleChange } = props;
  const id = useId();
  console.log("re-render");

  const DataCells = () => {
    const key = row.key;
    const type = row.type;
    const value = cell[key];

    switch (type) {
      case "index":
        return <Typography key={`index-${id}`}>{index + 1}</Typography>;
      case "text":
        return <Typography key={`text-${id}`}>{value}</Typography>;
      case "input":
        return (
          <Input
            key={`input-${id}`}
            defaultValue={value}
            onBlur={(event) => {
              handleChange(cell?.id, key, event.target.value);
            }}
          />
        );
      case "button-options":
        return <ButtonOptions listButton={listButton} />;
      case "button-delete":
        return (
          <ButtonInherit
            title={
              <FontAwesomeIcon icon={faTrashCan} style={{ fontSize: "18px" }} />
            }
            loading={false}
            disabled={false}
            style={{
              border: "unset",
              color: "#000",
            }}
          />
        );
      case "select":
        const valueSelected = row?.options?.find(
          (item) => parseInt(item.value) === parseInt(value)
        );
        return (
          <AutoMemo
            id={cell?.id}
            keyAuto={key}
            options={row?.options}
            valueSelected={valueSelected}
            handleChange={handleChange}
          />
        );
      default:
        return;
    }
  };
  return (
    <>
      <DataCells />
    </>
  );
};

export default memo(CellItems);
