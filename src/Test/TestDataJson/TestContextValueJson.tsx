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

const JSONFormatter = ({ data }) => {
  const [jsonData, setJsonData] = useState(data);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [keyPath, setKeyPath] = useState('');

  function validateDataType(value) {
    if (value === null) return 'Null';
    if (Array.isArray(value)) return 'Array';
    if (value instanceof Date && !isNaN(value.valueOf())) return 'DateTime';
    const type = typeof value;
    if (type === 'number') {
      return Number.isInteger(value) ? 'Long' : 'Float';
    }
    if (type === 'boolean') return 'Boolean';
    return type.charAt(0).toUpperCase() + type.slice(1);  // Capitalize the first letter
  }

  function convertToOriginalType(originalValue, stringValue) {
    const expectedType = validateDataType(originalValue);
    switch (expectedType) {
      case 'Long':
        return parseInt(stringValue, 10);
      case 'Float':
        return parseFloat(stringValue);
      case 'Boolean':
        return stringValue.toLowerCase() === 'true' || stringValue === '1';
      case 'DateTime':
        const date = new Date(stringValue);
        return isNaN(date.valueOf()) ? originalValue : date; // If not a valid date, return original value
      case 'String':
        return stringValue;
      default:
        return stringValue; // Handle complex types like Array or Object
    }
  }

  function parsePath(path) {
    return path.split(/\.|\[(\d+)\]/g).filter(Boolean).map(key => {
      const trimmedKey = key.trim();
      return isNaN(trimmedKey) ? trimmedKey : parseInt(trimmedKey);
    });
  }

  function updateNestedObject(data, keyPath, stringValue) {
    let current = data;
    for (let i = 0; i < keyPath.length; i++) {
      const key = keyPath[i];

      if (i === keyPath.length - 1) {
        if (Array.isArray(current) && typeof key === 'number') {
          if (key < current.length) {
            const originalValue = current[key];
            const convertedValue = convertToOriginalType(originalValue, stringValue);
            if (validateDataType(convertedValue) === validateDataType(originalValue)) {
              current[key] = convertedValue;
            } else {
              console.error(`Type conversion error for index ${key}`);
              setError(`Type conversion error for index ${key}`);
              return null;
            }
          } else {
            console.error(`Index ${key} out of bounds for array.`);
            setError(`Index ${key} out of bounds for array.`);
            return null;
          }
        } else if (typeof key === 'string' && current.hasOwnProperty(key)) {
          const originalValue = current[key];
          const convertedValue = convertToOriginalType(originalValue, stringValue);
          if (validateDataType(convertedValue) === validateDataType(originalValue)) {
            current[key] = convertedValue;
          } else {
            console.error(`Type conversion error for key '${key}'`);
            setError(`Type conversion error for key '${key}'`);
            return null;
          }
        } else {
          console.error(`Key ${key} does not exist in the object.`);
          setError(`Key ${key} does not exist in the object.`);
          return null;
        }
      } else {
        if (Array.isArray(current) && typeof key === 'number') {
          if (key < current.length) {
            current = current[key];
          } else {
            console.error(`Index ${key} out of bounds for array.`);
            setError(`Index ${key} out of bounds for array.`);
            return null;
          }
        } else if (current.hasOwnProperty(key)) {
          current = current[key];
        } else {
          console.error(`Key ${key} does not exist in the object.`);
          setError(`Key ${key} does not exist in the object.`);
          return null;
        }
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
        setError(''); // Clear previous error
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

  const handleApply = () => {
    alert(`Updated value: ${value} for ${name}`);
    handleDialogClose();
  };

  const containsSpecialChars = (value) => {
    return /[@|#|\|]/.test(value);
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
                const itemSelected = {
                    attributeName : parentKey,
                    value: stringValue
                };
                console.log(itemSelected);
                
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
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

export default JSONFormatter;
