import { InputSearch, MultiCatgory, TableSearch } from "@/component";
import { Box, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
      label: "Menu 1",
    },
    {
      label: "Menu 2",
      submenu: [
        {
          label: "Sub Menu 1",
        },
        {
          label: "Sub Menu 2",
        },
      ],
    },
    {
      label: "Menu 3",
      submenu: [
        {
          label: "Sub Menu 1",
          submenu: [
            {
              label: "Boom 1",
            },
            {
              label: "Boom 2",
            },
          ],
        },
        {
          label: "Sub Menu 2",
          submenu: [
            {
              label: "Deep 1",
            },
            {
              label: "Deep 2",
              submenu: [
                {
                  label: "Lorem 1",
                },
                {
                  label: "Lorem 2",
                  submenu: [
                    {
                      label: "Super Deep",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Sub Menu 3",
        },
        {
          label: "Sub Menu 4",
          submenu: [
            {
              label: "Last 1",
            },
            {
              label: "Last 2",
            },
            {
              label: "Last 3",
            },
          ],
        },
      ],
    },
    {
      label: "Menu 4",
    },
  ];

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
          <Box sx={{ paddingTop: "40px" }}>
            <MultiCatgory menus={menus} />
          </Box>
        </Grid>
        <Grid item xs={9}>
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
