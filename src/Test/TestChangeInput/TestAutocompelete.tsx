import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

function AutocompleteWithCloseButton() {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const [selectedItems, setSelectedItems] = useState([]);

  const handleChange = (event, newValue) => {
    setSelectedItems(newValue ? [...selectedItems, newValue] : selectedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedList = [...selectedItems];
    updatedList.splice(index, 1);
    setSelectedItems(updatedList);
  };

  console.log(selectedItems)
  return (
    <Autocomplete
      multiple
      options={options}
      value={selectedItems}
      onChange={handleChange}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <div key={index} {...getTagProps({ index })}>
            {option}
            <CloseIcon onClick={() => handleRemoveItem(index)} />
          </div>
        ))
      }
      renderInput={(params) => <TextField {...params} label="Choose options" variant="outlined" />}
    />
  );
}

export default AutocompleteWithCloseButton;
