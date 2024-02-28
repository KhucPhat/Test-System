import { NavItem, StepTab } from "@/component";
import { listCatalog } from "@/constants/lists/list";
import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import TestSystem from "./TestSystem/TestSystem";
import Module from "./Module/Module";

const Catalog = () => {
  const params = useParams();

  const DataItem = () => {
    switch (params.key) {
      case "test-system":
        return <TestSystem />;
      case "module":
        return <Module />;
      default:
        return;
    }
  };

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
              <DataItem />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Catalog;
