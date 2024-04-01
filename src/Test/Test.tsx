import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Test = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "0px",
                borderBottom: "1px solid #ccc",
                borderRadius: "unset",
              },
              "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderWidth: "0px",
                  borderBottom: "1px solid #ccc",
                  borderRadius: "unset",
                },
            }}
            label="Basic date picker"
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};

export default Test;
