import { InputSearch, MultiCatgory, TableSearch } from "@/component";
import { Box, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  faEye,
  faFile,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/system";
import { copyAndSort } from "@/constants/function/recursiveFunction";

const BoxCustom = styled(Box)(() => ({
  marginTop: "40px",
  border: "2px solid #ccc",
  borderRadius: "4px",
  height: "480px",
  maxHeight: "480px",
  overflow: "scroll",
}));

const Module = () => {
  const navigate = useNavigate();
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

  const menus = [
    {
      label: "Catagory 1",
      icon: faFile,
      hasCategory: true,
      subMenu: [
        {
          label: "Object 1,2",
          icon: faFile,
          hasCategory: false
        },
        {
          label: "Object 1",
          icon: faFile,
          hasCategory: false
        },
        {
          label: "Object 1,3",
          icon: faFile,
          hasCategory: false
        },
      ]
    },
    {
      label: "Object 3",
      icon: faFile,
      hasCategory: false
    },
    {
      label: "Catagory 2",
      icon: faFile,
      hasCategory: true,
      submenu: [
        {
          label: "Sub Catagory 1",
          icon: faFile,
          hasCategory: true,
        },
        {
          label: "Object 8",
          icon: faFile,
          hasCategory: false
        },
        {
          label: "Sub Catagory 2",
          icon: faFile,
          hasCategory: true,
        },
      ],
    },
        {
          label: "Sub 2",
          icon: faFile,
          hasCategory: true,
          submenu: [
            {
              label: "Deep 1",
              icon: faFile,
            },
            {
              label: "Deep 2",
              icon: faFile,
              submenu: [
                {
                  label: "Lorem 1",
                  icon: faFile,
                },
                {
                  label: "Lorem 2",
                  icon: faFile,
                  submenu: [
                    {
                      label: "Super Deep",
                      icon: faFile,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Sub Catagory 3",
          icon: faFile,
          hasCategory: true,
        },
        {
          label: "Sub Catagory 4",
          icon: faFile,
          hasCategory: true,
          submenu: [
            {
              label: "Last 1",
              icon: faFile,
            },
            {
              label: "Last 2",
              icon: faFile,
            },
            {
              label: "Last 3",
              icon: faFile,
            },
          ],
        },
        {
          label: "Object 3.21",
          icon: faFile,
          hasCategory: false
        },
      ],
    },
    {
      label: "Object 4",
      icon: faFile,
      hasCategory: false
    },
       {
      label: "Catagory 3",
      icon: faFile,
      hasCategory: true,
      submenu: [
        {
          label: "Sub 1",
          icon: faFile,
          hasCategory: true,
          submenu: [
            {
              label: "Boom 1",
              icon: faFile,
            },
            {
              label: "Boom 2",
              icon: faFile,
            },
          ],
        },
  ];

  const sortedMenus = copyAndSort(menus);
console.log(sortedMenus);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box sx={{ width: "100%" }}>
            <InputSearch
              positionIcon="start"
              placeholder="Search Module Name"
            />
          </Box>
          <BoxCustom>
            <MultiCatgory menus={menus} navigate={navigate} />
          </BoxCustom>
        </Grid>
        <Grid item xs={9}>
          <TableSearch
            listRows={listRows}
            listCellItem={listCellItem}
            listButton={listButtonOptions}
          />
          <TableSearch
            listRows={listRows}
            listCellItem={listCellItem}
            listButton={listButtonOptions}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Module;
