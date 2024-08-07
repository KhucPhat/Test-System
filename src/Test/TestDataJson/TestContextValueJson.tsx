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

  funtion isPrimitive = (value) => {
    return value !== Object(value);
  }

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
      if (i === keyPath.length - 1) {
        if (Array.isArray(current) && typeof key === "number") {
          if (key < current.length) {
            current[key] = stringValue;
          } else {
            return null
          }
        } else if (Array.isArray(current[key])){
          const allPrimitive = current[key].every(isPrimitive);
          if (allPrimitive) {
            return setInParent(data, keyPath.slice(0,1), value);
          } else {
            current[key] = value;
          }
        } else if ((typeof key === "string" || typeof key === "number") && current.hasOwnProperty(key)) {
          current[key] = value;
        } else {
          return null;
        }
      } else {
        if(Array.isArray(current) && typeof key === 'number') {
          if (key < current.length) {
            current = current[key]
          } else {
            return null
          }
        } else if (Array.isArray(current[key])) {
          const allPrimitive = current[key].every(isPrimitive);
          if (allPrimitive) {
            return setInParent(data, keyPath.slice(0, 1), stringValue);
          } else {
            current = current[key]
          }
        } else if (current.hasOwnProperty(key)) {
          current = current[key];
        } else {
          return null;
        }
      }
    };

    return data;
  };
  
  function setInParent(data, parentPath, value) {
    let parent = data;

    for (let i = 0; i < parentPath.length, i++) {
      parent = parent[parentPath[i]];
    }

    parent[parentPath[parentPath.length - 1] = value];

    return data;
  };

  function resetNestedObject(data, defaultData, keyPath){
    let current = data;
    let defaults = defaultData;

    for (let i = 0; i< keyPath.length, i++) {
      if (i === keyPath.length - 1) {
        if (
          Array.isArray(current)
          && typeof key === "number"
          && key < current.length
          && Array.isArray(defaults)
          && key < defaults.length
        ) {
          current[key] = defaults[key];
        } else if (typeod key === 'string' && current.hasOwnProperty(key) && defaults.hasOwnProperty(key)){
          current[key] = defaults[key]
        } else {
          return null
        }
      } else {
        if (
          Array.isArray(current)
          && typeof key === "number"
          && key < current.length
          && Array.isArray(defaults)
          && key < defaults.length
        ) {
          current = current[key];
          defaults = defaults[key];
        } else if (current.hasOwnProperty(key) && defaults.hasOwnProperty(key)) {
          current=current[key];
          defaults=defaults[key];
        } else {
          return null;
        }
      }
    }
  };

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
