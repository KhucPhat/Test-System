import React, { useEffect, useState } from 'react';

const EditableJSONFormatter = ({ data }) => {
  const [jsonData, setJsonData] = useState(data);
 
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
              current[key] = stringValue;
          } else {
            return null;
          }
        } else if (typeof key === 'string' && current.hasOwnProperty(key)) {
            current[key] = stringValue;
        } else {
          console.error(`Key ${key} does not exist in the object.`);
          return null;
        }
      } else {
        if (Array.isArray(current) && typeof key === 'number') {
          if (key < current.length) {
            current = current[key];
          } else {
            console.error(`Index ${key} out of bounds for array.`);
            return null;
          }
        } else if (current.hasOwnProperty(key)) {
          current = current[key];
        } else {
          console.error(`Key ${key} does not exist in the object.`);
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

  console.log(jsonData);

  return (
    <div style={{ fontFamily: 'monospace' }}>
      {formatJSON(jsonData)}
    </div>
  );
};

export default EditableJSONFormatter;
