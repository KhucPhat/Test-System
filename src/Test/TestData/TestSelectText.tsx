import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

const TextPopup = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedText, setSelectedText] = useState('');

  const handleRightClick = (event) => {
    event.preventDefault();
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      setSelectedText(selectedText);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedText('');
  };

  return (
    <div onContextMenu={handleRightClick}>
      <p>Đây là văn bản mà bạn có thể bôi đen và nhấn chuột phải để thấy các tùy chọn.</p>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Copy</MenuItem>
        <MenuItem onClick={handleClose}>Highlight</MenuItem>
      </Menu>
    </div>
  );
};

export default TextPopup;
