import React, { useState } from "react";
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
} from "@mui/material";

const initialRows = [
  {
    id: 1,
    name: "Alice",
    age: 24,
    dataType: "String",
    suggestBody: "Sample text",
  },
  { id: 2, name: "Bob", age: 30, dataType: "Boolean", suggestBody: "true" },
  { id: 3, name: "Charlie", age: 22, dataType: "Long", suggestBody: "1000" },
];

const ageOptions = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const dataTypeOptions = ["Long", "Float", "Boolean", "DateTime", "String"];
const sampleValues = {
  Long: "1000",
  Float: "10.5",
  Boolean: "true",
  DateTime: "2024-01-01T12:00:00",
  String: "Sample text",
};

function validateValue(dataType, value) {
  switch (dataType) {
    case "Long":
    case "Float":
      if (!/^\d+(\.\d+)?$/.test(value)) {
        return "Must be a numeric value";
      }
      break;
    case "Boolean":
      if (!/^(true|false)$/i.test(value)) {
        return "Must be true or false";
      }
      break;
    case "DateTime":
      if (isNaN(new Date(value).getTime())) {
        return "Must be a valid date-time format";
      }
      break;
    case "String":
      // For string, assume all input is valid
      break;
    default:
      return "Invalid data type";
  }
  return "";
}

function Test() {
  const [rows, setRows] = useState(initialRows);

  const handleChange = (id, field, value) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        if (field === "dataType") {
          return { ...row, dataType: value, suggestBody: sampleValues[value] };
        }
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Data Type</TableCell>
            <TableCell>Suggest Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                <TextField
                  value={row.name}
                  onChange={(e) => handleChange(row.id, "name", e.target.value)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Autocomplete
                  options={ageOptions}
                  value={row.age}
                  onChange={(event, newValue) => {
                    handleChange(row.id, "age", newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Autocomplete
                  options={dataTypeOptions}
                  value={row.dataType}
                  onChange={(event, newValue) => {
                    handleChange(row.id, "dataType", newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.suggestBody}
                  onChange={(e) =>
                    handleChange(row.id, "suggestBody", e.target.value)
                  }
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Test;
