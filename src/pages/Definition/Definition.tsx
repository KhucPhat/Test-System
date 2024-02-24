import { NavItem, StepTab } from "@/component";
import { listDefinition } from "@/constants/lists/list";
import { Box, Grid } from "@mui/material";

const Definition = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <NavItem listNav={listDefinition} />
        </Grid>
        <Grid item xs={10}>
          <Box sx={{ padding: "25px 0px" }}>
            <StepTab title="Definition" listItem={listDefinition} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Definition;
