import { MenuCatagory, SubMenu } from "@/types/catagory";
import { Box, ListItem, Typography } from "@mui/material";
import * as React from "react";
import SubMenuCata from "./SubMenuCata";

interface ListProps {
  dept: number;
  data: MenuCatagory;
  hasSubMenu?: SubMenu | undefined;
  menuName: string;
  menuIndex: number;
}

const ListMenuCata: React.FC<ListProps> = (props) => {
  const { dept, data, hasSubMenu, menuName, menuIndex } = props;
  const [activeMenus, setActiveMenus] = React.useState([]);

  const handleMenuClick = (data: MenuCatagory) => {
    console.log(data);
  };

  const handleArrowClick = (menuName: string) => {
    let newActiveMenus = [...activeMenus];

    if (newActiveMenus.includes(menuName)) {
      var index = newActiveMenus.indexOf(menuName);
      if (index > -1) {
        newActiveMenus.splice(index, 1);
      }
    } else {
      newActiveMenus.push(menuName);
    }

    setActiveMenus(newActiveMenus);
  };

  return (
    <div>
      <ListItem>
        <Box>
          <Typography onClick={() => handleMenuClick(data)}>
            {data.label}{" "}
          </Typography>
          {hasSubMenu && (
            <Typography
              onClick={() => handleArrowClick(menuName)}
              toggle={activeMenus.includes(menuName)}
            />
          )}
        </Box>
        {hasSubMenu && (
          <SubMenuCata
            dept={dept}
            data={data.submenu}
            toggle={activeMenus.includes(menuName)}
            menuIndex={menuIndex}
          />
        )}
      </ListItem>
    </div>
  );
};

export default ListMenuCata;
