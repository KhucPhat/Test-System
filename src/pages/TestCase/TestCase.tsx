import { NavItem, StepTab } from "@/component";
import { listTestCase } from "@/constants/lists/list";
import { Box, Grid } from "@mui/material";

const TestCase = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <NavItem listNav={listTestCase} />
        </Grid>
        <Grid item xs={10}>
          <Box sx={{ padding: "25px 0px" }}>
            <StepTab title="Test Case" listItem={listTestCase} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TestCase;
