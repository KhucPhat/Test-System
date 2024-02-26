import React from "react";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface PropsInput {
  style?: React.CSSProperties;
  positionIcon: "end" | "start";
}

const InputSearch: React.FC<PropsInput> = (props) => {
  const { style, positionIcon } = props;

  return (
    <>
      <FormControl sx={{ ...style }}>
        <TextField
          size="small"
          variant="outlined"
          // onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position={positionIcon}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </>
  );
};

export default InputSearch;
