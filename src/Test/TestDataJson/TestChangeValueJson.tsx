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

  function updateNestedObjectAndKey(data, keyPath, newValue) {
    let current = data;
    let rootKeyToUpdate = null;
    let oldKeyValue = null;

    for (let i = 0; i < keyPath.length; i++) {
        const key = keyPath[i];
        const isLast = i === keyPath.length - 1;

        if (Array.isArray(current)) {
            const index = parseInt(key);
            if (!isNaN(index) && index.toString() === key) {
                if (index < current.length) {
                    if (isLast) {
                        current[index] = newValue;
                    }
                    current = current[index];
                } else {
                    console.error(`Chỉ số ${index} vượt quá giới hạn của mảng.`);
                    return null;
                }
            } else {
                console.error(`Khóa ${key} không phải là số nguyên cho mảng.`);
                return null;
            }
        } else if (typeof current === 'object' && current !== null) {
            if (key in current) {
                if (isLast) {
                    // Capture the old value for potential root key update
                    oldKeyValue = current[key];
                    current[key] = newValue;
                }
                current = current[key];
            } else {
                console.error(`Khóa ${key} không tồn tại trong đối tượng.`);
                return null;
            }
        } else {
            console.error(`Đường dẫn ${key} không dẫn đến một đối tượng hợp lệ.`);
            return null;
        }
    }

    // Check if the old value matches any root key, and update it
    if (oldKeyValue && oldKeyValue in data) {
        rootKeyToUpdate = oldKeyValue;
    }
    console.log(rootKeyToUpdate);
    console.log(data)
    console.log(oldKeyValue);

    if (rootKeyToUpdate) {
        const newObject = {...data};
        newObject[newValue] = {...newObject[rootKeyToUpdate]};
        delete newObject[rootKeyToUpdate];
        return newObject;
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
