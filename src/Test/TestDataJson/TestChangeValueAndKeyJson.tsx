import { useState } from 'react';

const TestChangeValueAndKeyJson = ({ data }) => {
  const [jsonData, setJsonData] = useState(data);
  const [newElementIndexes, setNewElementIndexes] = useState([]);

  function parsePath(path) {
    const regex = /(?:^|\.|\[)(\d+\.\d+|[^\.\[\]]+)(?=\]|\[|\.)?/g;
    const keys = [];
    let match;
    while (match = regex.exec(path)) {
      keys.push(match[1]);
    }
    return keys;
  }

  function updateNestedObject(data, keyPath, newValue) {
    let current = data;
    let parents = []; // This will track all parent objects and their respective keys
    let lastKey = null;

    // Traverse through the object to the last key, keeping track of all parents and the last key
    for (let i = 0; i < keyPath.length; i++) {
      parents.push({ parent: current, key: keyPath[i] });
      lastKey = keyPath[i];
      if (i === keyPath.length - 1) break;
      current = current[lastKey];
      if (current === undefined) {
        console.error(`Key ${lastKey} does not exist in the object.`);
        return null; // Return the original data if the path is invalid
      }
    }

    // Save the original value before updating
    let originalValue = current[lastKey];

    // Update the value at the last key
    current[lastKey] = newValue;

    // Check each parent to see if the key needs updating
    parents.forEach(parentInfo => {
      let parentObject = parentInfo.parent;
      let key = parentInfo.key;
      let currentValue = String(originalValue);

      if (key === currentValue && currentValue !== newValue) {
        // Perform key update operation
        parentObject[newValue] = parentObject[originalValue];
        delete parentObject[originalValue];

        // Update the key reference in the parent array to maintain correct references
        parentInfo.key = newValue;
      }
    });

    return data;
  };

  function handleChange(path, newValue) {
    const keys = parsePath(path);
    const safeCopy = Array.isArray(jsonData) ? [...jsonData] : { ...jsonData };

    const updatedData = updateNestedObject(safeCopy, keys, newValue);
    setJsonData(prevData => {
      return updatedData || prevData; // Return previous data if update failed
    });
  };

  function addElementToArray(path, suggestedValue) {
    const keys = parsePath(path);
    const array = keys.reduce((acc, key) => acc[key], jsonData);
    const updatedArray = [...array, suggestedValue];
    const newIndexes = [...newElementIndexes, updatedArray.length - 1];
    setNewElementIndexes(newIndexes);
    setJsonData(prevData => updateNestedObject({ ...prevData }, keys, updatedArray));
  }

  function removeElementFromArray(path, index) {
    const keys = parsePath(path);
    const array = keys.reduce((acc, key) => acc[key], jsonData);
    const updatedArray = array.filter((_, idx) => idx !== index);
    const updatedIndexes = newElementIndexes.filter(idx => idx !== index).map(idx => idx > index ? idx - 1 : idx);
    setNewElementIndexes(updatedIndexes);
    setJsonData(prevData => updateNestedObject({ ...prevData }, keys, updatedArray));
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
        </div>
      );
    }
  };

  return (
    <div style={{ fontFamily: 'monospace' }}>
      {formatJSON(jsonData)}
    </div>
  );
};

export default TestChangeValueAndKeyJson;
