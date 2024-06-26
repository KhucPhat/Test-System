import { Button, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import JSONFormatter from "./TestConvertJsonMap";
import MuiAlert from "@mui/material/Alert";
import { validateComplexJson, validateDataType } from "@/constants/function/functionValidate";

const TestImportExportJson = ({ data }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [listData, setListData] = useState(data);

  function convertToJsonAttributeObject(inputObject) {
    let result = [];

    // Duyệt qua từng thuộc tính ở cấp cao nhất của đối tượng
    for (const key in inputObject) {
      // Tạo một đối tượng mới với attrName là key, và value là chuỗi JSON của giá trị
      result.push({
        attrName: key,
        value: JSON.stringify(inputObject[key], null, 2), // Sử dụng JSON.stringify để định dạng chuỗi JSON đẹp mắt
      });
    }

    return result;
  };

  const handleDownloadJson = () => {
    const jsonString = `{${listData.map((item) => `"${item.attrName}": ${item.value}`).join(",")}}`;
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "exported_data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

function extractDetails(value, type) {
  let regex;
  if (type === "charSpec") {
    // Định dạng cho trường hợp 1: "@charspecID|api parameter name|default_value#"
    regex = /^@([^|]+)\|([^|]+)\|([^#]+)#$/;
  } else if (type === "testElement") {
    // Định dạng cho trường hợp 2: "@@attribtueTagName|TestDataElement#"
    regex = /^@@([^|]+)\|([^#]+)#$/;
  } else {
    throw new Error("Invalid type specified");
  }

  const match = value.match(regex);
  if (match) {
    if (type === "charSpec") {
      return {
        charSpecId: match[1],
        apiParameterName: match[2],
        apiParameterDefaultValue: match[3]
      };
    } else if (type === "testElement") {
      return {
        attributeTagName: match[1],
        testDataElement: match[2]
      };
    }
  } else {
    throw new Error("Invalid format for " + type);
  }
}

// Ví dụ sử dụng hàm extractDetails
try {
  const value1 = "@1234|paramName|defaultValue#";
  const details1 = extractDetails(value1, "case1");
  console.log("Case 1:", details1);

  const value2 = "@@attributeTagName|TestDataElement#";
  const details2 = extractDetails(value2, "case2");
  console.log("Case 2:", details2);
} catch (error) {
  console.error(error.message);
}

  
function validateJsonValues(json) {
  const errors = [];

  function validateDataType(key, value) {
    // Assuming a simplified set of rules for demonstration
    if (typeof value === 'string') {
      // Check for a valid date-time format
      if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) {
        // It's a valid date-time format
        if (isNaN(new Date(value).getTime())) {
          errors.push(`${key}: Invalid date-time format`);
        }
      } else if (value.length > 255) {
        errors.push(`${key}: String exceeds 255 characters`);
      } else {
        // Validate special patterns
      if (value.startsWith('@') && value.endsWith('#')) {
        if (!/^@\d{4}\|[a-z]+\|[a-z]+#$/.test(value)) {
          errors.push(`${key}: Invalid format for special case 1`);
        } else {
          const detailCharSpec = extractDetails(value, "case 1");
        }
      } else if (value.startsWith('@@') && value.endsWith('#')) {
        if (!/^@@[a-zA-Z]+(?:\|[a-zA-Z]+)+#$/.test(value)) {
          errors.push(`${key}: Invalid format for special case 2`);
        }
      }
      }
    } else if (typeof value === 'number') {
      if (!Number.isInteger(value) && !Number.isFinite(value)) {
        errors.push(`${key}: Number is not a valid Long or Float`);
      }
    } else if (typeof value === 'boolean') {
      if (typeof value !== 'boolean') {
        errors.push(`${key}: Not a valid Boolean`);
      }
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        validateDataType(`${key}[${index}]`, item);
      });
    } else if (typeof value === 'object' && value !== null) {
      for (const subKey in value) {
        validateDataType(`${key}.${subKey}`, value[subKey]);
      }
    } else {
      errors.push(`${key}: Unsupported data type`);
    }
  }

  function validateValue(key, value) {
    try {
      if (typeof value === 'string') {
        // Check if this is a JSON string
        if (value.startsWith('{') || value.startsWith('[')) {
          const obj = JSON.parse(value);
          validateDataType(key, obj);
        } else {
          validateDataType(key, value);
        }
      } else {
        validateDataType(key, value);
      }
    } catch (e) {
      errors.push(`${key}: Error parsing JSON or invalid data - ${e.message}`);
    }
  }

  for (const key in json) {
    validateValue(key, json[key]);
  }

  return errors.length > 0 ? errors : null;
};

  function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value; // Nếu không phải JSON, trả về chính giá trị đầu vào
  }
}

  function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function deepTypeCheck(original, newItem, path = "", errors = []) {
   const detailCharSpec = extractDetails(value, "case 1");
  if (typeof original === 'string' && typeof newItem === 'string') {
    original = safeParse(original);
    newItem = safeParse(newItem);
  }

  if (typeof original !== typeof newItem && newItem) {
    errors.push({ name: path, message: `Expected type '${typeof original}' but found type '${typeof newItem}'` });
  }
  
  if (typeof original === 'object' && original !== null && newItem !== null) {
    if (Array.isArray(original) !== Array.isArray(newItem)) {
      errors.push({ name: path, message: "One is an array and the other is not" });
    }
    if (Array.isArray(original)) {
      if (original.length !== newItem.length) {
        errors.push({ name: path, message: "Array lengths do not match" });
      }
      for (let i = 0; i < original.length; i++) {
        deepTypeCheck(original[i], newItem[i], `${path}[${i}]`, errors);
      }
    } else {
      const keysOriginal = Object.keys(original);
      const keysNewItem = Object.keys(newItem);
      if (keysOriginal.length !== keysNewItem.length) {
        errors.push({ name: path, message: "Object keys do not match" });
      }
      for (const key of keysOriginal) {
        if (!keysNewItem.includes(key)) {
          errors.push({ name: `${path}.${key}`, message: "Missing key in new item" });
        }
        deepTypeCheck(original[key], newItem[key], `${path}.${key}`, errors);
      }
    }
  } else if (typeof original === 'number' && typeof newItem === 'number') {
    if (Number.isInteger(original) !== Number.isInteger(newItem) || isFloat(original) !== isFloat(newItem)) {
      errors.push({ name: path, message: "Number types do not match (expected Integer or Float)" });
    }
  } else if (typeof original === 'string' && typeof newItem === 'string') {
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(original) && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(newItem)) {
      errors.push({ name: path, message: "Date-time formats do not match" });
    }
  } else if (typeof original === 'boolean' && typeof newItem !== 'boolean') {
    errors.push({ name: path, message: "Expected a boolean" });
  }

  return errors; // Return the error list as an array of objects
};
 
 const handleImportJson = (event, currentData) => {
  const file = event.target.files[0];
  if (file && file.type === "application/json") {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        const newData = convertToJsonAttributeObject(json);
        
        // Thực hiện kiểm tra dữ liệu mới so với dữ liệu hiện có
        const updatedData = [...listData];
         let errors = [];
        let errorMessages = [];
        newData.forEach((newItem) => {
          const existingItem = updatedData.find(item => item.attrName === newItem.attrName);
          if (existingItem) {
          deepTypeCheck(JSON.parse(existingItem.value), JSON.parse(newItem.value), newItem.attrName, errors);
          if (erros.length) {
            const dataErros = [
              ...errorMessages,
              ...errors
            ]
          }
            
          } else {
            updatedData.push(newItem);  // Thêm mới nếu không tồn tại
          }
        });

        if (errorMessages.length > 0) {
          setSnackbar({
            open: true,
               message: "Import Error: " + errors.map(error => `${error.name}: ${error.message}`).join(", "),
            severity: "error",
          });
        } else {
          setListData(updatedData);
          setSnackbar({
            open: true,
            message: "JSON imported successfully!",
            severity: "success",
          });
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Invalid JSON format!",
          severity: "error",
        });
      }
    };
    reader.readAsText(file);
  } else {
    setSnackbar({
      open: true,
      message: "Please upload a valid JSON file!",
      severity: "error",
    });
  }
};


  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  console.log(listData);
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handleDownloadJson}
          variant="contained"
          color="primary"
          style={{ marginTop: "20px", marginRight: '20px' }}
        >
          Export JSON
        </Button>
        <input
          type="file"
          accept="application/json"
          onChange={handleImportJson}
          style={{ marginTop: "20px" }}
        />
      </div>
      <div
        style={{
          margin: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          overflowX: "auto",
        }}
      >
        {`{`}
        {listData.map((item, index) => (
          <div
            key={index}
            style={{ marginBottom: "10px", fontFamily: "monospace" }}
          >
            <Typography>{`"${item.attrName}":`}</Typography>
            <JSONFormatter data={JSON.parse(item.value)} />
            {index < listData.length - 1 ? "," : ""}
          </div>
        ))}
        {`}`}
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default TestImportExportJson;
