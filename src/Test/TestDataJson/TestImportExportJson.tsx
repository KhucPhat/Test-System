import React, { useState } from "react";
import {
  Button,
  Snackbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Box,
} from "@mui/material";
import JSONFormatter from "./TestConvertJsonMap";
import MuiAlert from "@mui/material/Alert";
import {
  validateComplexJson,
  validateDataType,
} from "@/constants/function/functionValidate";

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
        isUse: false, // Mặc định isUse là false
      });
    }

    return result;
  }

  function validateNestedJson(obj) {
    const results = [];

    function traverseJson(subObj, path = "") {
      if (subObj && typeof subObj === "object") {
        for (const key in subObj) {
          const newPath = path ? `${path}.${key}` : key;
          if (typeof subObj[key] === "object") {
            traverseJson(subObj[key], newPath);
          } else {
            const value = subObj[key].toString();
            // console.log(value);
            if (value.length > 255) {
              results.push(`${newPath}: value exceeds 255 characters`);
            }
          }
        }
      } else {
        const value = subObj.toString();
        if (value.length > 255) {
          results.push(`${path}: value exceeds 255 characters`);
        }
      }
    }

    traverseJson(obj);
    return results;
  }

  const handleDownloadJson = () => {
    const jsonString = `{${listData
      .filter((item) => item.isUse)
      .map((item) => `"${item.attrName}": ${item.value}`)
      .join(",")}}`;
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
          apiParameterDefaultValue: match[3],
        };
      } else if (type === "testElement") {
        return {
          attributeTagName: match[1],
          testDataElement: match[2],
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
      if (typeof value === "string") {
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
          if (value.startsWith("@") && value.endsWith("#")) {
            if (!/^@\d{4}\|[a-z]+\|[a-z]+#$/.test(value)) {
              errors.push(`${key}: Invalid format for special case 1`);
            } else {
              const detailCharSpec = extractDetails(value, "case 1");
            }
          } else if (value.startsWith("@@") && value.endsWith("#")) {
            if (!/^@@[a-zA-Z]+(?:\|[a-zA-Z]+)+#$/.test(value)) {
              errors.push(`${key}: Invalid format for special case 2`);
            }
          }
        }
      } else if (typeof value === "number") {
        if (!Number.isInteger(value) && !Number.isFinite(value)) {
          errors.push(`${key}: Number is not a valid Long or Float`);
        }
      } else if (typeof value === "boolean") {
        if (typeof value !== "boolean") {
          errors.push(`${key}: Not a valid Boolean`);
        }
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          validateDataType(`${key}[${index}]`, item);
        });
      } else if (typeof value === "object" && value !== null) {
        for (const subKey in value) {
          validateDataType(`${key}.${subKey}`, value[subKey]);
        }
      } else {
        errors.push(`${key}: Unsupported data type`);
      }
    }

    function validateValue(key, value) {
      try {
        if (typeof value === "string") {
          // Check if this is a JSON string
          if (value.startsWith("{") || value.startsWith("[")) {
            const obj = JSON.parse(value);
            validateDataType(key, obj);
          } else {
            validateDataType(key, value);
          }
        } else {
          validateDataType(key, value);
        }
      } catch (e) {
        errors.push(
          `${key}: Error parsing JSON or invalid data - ${e.message}`
        );
      }
    }

    for (const key in json) {
      validateValue(key, json[key]);
    }

    return errors.length > 0 ? errors : null;
  }

  function safeParse(value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value; // Nếu không phải JSON, trả về chính giá trị đầu vào
    }
  }

  function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  };

