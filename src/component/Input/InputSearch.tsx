import React from "react";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface PropsInput {
  style?: React.CSSProperties;
  positionIcon: "end" | "start";
  placeholder?: string;
}

const InputSearch: React.FC<PropsInput> = (props) => {
  const { style, positionIcon, placeholder } = props;

  return (
    <>
      <FormControl sx={{ ...style, width: "100%" }}>
        <TextField
          size="small"
          variant="outlined"
          placeholder={placeholder ?? ""}
          // onChange={handleChange}
          InputProps={
            positionIcon === "start"
              ? {
                  startAdornment: (
                    <InputAdornment position={positionIcon}>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }
              : {
                  endAdornment: (
                    <InputAdornment position={positionIcon}>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }
          }
        />
      </FormControl>
    </>
  );
};

export default InputSearch;
