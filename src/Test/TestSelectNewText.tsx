import React from 'react';

function SelectableParagraph() {
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    // Lấy range hiện tại và node chứa text
    let range = selection.getRangeAt(0);
    let node = selection.anchorNode;

    // Đảm bảo node là loại TEXT_NODE và nằm trong thẻ <p>
    while (node && node.nodeType !== Node.TEXT_NODE) {
      node = node.parentNode;
    }

    // Nếu node là thẻ <p> (parentNode của text node), mở rộng lựa chọn
    if (node && node.nodeType === Node.ELEMENT_NODE && node.tagName === 'P') {
      // Tạo một range mới để chọn toàn bộ nội dung của thẻ <p>
      const newRange = document.createRange();
      newRange.selectNodeContents(node);

      // Xóa selection cũ và thiết lập range mới
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  };

  return (
    <p onMouseUp={handleMouseUp}>
      Đây là một đoạn văn bản mẫu. Hãy thử bôi đen một phần của đoạn văn bản này để xem toàn bộ đoạn văn bản sẽ được bôi đen.
    </p>
  );
}

export default SelectableParagraph;