const handleCheckCharSpec = async (
  original: string,
  newItem: string,
  listCharSpec: any[]
) => {
  if (checkFormatCharSpec(original) && !checkFormatCharSpec(newItem)) {
    const details1 = extractDetails(original, "case1");

    // Xóa phần tử nếu không đúng định dạng mới
    listCharSpec = await new Promise((resolve) => {
      const updatedList = listCharSpec.filter(char => char.id !== details1.id);
      resolve(updatedList);
    });
  } else {
    const details2 = extractDetails(newItem, "case2");

    // Cập nhật hoặc thêm mới phần tử
    listCharSpec = await new Promise((resolve) => {
      const index = listCharSpec.findIndex(char => char.id === details2.id);
      if (index !== -1) {
        // Nếu phần tử đã tồn tại, cập nhật nó
        listCharSpec[index] = details2;
      } else {
        // Nếu phần tử chưa tồn tại, thêm mới
        listCharSpec.push(details2);
      }
      resolve(listCharSpec);
    });
  }

  // Trả về danh sách đã cập nhật
  return listCharSpec;
}

  
async function deepTypeCheck(original, newItem, path = "", errors = [], listCharSpec = []) {
  // Sử dụng handleCheckCharSpec
  listCharSpec = await handleCheckCharSpec(original, newItem, listCharSpec);

  if (typeof original === "string" && typeof newItem === "string") {
    original = safeParse(original);
    newItem = safeParse(newItem);
  }

  if (typeof original !== typeof newItem && newItem) {
    errors.push({
      name: path,
      message: `Expected type '${typeof original}' but found type '${typeof newItem}'`,
    });
  }

  if (typeof original === "object" && original !== null && newItem !== null) {
    if (Array.isArray(original) !== Array.isArray(newItem)) {
      errors.push({
        name: path,
        message: "One is an array and the other is not",
      });
    }
    if (Array.isArray(original)) {
      if (original.length !== newItem.length) {
        errors.push({ name: path, message: "Array lengths do not match" });
      }
      for (let i = 0; i < original.length; i++) {
        const result = await deepTypeCheck(original[i], newItem[i], `${path}[${i}]`, errors, listCharSpec);
        errors = result.errors;
        listCharSpec = result.listCharSpec;
      }
    } else {
      const keysOriginal = Object.keys(original);
      const keysNewItem = Object.keys(newItem);
      if (keysOriginal.length !== keysNewItem.length) {
        errors.push({ name: path, message: "Object keys do not match" });
      }
      for (const key of keysOriginal) {
        if (!keysNewItem.includes(key)) {
          errors.push({
            name: `${path}.${key}`,
            message: "Missing key in new item",
          });
        }
        const result = await deepTypeCheck(original[key], newItem[key], `${path}.${key}`, errors, listCharSpec);
        errors = result.errors;
        listCharSpec = result.listCharSpec;
      }
    }
  } else if (typeof original === "number" && typeof newItem === "number") {
    if (
      Number.isInteger(original) !== Number.isInteger(newItem) ||
      isFloat(original) !== isFloat(newItem)
    ) {
      errors.push({
        name: path,
        message: "Number types do not match (expected Integer or Float)",
      });
    }
  } else if (typeof original === "string" && typeof newItem === "string") {
    if (
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(original) &&
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(newItem)
    ) {
      errors.push({ name: path, message: "Date-time formats do not match" });
    }
  } else if (typeof original === "boolean" && typeof newItem !== "boolean") {
    errors.push({ name: path, message: "Expected a boolean" });
  }

  return { errors, listCharSpec }; // Trả về đối tượng chứa cả errors và listCharSpec
}

const handleImportJson = async (event, currentData, listCurrentCharSpec) => {
  const file = event.target.files[0];
  if (file && file.type === "application/json") {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const json = JSON.parse(e.target.result);
        const newData = convertToJsonAttributeObject(json);

        // Khởi tạo listCharSpec từ listCurrentCharSpec
        let listCharSpec = [...listCurrentCharSpec];

        // Thực hiện kiểm tra dữ liệu mới so với dữ liệu hiện có
        const updatedData = [...currentData];
        let errors = [];
        let errorMessages = [];

        for (const newItem of newData) {
          const existingItem = updatedData.find(
            (item) => item.attrName === newItem.attrName
          );
          if (existingItem) {
            const result = await deepTypeCheck(
              JSON.parse(existingItem.value),
              JSON.parse(newItem.value),
              newItem.attrName,
              errors,
              listCharSpec
            );
            errors = result.errors;
            listCharSpec = result.listCharSpec;
            if (errors.length) {
              errorMessages = [...errorMessages, ...errors];
            }
          } else {
            updatedData.push(newItem); // Thêm mới nếu không tồn tại
          }
        }

        if (errorMessages.length > 0) {
          setSnackbar({
            open: true,
            message:
              "Import Error: " +
              errorMessages
                .map((error) => `${error.name}: ${error.message}`)
                .join(", "),
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
          style={{ marginTop: "20px", marginRight: "20px" }}
        >
          Export JSON
        </Button>
        <input
          type="file"
          accept="application/json"
          onChange={(event) => {
            handleImportJson(
              event,
              listData.filter((item) => item.isUse)
            );
          }}
          style={{ marginTop: "20px" }}
        />
      </div>
      <Box>
        <div
          style={{
            margin: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "100%",
            height: "400px",
            overflowX: "auto",
          }}
        >
          {`{`}
          {listData
            .filter((item) => item.isUse)
            .map((item, index) => (
              <div
                key={index}
                style={{ marginBottom: "10px", fontFamily: "monospace" }}
              >
                <Typography>{`"${item.attrName}":`}</Typography>
                <JSONFormatter data={JSON.parse(item.value)} />
                {index < listData.filter((item) => item.isUse).length - 1
                  ? ","
                  : ""}
              </div>
            ))}
          {`}`}
        </div>

        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Attribute Name</TableCell>
                <TableCell>Value</TableCell>
                <TableCell align="center">isUse</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.attrName}</TableCell>
                  <TableCell>
                    <Typography variant="body2" component="div">
                      <pre>{item.value}</pre>
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={item.isUse}
                      onChange={() =>
                        setListData((prevData) =>
                          prevData.map((prevItem, i) =>
                            i === index
                              ? { ...prevItem, isUse: !prevItem.isUse }
                              : prevItem
                          )
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

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
