import { List } from "@mui/material";
import React from "react";
import ListMenuCata from "../ListItem/ListMenuCata";

interface SubProps {
  dept: any;
  data: any;
  toggle: any;
  menuIndex: any;
}

const SubMenuCata: React.FC<SubProps> = (props) => {
  const { dept, data, toggle, menuIndex } = props;
  if (!toggle) {
    return null;
  }

  dept = dept + 1;

  return (
    <List>
      {data.map((menu, index) => {
        const menuName = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

        return (
          <ListMenuCata
            dept={dept}
            data={menu}
            hasSubMenu={menu.submenu}
            menuName={menuName}
            key={menuName}
            menuIndex={index}
          />
        );
      })}
    </List>
  );
};

export default SubMenuCata;
