import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Autocomplete,
  Alert,
} from '@mui/material';
import TestTree from './TestTree';
import TestTableSearch from './TestTableSearch';
import { convertJSONToArray, convertStringToArray, parseAndConvertJSON } from '@/constants/convertJson';
import AutocompleteWithCloseButton from './TestAutocompelete';
import SortableObjectArray from './TestSortArray';
import SortedList from './TestListParameters';
import TextHighlightWatcher from './TestSelectText';

const formatSuggestBody = (dataType, attributeType) => {
  const baseValues = {
    Long: '1000',
    Float: '10.5',
    Boolean: 'true',
    DateTime: '2024-01-01T12:00:00',
    String: 'Sample text',
  };
  const value = baseValues[dataType];
  return attributeType === 'List' ? `[${value}]` : value;
};

const initialRows = [
  { id: 1, name: 'Alice', age: 24, dataType: 'String', suggestBody: formatSuggestBody('String', 'Single'), attributeType: 'Single', error: '' },
  { id: 2, name: 'Bob', age: 30, dataType: 'Boolean', suggestBody: formatSuggestBody('Boolean', 'Single'), attributeType: 'Single', error: '' },
  { id: 3, name: 'Charlie', age: 22, dataType: 'Long', suggestBody: formatSuggestBody('Long', 'Single'), attributeType: 'Single', error: '' },
];


const ageOptions = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const dataTypeOptions = ['Long', 'Float', 'Boolean', 'DateTime', 'String'];


const attributeTypeOptions = [
  { id: 1, title: "Single" },
  { id: 2, title: "List" }
];


function Test() {
  const [rows, setRows] = useState(initialRows);

  const validateInput = (dataType, value, attributeType) => {
    if (attributeType === 'List') {
      if (!value.startsWith('[') || !value.endsWith(']')) return false;
      const items = value.slice(1, -1).split(',').map(item => item.trim());
      return items.every(item => validateDataType(dataType, item));
    } else {
      return validateDataType(dataType, value);
    }
  };
  
  const validateDataType = (dataType, value) => {
    switch (dataType) {
      case 'Long':
      case 'Float':
        return !isNaN(value) && value.trim() !== '';
      case 'Boolean':
        return value === 'true' || value === 'false';
      case 'DateTime':
        return !isNaN(Date.parse(value));
      case 'String':
        return typeof value === 'string';
      default:
        return false;
    }
  };
  
  
  const handleChange = (id, field, value) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        let suggestBody = row.suggestBody;
        let error = '';
  
        if (field === 'dataType' || field === 'attributeType') {
          // Only update suggestBody format if the change requires it
          const newSuggestBody = formatSuggestBody(value, field === 'dataType' ? row.attributeType : value);
          // Check if format needs to be updated to match new type
          if (field === 'dataType' || (field === 'attributeType' && ((value === 'List' && !suggestBody.startsWith('[')) || (value === 'Single' && suggestBody.startsWith('['))))) {
            suggestBody = newSuggestBody;
          }
          error = validateInput(row.dataType, suggestBody, row.attributeType) ? '' : 'Input does not match the data type or format.';
        } else if (field === 'suggestBody') {
          suggestBody = value;
          error = validateInput(row.dataType, value, row.attributeType) ? '' : 'Input does not match the data type or format.';
        }
  
        return {
          ...row,
          [field]: value,
          suggestBody,
          error
        };
      }
      return row;
    });
    setRows(newRows);
  };
  
//   function validateKeyWithJSONObject(input) {
//     const regex = /"([^"]+)":\s*({.*})/;
//     const match = input.match(regex);
//     console.log(match);

//     if (match && match[1] && match[2]) {
//         try {
//             // Loại bỏ các ký tự escape trước khi phân tích cú pháp JSON
//             const jsonString = match[2].replace(/\\\\"/g, '"').replace(/\\([^"])/g, '$1');
//             JSON.parse(jsonString);
//             return true; // Trả về true nếu chuỗi JSON là hợp lệ
//         } catch (error) {
//             console.error("Error parsing JSON:", error);
//             return false; // Trả về false nếu chuỗi JSON không hợp lệ
//         }
//     }

//     return false; // Trả về false nếu không tìm thấy mẫu phù hợp
// }

// // Sử dụng hàm
// const sampleInput = '"randomKey": {\\"name\\":\\"John\\", \\"age\\":30}';
// const isValidJSON = validateKeyWithJSONObject(sampleInput);

// if (isValidJSON) {
//     console.log("Input contains a valid JSON object under the specified key.");
// } else {
//     console.log("Input does not contain a valid JSON object under the specified key.");
// }

