import React, { useState, useRef } from 'react';

function AutoSelectText() {
  const [value, setValue] = useState("Example text to select. Click and drag to test.");
  const inputRef = useRef(null);

  const handleSelect = () => {
    const input = inputRef.current;
    const selection = window.getSelection().toString();
    if (selection.length > 0) {
      const start = input.value.indexOf(selection);
      const end = start + selection.length;
      
      // Mở rộng vùng chọn để bao gồm toàn bộ chuỗi con
      if (start > -1) {
        input.setSelectionRange(start, end);
      }
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSelect={handleSelect}
      ref={inputRef}
      style={{ width: '300px' }}
    />
  );
}

export default AutoSelectText;
