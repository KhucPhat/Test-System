import { NavItem, StepTab } from "@/component";
import { listCatalog } from "@/constants/lists/list";
import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

const Catalog = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={2}>
          <NavItem listNav={listCatalog} />
        </Grid>
        <Grid item xs={10}>
          <Box sx={{ padding: "25px 0px" }}>
            <StepTab title="Catalog" listItem={listCatalog} />
            <Box sx={{ padding: "10px 55px 0px" }}>
              <Outlet />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Catalog;
