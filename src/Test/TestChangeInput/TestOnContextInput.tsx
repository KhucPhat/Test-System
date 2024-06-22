import {
  Button,
  OutlinedInput,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function CustomOutlinedInput() {
  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [editStart, setEditStart] = useState(null);
  const [editEnd, setEditEnd] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleContextMenu = (event) => {
    const input = event.target;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selectedText = value.substring(start, end);

    if (selectedText.startsWith("@") && selectedText.endsWith("#")) {
      event.preventDefault(); // Ngăn sự kiện context menu mặc định
      setAnchorEl(event.currentTarget);
      setEditStart(start);
      setEditEnd(end);
      setEditValue(selectedText); // Đặt giá trị ban đầu cho trường chỉnh sửa
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleSave = () => {
    const newValue =
      value.substring(0, editStart) + editValue + value.substring(editEnd);
    setValue(newValue);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <OutlinedInput
        value={value}
        onChange={handleInputChange}
        onContextMenu={handleContextMenu}
        label="Email"
        variant="outlined"
        fullWidth
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography style={{ padding: "10px" }}>
          Chỉnh sửa đoạn văn bản:
        </Typography>
        <TextField
          value={editValue}
          onChange={handleEditChange}
          variant="outlined"
          fullWidth
        />
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </Popover>
    </>
  );
}

export default CustomOutlinedInput;
