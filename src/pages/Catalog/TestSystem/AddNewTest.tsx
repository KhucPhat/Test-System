import { ButtonInherit, InputText, TableData } from "@/component";
import { Box } from "@mui/material";
import React from "react";

const AddNewTest = () => {
  const listField = [
    {
      id: "id",
      label: "ID",
      require: true,
      span: 2,
      placeholder: "0",
      style: { width: "70%" },
    },
    {
      id: "name",
      label: "Name",
      require: true,
      span: 10,
      placeholder: "Input Text Here",
      style: { width: "100%" },
    },
    {
      id: "description",
      label: "Description",
      require: false,
      span: 12,
      placeholder: "Input Text Here",
      style: { width: "100%" },
    },
  ];

  const fieldRow = [
    {
      id: "ID",
      label: "ID",
      type: "text",
      key: "id",
    },
    {
      id: "attribute-name",
      label: "Attribute Name",
      type: "text",
      key: "attribute_name",
    },
    {
      id: "attribute-type",
      label: "Attribute Type",
      type: "select",
      key: "attribute_type",
    },
    {
      id: "primitive-data",
      label: "Primitive Data Type",
      type: "select",
      key: "primitive_type",
    },
    {
      id: "object-data",
      label: "Object Data Type",
      type: "text",
      key: "object_type",
    },
    {
      id: "suggest-body",
      label: "Suggested Body",
      type: "text",
      key: "suggest_body",
    },
    {
      id: "displayed-rule",
      label: "Displayed Rule",
      type: "select",
      key: "displayed_rule",
    },
    {
      id: "action",
      label: "Action",
      type: "button-delete",
      key: "action_delete",
    },
  ];

  const listCellItem = [
    {
      id: "1",
      attribute_name: "effDate",
      attribute_type: [
        {
          id: "single",
          label: "Single Date",
        },
      ],
      primitive_type: [
        {
          id: "long",
          label: "Long Date",
        },
      ],
      object_type: "balance",
      suggest_body: "yyyy/MM/dd HH:mm:ss",
      displayed_rule: [
        {
          id: "date",
          label: "Date",
        },
      ],
      action_delete: true,
      selected: false,
    },
    {
      id: "2",
      attribute_name: "effDate",
      attribute_type: [
        {
          id: "single",
          label: "Single Date",
        },
      ],
      primitive_type: [
        {
          id: "long",
          label: "Long Date",
        },
      ],
      object_type: "balance",
      suggest_body: "yyyy/MM/dd HH:mm:ss",
      displayed_rule: [
        {
          id: "date",
          label: "Date",
        },
      ],
      action_delete: true,
      selected: true,
    },
    {
      id: "1",
      attribute_name: "effDate",
      attribute_type: [
        {
          id: "single",
          label: "Single Date",
        },
      ],
      primitive_type: [
        {
          id: "long",
          label: "Long Date",
        },
      ],
      object_type: "balance",
      suggest_body: "yyyy/MM/dd HH:mm:ss",
      displayed_rule: [
        {
          id: "date",
          label: "Date",
        },
      ],
      action_delete: true,
      selected: false,
    },
    {
      id: "2",
      attribute_name: "effDate",
      attribute_type: [
        {
          id: "single",
          label: "Single Date",
        },
      ],
      primitive_type: [
        {
          id: "long",
          label: "Long Date",
        },
      ],
      object_type: "balance",
      suggest_body: "yyyy/MM/dd HH:mm:ss",
      displayed_rule: [
        {
          id: "date",
          label: "Date",
        },
      ],
      action_delete: true,
      selected: true,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <InputText listField={listField} />
      <Box sx={{ padding: "80px 0px 10px", width: "100%", textAlign: "right" }}>
        <ButtonInherit
          title="Add Attribute"
          loading={false}
          disabled={false}
          style={{
            backgroundColor: "#ff0000bf",
            border: "unset",
            color: "#fff",
            textTransform: "inherit",
          }}
          backgroundColor="#ff0000bf"
          action={() => {
            console.log("Add Attribute");
          }}
        />
      </Box>
      <Box>
        <TableData listRows={fieldRow} listCells={listCellItem} />
      </Box>
    </Box>
  );
};

export default AddNewTest;
