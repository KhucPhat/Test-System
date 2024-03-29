import { TableData } from "@/component";
import { memo } from "react";

const TableTest = (props) => {
  const { listAttributes, setListAttributes } = props;

  const attributeType = [
    {
      id: "single",
      label: "Single",
      value: 0,
    },
    {
      id: "list",
      label: "List",
      value: 1,
    },
  ];

  const primiteType = [
    {
      id: "long",
      label: "Long",
      value: 0,
    },
    {
      id: "string",
      label: "String",
      value: 1,
    },
  ];

  const displayRule = [
    {
      id: "date",
      label: "Date",
      value: 2,
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
      type: "input",
      key: "attribute_name",
    },
    {
      id: "attribute-type",
      label: "Attribute Type",
      type: "select",
      key: "attribute_type",
      options: attributeType,
    },
    {
      id: "primitive-data",
      label: "Primitive Data Type",
      type: "select",
      key: "primitive_type",
      options: primiteType,
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
      options: displayRule,
    },
    {
      id: "action",
      label: "Action",
      type: "button-delete",
      key: "action_delete",
    },
  ];

  return (
    <TableData
      listRows={fieldRow}
      listCells={listAttributes}
      setListAttributes={setListAttributes}
    />
  );
};

export default memo(TableTest);
