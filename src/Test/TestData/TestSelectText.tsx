import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

const TextPopup = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedText, setSelectedText] = useState('');

  const expandSelection = (event) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      // Lấy node chứa vị trí bắt đầu và kiểm tra nó có phải là node mong muốn không
      const startNode = range.startContainer.parentNode;
      if (startNode === event.target) { // Chỉ mở rộng bôi đen nếu là node chứa văn bản mục tiêu
        if (startNode.textContent !== selection.toString()) {
          selection.selectAllChildren(startNode);
        }
      }
    }
  };

  const handleMouseUp = (event) => {
    expandSelection(event);
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      setSelectedText(selectedText);
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    const selection = window.getSelection();
    // Chỉ hiển thị menu nếu node chứa văn bản mục tiêu là node được chuột phải
    if (selection.toString().length > 0 && event.target === event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedText('');
    window.getSelection().removeAllRanges(); // Xóa vùng bôi đen hiện tại
  };

  return (
    <div>
      <span>key: </span>
      <span 
        onMouseUp={handleMouseUp} 
        onContextMenu={handleContextMenu}
        style={{ cursor: 'context-menu' }} // Thêm style để người dùng biết có thể chuột phải
      >
        Đây là văn bản mà bạn có thể bôi đen và nhấn chuột phải để thấy các tùy chọn.
      </span>
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
