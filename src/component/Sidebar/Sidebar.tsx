import { sidebarLinks } from "@/constants/lists/list";
import { INavLink } from "@/types/list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link, useLocation } from "react-router-dom";

const ListCustom = styled(List)(() => ({
  width: "100%",
  height: "100%",
  backgroundColor: "#ffc0cb54",
}));

const ListItemCustom = styled(ListItem)(() => ({
  flexDirection: "column",
}));

export default function Sidebar() {
  const location = useLocation();

  return (
    <>
      <ListCustom>
        {sidebarLinks.map((item: INavLink, index: number) => {
          const isInCatalogPath = location.pathname.includes(item.id);
          return (
            <Link
              to={item.link}
              style={{ textDecoration: "unset", color: "#000" }}
              key={index}
            >
              <ListItemCustom key={index}>
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{ fontSize: "20px" }}
                />
                <Typography
                  sx={{
                    padding: "10px",
                    color:
                      isInCatalogPath ||
                      (item.id === "home" && location.pathname === "/")
                        ? "#ff0000bf"
                        : "#000",
                  }}
                >
                  {item.label}
                </Typography>
              </ListItemCustom>
              <Divider sx={{ borderColor: "#fff", borderBottomWidth: "5px" }} />
            </Link>
          );
        })}
      </ListCustom>
    </>
  );
}
