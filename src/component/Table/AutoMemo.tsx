import { Autocomplete, TextField } from "@mui/material";
import { memo } from "react";

interface AutoProps {
  id: any;
  valueSelected: any;
  options: any;
  handleChange: any;
  keyAuto: any;
}

const AutoMemo = memo((props: AutoProps) => {
  const { id, valueSelected, options, keyAuto, handleChange } = props;
  return (
    <Autocomplete
      key={`autocomplete-${id}`}
      value={valueSelected}
      options={options}
      getOptionLabel={(option: any) => `${option.label}`}
      id={`movie-customized-option-demo-${id}`}
      disableCloseOnSelect
      renderInput={(params) => <TextField {...params} variant="standard" />}
      sx={{
        "& .css-953pxc-MuiInputBase-root-MuiInput-root::before": {
          border: "unset !important",
        },
      }}
      onChange={(event, value) => {
        handleChange(id, keyAuto, value.value);
      }}
    />
  );
});

export default AutoMemo;
