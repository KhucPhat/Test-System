import { NavItem, StepItem, StepTab } from "@/component";
import { listDefinition } from "@/constants/lists/list";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Typography } from "@mui/material";

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
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon
                icon={faPlus}
                style={{
                  border: "2px solid red",
                  borderRadius: "50%",
                  padding: "10px 12px",
                  marginRight: "10px",
                }}
              />
              <Typography style={{ fontWeight: "600", color: "red" }}>
                {" "}
                Add Step
              </Typography>
            </Box>
            <StepItem />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Definition;
