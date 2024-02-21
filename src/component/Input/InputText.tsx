import { FormControl, TextField } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const BootstrapInput = styled(TextField)(() => ({}));

const InputText = () => {
  return (
    <>
      <FormControl>
        <BootstrapInput
          required
          id="standard-required"
          label="Required"
          variant="standard"
          focused
        />
      </FormControl>
    </>
  );
};

export default InputText;
