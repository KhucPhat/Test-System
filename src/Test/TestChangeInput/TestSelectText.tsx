import React, { useEffect } from 'react';

function TextHighlightWatcher() {
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = document.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        const precedingText = range.startContainer.textContent.substring(0, range.startOffset);

        // Tìm vị trí cuối cùng của ký tự '@' trước phần text được chọn
        const lastAtPosition = precedingText.lastIndexOf('@');

        if (lastAtPosition !== -1 && lastAtPosition === range.startOffset - 1) {
          console.log('Phần text sau @ được chọn:', selectedText);
          // Thực hiện hành động tại đây nếu text sau @ được chọn
        }
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return (
    <div>
      Hãy bôi đen phần text sau ký tự '@' trong đoạn văn bản này để kiểm tra: 13ada@bal
    </div>
  );
}

export default TextHighlightWatcher;
