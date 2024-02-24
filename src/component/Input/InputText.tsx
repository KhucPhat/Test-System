import { ListFieldTest } from "@/types/filed";
import { FormControl, Grid, TextField } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const BootstrapInput = styled(TextField)(() => ({}));

interface InputProps {
  listField: ListFieldTest[];
}

const InputText: React.FC<InputProps> = (props) => {
  const { listField } = props;
  return (
    <>
      <Grid container spacing={2}>
        {listField.map((item: ListFieldTest) => (
          <Grid item xs={item.span} key={item.id}>
            <FormControl sx={{ ...item.style }}>
              <BootstrapInput
                required={item.require}
                id="standard-required"
                label={item.label}
                variant="standard"
                placeholder={item.placeholder}
                focused
              />
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default InputText;
