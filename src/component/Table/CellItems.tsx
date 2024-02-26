import { ListCellTest, ListRowTest } from "@/types/filed";
import { ListButtonOptions, ListCellItems, ListRows } from "@/types/list";
import { Autocomplete, TextField, Typography } from "@mui/material";
import React from "react";
import ButtonOptions from "../Button/ButtonOptions";
import ButtonInherit from "../Button/ButtonInherit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface PropCell {
  row: ListRows | ListRowTest;
  cell: ListCellItems | ListCellTest;
  index: number;
  listButton: ListButtonOptions[];
}

interface ListOptionsAuto {
  id: string;
  label: string;
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
        return (
          <Autocomplete
            value={value[0]}
            options={value}
            getOptionLabel={(option: ListOptionsAuto) => `${option.label}`}
            id="movie-customized-option-demo"
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField {...params} variant="standard" />
            )}
            sx={{
              "& .css-953pxc-MuiInputBase-root-MuiInput-root::before": {
                border: "unset !important",
              },
            }}
          />
        );
      default:
        return;
    }
  };
  return <>{renderItem()}</>;
};

export default CellItems;
