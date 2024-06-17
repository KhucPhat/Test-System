import { Button, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import JSONFormatter from "./TestConvertJsonMap";
import MuiAlert from "@mui/material/Alert";

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
  }

  const handleDownload = () => {
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          const newData = convertToJsonAttributeObject(json);
          const updatedData = [...listData];
          console.log(newData);

          newData.forEach((newItem) => {
            const existingItem = updatedData.find(item => item.attrName === newItem.attrName);
            if (existingItem && existingItem.value !== newItem.value) {
              // Chỉ cập nhật nếu giá trị mới khác với giá trị hiện tại
              existingItem.value = newItem.value;
            } else if (!existingItem) {
              // Nếu attrName không tồn tại, thêm mới vào danh sách
              updatedData.push(newItem);
            }
          });

          setListData(updatedData);
          setSnackbar({
            open: true,
            message: "JSON imported successfully!",
            severity: "success",
          });
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
          onClick={handleDownload}
          variant="contained"
          color="primary"
          style={{ marginTop: "20px", marginRight: '20px' }}
        >
          Export JSON
        </Button>
        <input
          type="file"
          accept="application/json"
          onChange={handleFileChange}
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
