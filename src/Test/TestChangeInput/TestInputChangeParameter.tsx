import { TextField } from "@mui/material";
import { useState } from "react";

function CustomTextField() {
    const [value, setValue] = useState('@8034|chang|test#');
  
    const handleChange = (event) => {
      const { value: newValue } = event.target;
      const parts = newValue.split('|');
      if (parts.length === 3) {
        // Split further to separate the sections before '@' and after '#'
        const prefix = parts[0].substring(0, parts[0].indexOf('@'));
        const suffix = parts[2].substring(parts[2].indexOf('#') + 1);
        console.log(prefix);
        console.log(suffix);
  
        // Validate if prefix and suffix are float
        if (!isNaN(parseFloat(prefix)) && isFinite(prefix) &&
            !isNaN(parseFloat(suffix)) && isFinite(suffix)) {
          setValue(newValue);
        }
      }
    };
  
    return (
      <TextField
        defaultValue={value}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
    );
  }
export default CustomTextField;