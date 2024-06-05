import React, { useState } from 'react';

export const SpecialInput = () => {
    const initialValue = '@|2131|adada|ad#'
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    
    // Tính lại chỉ mục của @ và # từ newValue
    const atIndex = newValue.indexOf('@');
    const hashIndex = newValue.indexOf('#');

    // Phần không được thay đổi giữa @ và #
    const newImmutableMiddle = newValue.substring(atIndex, hashIndex + 1);

    // Phần không được thay đổi giữa @ và # từ giá trị ban đầu
    const immutableMiddle = initialValue.substring(initialValue.indexOf('@'), initialValue.indexOf('#') + 1);

    // Kiểm tra nếu phần bắt buộc giữ nguyên có thay đổi hay không
    if (newImmutableMiddle === immutableMiddle) {
      setValue(newValue); // Cập nhật nếu không thay đổi phần bắt buộc
      setError(''); // Xóa lỗi nếu hợp lệ
    } else {
      setError('Bạn không được phép thay đổi giá trị giữa "@" và "#"');
    }
  };

  const handleBlur = () => {
    const atIndex = value.indexOf('@');
    const hashIndex = value.indexOf('#');
    const currentMiddle = value.substring(atIndex, hashIndex + 1);
    const immutableMiddle = initialValue.substring(initialValue.indexOf('@'), initialValue.indexOf('#') + 1);

    if (currentMiddle !== immutableMiddle) {
      setError('Bạn không được phép thay đổi giá trị giữa "@" và "#"');
    }
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} onBlur={handleBlur} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

