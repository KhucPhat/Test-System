import { INavLink } from "@/types/list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface PropsNav {
  listNav: INavLink[];
}

const NavItem: React.FC<PropsNav> = (props) => {
  const { listNav } = props;
  const location = useLocation();
  console.log(location);
  return (
    <>
      <List>
        {listNav.map((item: INavLink, index) => {
          const isActive = item.link === location.pathname;
          return (
            <Link
              to={item.link}
              key={index}
              style={{ textDecoration: "unset", color: "#000" }}
            >
              <ListItem sx={{ padding: "10px 0px" }}>
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{ fontSize: "20px" }}
                />
                <Typography
                  sx={{
                    padding: "10px",
                    color: isActive ? "#ff0000bf" : "#000",
                  }}
                >
                  {item.label}
                </Typography>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </>
  );
};

export default NavItem;
