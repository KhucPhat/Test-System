import { ListFieldTest } from "@/types/filed";
import { FormControl, Grid, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { FormikProps } from "formik";
import React, { useCallback } from "react";
import _ from "lodash";

const BootstrapInput = styled(TextField)(() => ({}));

interface InputProps {
  listField: ListFieldTest[];
  formik: FormikProps<any>;
}

const InputText: React.FC<InputProps> = (props) => {
  const { listField, formik } = props;

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
                defaultValue={item.defaultValue}
                focused
                onChange={(event) => {
                  formik.setFieldValue(item.id, event.target.value);
                }}
              />
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default InputText;
