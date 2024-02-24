import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Breadcrumbs, Divider, Typography } from "@mui/material";
import ButtonPrev from "../Button/ButtonPrev";
import { INavLink } from "@/types/list";
import { useParams } from "react-router-dom";

interface StepProp {
  title: string;
  listItem: INavLink[];
}

const StepTab: React.FC<StepProp> = (props) => {
  const { title, listItem } = props;
  const params = useParams();
  const itemSelected = listItem.find(
    (item: INavLink) => item.id === params.key
  );
  const breadcrumbs = [
    <Typography
      key="1"
      color="text.primary"
      sx={{ fontSize: "25px", fontWeight: "500", color: "#ff0000bf" }}
    >
      {title}
    </Typography>,
    <Typography key="3" color="text.primary">
      {itemSelected?.label}
    </Typography>,
  ];

  return (
    <Box className="flex-baseline">
      <Box sx={{ width: "60px" }}>
        <ButtonPrev />
      </Box>
      <Box sx={{ width: "100%", marginRight: "60px" }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
        <Divider />
      </Box>
    </Box>
  );
};

export default StepTab;
