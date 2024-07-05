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

  const handleImportJson = (event, currentData) => {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024;

    if (file && file.type === "application/json") {
      if (file.size > maxSize) {
        setSnackbar({
          open: true,
          message: "File size exceeds 5MB limit. Please upload a smaller file.",
          severity: "error",
        });
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target.result);
            const newData = convertToJsonAttributeObject(json);
            const validationErrors = validateNestedJson(json);

            if (validationErrors.length > 0) {
              setSnackbar({
                open: true,
                message: `Errors found: ${validationErrors.join(", ")}`,
                severity: "error",
              });
              return; // Stop further processing if there are validation errors
            }
            // Update listData with existing items and mark them as isUse: true
            const updatedData = listData.map((item) => {
              const newItem = newData.find(
                (newItem) => newItem.attrName === item.attrName
              );
              if (newItem) {
                return {
                  ...item,
                  value: newItem.value,
                  isUse: true,
                };
              } else {
                return {
                  ...item,
                  isUse: false,
                };
              }
            });

            // Check for missing attributes in imported data
            const missingAttributes = currentData.filter(
              (item) =>
                !newData.some((newItem) => newItem.attrName === item.attrName)
            );

            // Update listData with missing attributes marked as isUse: false
            missingAttributes.forEach((missingItem) => {
              updatedData.push({
                attrName: missingItem.attrName,
                value: missingItem.value,
                isUse: false,
              });
            });

            // Check for additional attributes in imported data
            const additionalAttributes = listData.filter(
              (newItem) =>
                !listData.some((item) => item.attrName === newItem.attrName)
            );

            // Add additional attributes to listData and data content
            additionalAttributes.forEach((additionalItem) => {
              updatedData.push({
                attrName: additionalItem.attrName,
                value: additionalItem.value,
                isUse: true,
              });
            });
            console.log(updatedData);

            setListData(updatedData);

            if (missingAttributes.length > 0) {
              setSnackbar({
                open: true,
                message: `Imported JSON is missing attributes: ${missingAttributes
                  .map((item) => `"${item.attrName}"`)
                  .join(", ")}`,
                severity: "error",
              });
            }

            if (additionalAttributes.length > 0) {
              setSnackbar({
                open: true,
                message: `Imported JSON has additional attributes: ${additionalAttributes
                  .map((item) => `"${item.attrName}"`)
                  .join(", ")}`,
                severity: "info",
              });
            }

            // If no missing or additional attributes, show success message
            if (
              missingAttributes.length === 0 &&
              additionalAttributes.length === 0
            ) {
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
      }
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
