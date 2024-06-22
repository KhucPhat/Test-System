import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

const TestContextValueJson = ({ data }) => {
  const [jsonData, setJsonData] = useState(data);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [value, setValue] = useState('');
  const [keyPath, setKeyPath] = useState('');

  function parsePath(path) {
    const regex = /(?:^|\.|\[)(\d+\.\d+|[^\.\[\]]+)(?=\]|\[|\.)?/g;
    const keys = [];
    let match;
    while (match = regex.exec(path)) {
      keys.push(match[1]);
    }
    return keys;
  }

  function updateNestedObject(data, keyPath, stringValue) {
    let current = data;
    for (let i = 0; i < keyPath.length; i++) {
      const key = keyPath[i];
      const isLast = i === keyPath.length - 1;
  
      if (Array.isArray(current)) {
        const index = parseInt(key);
        if (!isNaN(index) && index.toString() === key) {
          if (index < current.length) {
            if (isLast) {
              current[index] = stringValue;
              return data;
            }
            current = current[index];
          } else {
            console.error(`Chỉ số ${index} vượt quá giới hạn của mảng.`);
            return null;
          }
        } else {
          console.error(`Khóa ${key} không phải là số nguyên cho mảng.`);
          return null;
        }
      } else if (typeof current === 'object' && current !== null) {
        if (key in current) {
          if (isLast) {
            current[key] = stringValue;
            return data;
          }
          current = current[key];
        } else {
          console.error(`Khóa ${key} không tồn tại trong đối tượng.`);
          return null;
        }
      } else {
        console.error(`Đường dẫn ${key} không dẫn đến một đối tượng hợp lệ.`);
        return null;
      }
    }
    return data;
  }    

  function handleChange(path, newValue) {
    const keys = parsePath(path);

    setJsonData(prevData => {
      const safeCopy = Array.isArray(prevData) ? [...prevData] : { ...prevData };
      const updatedData = updateNestedObject(safeCopy, keys, newValue);
      if (updatedData) {
        return updatedData;
      } else {
        return prevData; // Return previous data if update failed
      }
    });
    setDialogOpen(false)
  }

  const handleMouseUp = (event) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (selectedText) {
      setSelectedValue(selectedText);
    }
  };

  const handleContextMenu = (event, path) => {
    if (selectedValue) {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      setKeyPath(path);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedValue('');
  };

  const handleMenuItemClick = () => {
    setDialogOpen(true);
    handleCloseMenu();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const formatJSON = (item, path = '') => {
    if (typeof item === 'object' && item !== null) {
      if (Array.isArray(item)) {
        return (
          <span>
            {'['}
            <br />
            {item.map((element, index) => (
              <div key={index} style={{ paddingLeft: '20px' }}>
                {formatJSON(element, `${path}[${index}]`)}
                {index < item.length - 1 ? ',' : ''}
              </div>
            ))}
            <br />
            {']'}
          </span>
        );
      } else {
        const keys = Object.keys(item);
        return (
          <span>
            {'{'}
            <br />
            {keys.map((key, index) => (
              <div key={key} style={{ paddingLeft: '20px' }}>
                <strong>"{key}": </strong>
                {formatJSON(item[key], path ? `${path}.${key}` : `${key}`)}
                {index < keys.length - 1 ? ',' : ''}
              </div>
            ))}
            <br />
            {'}'}
          </span>
        );
      }
    } else {
        const stringValue = JSON.stringify(item);
        return (
          <span
            onMouseUp={handleMouseUp}
            onContextMenu={(event) => {
                handleContextMenu(event, path);
            }}
            style={{ color: stringValue.includes('@') ? 'red' : 'black', cursor: 'context-menu' }}
          >
            {stringValue}
          </span>
        );
    }
  };

  return (
    <div style={{ fontFamily: 'monospace' }}>
      {formatJSON(jsonData)}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleMenuItemClick}>Edit Value</MenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Value</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the value for the selected field.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Value"
            type="text"
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={() => {
            handleChange(keyPath, value);
          }}>Apply</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TestContextValueJson;
