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
import SortedList from "./TestListParameters";
import DisplayComponent from "./TestShowDataFunction";
import TestMove from "./TestMoveUpMoveDown";
import CustomOutlinedInput from "./TestOnContextInput";
import ListInput from "./TestTableChangeInput";
import IndexInputs from "./TestTableChangeInput";
import ParameterInputs from "./TestShowDataFunction";
import EditableInputs from "./TestTableChangeInput";

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
    <EditableInputs />
  );
}

export default Test;
