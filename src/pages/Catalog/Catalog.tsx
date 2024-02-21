import NavItem from "@/component/Sidebar/NavItem";
import { listCatalog } from "@/constants/lists/list";
import { Grid } from "@mui/material";
import React from "react";

const Catalog = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <NavItem listNav={listCatalog} />
        </Grid>
      </Grid>
    </>
  );
};

export default Catalog;
