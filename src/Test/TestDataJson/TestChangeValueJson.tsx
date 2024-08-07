import React, { useEffect, useState } from 'react';

const TestChangeValueJson = ({ data }) => {
  const [jsonData, setJsonData] = useState(data);

  function parsePath(path) {
    const regex = /(?:^|\.|\[)(\d+\.\d+|[^\.\[\]]+)(?=\]|\[|\.)?/g;
    const keys = [];
    let match;
    while (match = regex.exec(path)) {
      keys.push(match[1]);
    }
    return keys;
  };

  function updateNestedObjectAndKey(data, keyPath, newValue, updateKeys = false) {
    let current = data;
    let parents = []; // Theo dõi các đối tượng cha và các khóa nếu updateKeys là true
    let lastKey = null;
  
    // Duyệt đến khóa cuối cùng, ghi nhận dữ liệu cha tùy chọn
    for (let i = 0; i < keyPath.length; i++) {
      if (updateKeys) parents.push({ parent: current, key: keyPath[i] });
      lastKey = keyPath[i];
      if (typeof current[lastKey] === 'undefined') {
        console.error(`Khóa ${lastKey} không tồn tại trong đối tượng.`);
        return null;
      }
      if (i < keyPath.length - 1) current = current[lastKey];
    }
  
    // Lưu giá trị ban đầu để có thể cập nhật khóa trong các đối tượng cha
    let originalValue = current[lastKey];
    current[lastKey] = newValue;
  
    // Tùy chọn cập nhật các khóa trong tất cả các đối tượng cha nếu khóa cũ trùng với giá trị ban đầu
    if (updateKeys) {
      parents.forEach(parentInfo => {
        let parentObject = parentInfo.parent;
        let key = parentInfo.key;
        if (typeof key === 'string' && String(originalValue) === key && originalValue !== newValue) {
          parentObject[newValue] = parentObject[originalValue];
          delete parentObject[originalValue];
          parentInfo.key = newValue; // Cập nhật tham chiếu trong mảng cha
        }
      });
    }
  
    return data;
  }  

  function handleChange(path, newValue) {
    const keys = parsePath(path);

    setJsonData(prevData => {
      const safeCopy = Array.isArray(prevData) ? [...prevData] : { ...prevData };
      const updatedData = updateNestedObjectAndKey(safeCopy, keys, newValue);
      if (updatedData) {
        return updatedData;
      } else {
        return prevData; // Return previous data if update failed
      }
    });
  }

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
      return containsSpecialChars(item) ? (
        <span style={{ color: 'red', fontFamily: 'monospace' }}>
          {JSON.stringify(item)}
        </span>
      ) : (
        <input
          style={{ color: 'black', width: 'auto', fontFamily: 'monospace' }}
          value={item}
          onChange={(e) => handleChange(path, e.target.value)}
        />
      );
    }
  };

  return (
    <div style={{ fontFamily: 'monospace' }}>
      {formatJSON(jsonData)}
    </div>
  );
};

export default TestChangeValueJson;
