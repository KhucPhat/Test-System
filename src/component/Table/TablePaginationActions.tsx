import { ListActionPagination } from "@/types/list";
import {
  faBackwardFast,
  faCaretLeft,
  faCaretRight,
  faForwardFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import * as React from "react";

const TablePaginationActions = () => {
  const [page, setPage] = React.useState<string>("1");

  const listAction = [
    {
      id: "pagination-prev",
      icon: faCaretLeft,
      action: () => {},
    },
    {
      id: "pagination-prev2",
      icon: faBackwardFast,
      action: () => {},
    },
    {
      id: "current-page",
      number: page,
    },
    {
      id: "pagination-next",
      icon: faCaretRight,
      action: () => {},
    },
    {
      id: "pagination-next2",
      icon: faForwardFast,
      action: () => {},
    },
  ];

  const ListButtonCustom = styled(ListItemButton)(() => ({
    border: "1px solid #00000054",
    borderRadius: "12px",
    padding: "0px 10px !important",
    marginRight: "10px",
    height: "30px",
  }));

  const ListItemCustom = styled(ListItem)(() => ({
    maxWidth: "320px",
    float: "right",
    marginTop: "10px",
  }));

  const handleChange = (event: SelectChangeEvent) => {
    setPage(event.target.value as string);
  };

  return (
    <Box>
      <List>
        <ListItemCustom>
          {listAction.map((item: ListActionPagination) => (
            <ListButtonCustom key={item.id}>
              <ListItemText
                primary={
                  <>
                    {item?.icon ? (
                      <FontAwesomeIcon
                        icon={item.icon}
                        style={{ color: "#00000096", fontSize: "14px" }}
                      />
                    ) : (
                      <Typography
                        sx={{
                          color: "#00000096",
                          fontSize: "14px",
                          textAlign: "center",
                        }}
                      >
                        {item?.number}
                      </Typography>
                    )}
                  </>
                }
                sx={{ textAlign: "center" }}
              />
            </ListButtonCustom>
          ))}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: "30px", borderRightWidth: "medium" }}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue="10"
            onChange={handleChange}
            sx={{
              "& .MuiInputBase-input": {
                padding: "4px 26px",
              },
              "& .MuiOutlinedInput-input": {
                padding: "0px",
              },
              padding: "4px 10px",
              marginLeft: "10px",
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </ListItemCustom>
      </List>
    </Box>
  );
};

export default TablePaginationActions;
