import { TableSearch } from "@/component";
import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddNewTest from "./AddNewTest";

const TestSystem = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const addNew = searchParams.get("add-new");

  const listRows = [
    {
      id: 1,
      label: "#",
      type: "index",
      key: "index",
      search: false,
      style: { width: "inherit" },
    },
    {
      id: 2,
      label: "ID",
      type: "text",
      key: "id",
      search: true,
      style: { width: "inherit" },
    },
    {
      id: 3,
      label: "Object Name",
      type: "text",
      key: "name",
      search: true,
      style: { width: "inherit" },
    },
    {
      id: 4,
      label: "Description",
      type: "text",
      key: "description",
      search: true,
      style: { width: "inherit" },
    },
    {
      id: 5,
      label: "Attribute Info",
      type: "text",
      key: "attribute",
      search: true,
      style: { width: "inherit" },
    },
    {
      id: 6,
      label: "Add new",
      type: "button-options",
      key: "add-new",
      button: true,
      style: { width: "100px" },
      action: () => {
        navigate("?add-new=true");
      },
    },
  ];

  const listCellItem = [
    {
      id: 1,
      name: "Racing",
      description: "Racing Object",
      attribute: "exPors",
    },
    {
      id: 2,
      name: "Racing",
      description: "Racing Object",
      attribute: "exPors",
    },
  ];

  const listButtonOptions = [
    {
      id: "view",
      icon: faEye,
      action: () => {},
    },
    {
      id: "edit",
      icon: faPen,
      action: () => {},
    },
    {
      id: "delete",
      icon: faTrashCan,
      action: () => {},
    },
  ];

  const DataBody = () => {
    if (addNew) return <AddNewTest />;

    return (
      <TableSearch
        listRows={listRows}
        listCellItem={listCellItem}
        listButton={listButtonOptions}
      />
    );
  };

  return (
    <>
      <DataBody />
    </>
  );
};

export default TestSystem;