// const valueRules = [
//   {
//       test: (value) => typeof value === 'string',
//       message: 'Value must be a string'
//   },
//   {
//       test: (value) => typeof value === 'number' && value >= 0,
//       message: 'Value must be a non-negative number'
//   },
//   {
//       test: (value) => typeof value === 'boolean',
//       message: 'Value must be a boolean'
//   },
//   {
//       test: (value) => typeof value === 'string' && /^\w+@\w+\.\w+$/.test(value),
//       message: 'Value must be a valid email address'
//   }
// ];


// function validateJSONByValues(jsonString, valueRules) {
//   try {
//       const jsonObject = JSON.parse(jsonString);

//       // Duyệt qua mỗi giá trị trong jsonObject
//       Object.values(jsonObject).forEach(value => {
//           const rule = valueRules.find(rule => rule.test(value));
//           if (!rule) {
//               throw new Error('No matching rule found for value: ' + value);
//           }
//       });

//       return true; // Tất cả các giá trị đều hợp lệ
//   } catch (error) {
//       console.error('Validation error:', error.message);
//       return false; // Trả về false nếu không hợp lệ hoặc không thể phân tích
//   }
// }

// // Chuẩn bị và sử dụng hàm
// const jsonString = '{"name":"John", "age":a, "isActive":true, "email":"john@example.com"}';
// const isValid = validateJSONByValues(jsonString, valueRules);

// if (isValid) {
//   console.log("JSON values are valid according to the rules.");
// } else {
//   console.log("Invalid JSON values according to the rules.");
// }
const jsonString1 = '[{"name1": 0, "name2": "adaadad", "name3": {}}]';
  
// Parse JSON string to JavaScript object
const jsonObject = JSON.parse(jsonString1);

function parseJsonToKeyValueArray(jsonString, filterEmptyObjects = false) {
  try {
    // Parse JSON string to JavaScript object
    const jsonObject = JSON.parse(jsonString);

    // Initialize the output array and a counter for the id
    const keyValueArray = [];
    let idCounter = 1;

    // Helper function to process an object
    function processObject(obj, prefix = '') {
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          if (Object.keys(value).length === 0) {
            if (!filterEmptyObjects) {
              keyValueArray.push({ id: idCounter++, name: fullKey, value: '{}' });
            }
          } else {
            processObject(value, fullKey);
          }
        } else {
          keyValueArray.push({ id: idCounter++, name: fullKey, value: JSON.stringify(value) });
        }
      }
    }

    // Determine if the jsonObject is an array or a single object
    if (Array.isArray(jsonObject)) {
      jsonObject.forEach(item => processObject(item));
    } else if (typeof jsonObject === 'object' && jsonObject !== null) {
      processObject(jsonObject);
    } else {
      // Handle primitive types or nulls
      keyValueArray.push({ id: idCounter++, name: 'value', value: JSON.stringify(jsonObject) });
    }

    return keyValueArray;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return []; // Return an empty array in case of error
  }
}

function convertArrayToCustomJson(array) {
  const result = {};
  array.forEach(item => {
      // Gán giá trị của 'value' vào khóa tương ứng với giá trị của 'name'
      result[item.name] = item.value;
  });
  return JSON.stringify(result);
}
function ordinalSuffix(i) {
  var j = i % 10,
      k = i % 100;
  if (j == 1 && k != 11) {
      return i + "st";
  }
  if (j == 2 && k != 12) {
      return i + "nd";
  }
  if (j == 3 && k != 13) {
      return i + "rd";
  }
  return i + "th";
}

const items = ['Apple', 'Banana', 'Orange', 'Grape'];

const labeledItems = items.map((item, index) => {
  return ordinalSuffix(index + 1) + " - " + item;
});

// let data = [
//   {value: 'ad', test: 'sub1', func: "getList"},
//   {pri: 'Long', name: 'Bal', func: "getList"},
//   {value: 'ad1', test: 'sub1', func: "getList"},
//   {value: 'ad2', name: 'Bal', func: "getList"}
// ];

// let seen = {};
// let result = data.filter(item => {

//   let key = item.func; // Sử dụng func làm key
//   if (item.name) key += '|' + item.name; // Nếu name tồn tại, thêm vào key
//   if (item.test) key += '|' + item.test; // Nếu test tồn tại, thêm vào key

//   if (!seen[key]) {
//       seen[key] = true;
//       return true;
//   }
//   return false;
// });

// console.log(result);

let data = [
  {value: 'ad', test: 'sub1', func: "getList", type: 'left'},
  {pri: 'Long', name: 'Bal', func: "getList", type: "left"},
  {value: 'ad', test: 'sub1', func: "getList", type: 'right'},
  {pri: 'Long', name: 'Bal', func: "getList", type: "right"}
];

let sampleArray = [
  {value: 'ad', test: 'sub1', func: "getList", type: 'left'},
  {pri: 'Long', name: 'Bal', func: "getList", type: "left"}
];

let result = data.filter(item => !sampleArray.some(sampleItem =>
  item.func === sampleItem.func &&
  item.type === sampleItem.type
));

return (
<TextHighlightWatcher />
);
}

export default Test;
