import React, { useEffect, useState } from 'react';

const ValidateValueChangeJson = ({ data }) => {
  const [jsonData, setJsonData] = useState(data);
  const [errors, setErrors] = useState({});
  const [newElementIndexes, setNewElementIndexes] = useState([]);

  // function parsePath(path) {
  //   return path.split(/\.|\[(\d+)\]/g).filter(Boolean).map(key => {
  //     const trimmedKey = key.trim();
  //     return isNaN(trimmedKey) ? trimmedKey : parseInt(trimmedKey);
  //   });
  // }

function parsePath(path) {
  const regex = /(?:^|\[|\.)?([^\.\[\]]+)(?:\]|\[|\.|$)/g;
  const keys = [];
  let match;
  while (match = regex.exec(path)) {
    keys.push(match[1]);
  }
  return keys;
}


  function getType(value) {
    if (Array.isArray(value)) {
      return 'array';
    } else if (typeof value === 'number') {
      return value % 1 === 0 ? 'integer' : 'float';
    } else if (typeof value === 'boolean') {
      return 'boolean';
    } else if (typeof value === 'string' && !isNaN(Date.parse(value))) {
      return 'datetime';
    } else {
      return 'string';
    }
  }

  function validateType(originalType, originalValue, newValue) {
    try {
      switch (originalType) {
        case 'integer':
          return !isNaN(newValue) && Number.isInteger(parseFloat(newValue));
        case 'float':
          return !isNaN(newValue);
        case 'boolean':
          return newValue.toLowerCase() === 'true' || newValue.toLowerCase() === 'false';
        case 'datetime':
          return !isNaN(Date.parse(newValue));
        case 'string':
          return typeof newValue === 'string';
        case 'array':
          const parsedArray = JSON.parse(newValue);
          if (!Array.isArray(parsedArray)) {
            throw new Error('Value is not an array');
          }
          console.log(parsedArray)
          return parsedArray.every((elem, index) => typeof elem === typeof originalValue[index]);
        default:
          return false;
      }
    } catch (e) {
      return false;
    }
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
  };

function handleChange(path, newValue) {
  const keys = parsePath(path);
  let current = jsonData;

  // Traversing to get the last value using the keys
  for (const key of keys) {
    if (current[key] !== undefined) {
      current = current[key];
    } else {
      // Handle the case where the path is invalid
      setErrors({ ...errors, [path]: `Path error: ${path} is invalid.` });
      return;
    }
  }

  const originalValue = current;
  const originalType = getType(originalValue);  // Ensure this function is correctly determining the type

  // Validate and convert the value
  if (!validateType(originalType, originalValue, newValue)) {
    setErrors({ ...errors, [path]: `Type error: Expected ${originalType}, but got ${typeof newValue}` });
    return; // Early return to prevent state update
  } else {
    setErrors({ ...errors, [path]: '' }); // Clear error for the path
  }

  let typedValue;
  // Assume validateType checks for type compatibility
  switch (originalType) {
    case 'integer':
      typedValue = parseInt(newValue);
      break;
    case 'float':
      typedValue = parseFloat(newValue);
      break;
    case 'boolean':
      typedValue = newValue.toLowerCase() === 'true';
      break;
    case 'datetime':
      typedValue = new Date(newValue);
      break;
    case 'array':
      try {
        typedValue = JSON.parse(newValue);
      } catch (error) {
        setErrors({ ...errors, [path]: `JSON parse error: ${error.message}` });
        return;
      }
      break;
    default:
      typedValue = newValue;
      break;
  }

  // Update the state with the new value
  setJsonData(prevData => {
    const safeCopy = Array.isArray(prevData) ? [...prevData] : { ...prevData };
    const updatedData = updateNestedObject(safeCopy, keys, typedValue);
    return updatedData || prevData; // Return previous data if update failed
  });
}



  function addElementToArray(path, suggestedValue) {
    const keys = parsePath(path);
    const array = keys.reduce((acc, key) => acc[key], jsonData);
    const updatedArray = [...array, suggestedValue];
    const newIndexes = [...newElementIndexes, updatedArray.length - 1]; 
    setNewElementIndexes(newIndexes);
    setJsonData(prevData => updateNestedObject({...prevData}, keys, updatedArray));
  }

  function removeElementFromArray(path, index) {
    const keys = parsePath(path);
    const array = keys.reduce((acc, key) => acc[key], jsonData);
    const updatedArray = array.filter((_, idx) => idx !== index);
    const updatedIndexes = newElementIndexes.filter(idx => idx !== index).map(idx => idx > index ? idx - 1 : idx);
    setNewElementIndexes(updatedIndexes);
    setJsonData(prevData => updateNestedObject({...prevData}, keys, updatedArray));
  }

  const containsSpecialChars = (value) => {
    return /[@|#|\|]/.test(value);
  };

  function isPrimitive(value) {
    return value !== Object(value);
}

  const formatJSON = (item, path = '') => {
    if (typeof item === 'object' && item !== null) {
      if (Array.isArray(item)) {
        const allPrimitive = item.every(isPrimitive);
        return (
          <span>
            {'['}
            <br />
            {item.map((element, index) => (
              <div key={index} style={{ paddingLeft: '20px' }}>
                {formatJSON(element, `${path}[${index}]`)}
                {newElementIndexes.includes(index) && <button onClick={() => removeElementFromArray(path, index)}>Remove</button>}
                {index < item.length - 1 ? ',' : ''}
              </div>
            ))}
              {allPrimitive && <button onClick={() => addElementToArray(path, '')}>Add Element</button>}
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
        <div>
          <input
            style={{ color: 'black', width: 'auto', fontFamily: 'monospace' }}
            defaultValue={item}
            onBlur={(e) => handleChange(path, e.target.value)}
          />
          {errors[path] && <div style={{ color: 'red' }}>{errors[path]}</div>}
        </div>
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

export default ValidateValueChangeJson;
