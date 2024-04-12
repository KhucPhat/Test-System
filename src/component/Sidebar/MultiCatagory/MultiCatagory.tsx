import { MenuCatagory } from "@/types/catagory";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Fade,
  Menu,
  MenuItem,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import React from "react";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const ListItem = styled.li``;
const Item = styled.div<{ dept: number }>`
  display: flex;
  align-items: center;
  padding: 12px 0px;
`;
const Label = styled.span`
  width: 100%;
  display: block;
  cursor: pointer;
`;

interface MultiProps {
  menus: MenuCatagory[];
  navigate: (path: string) => void;
}

interface MenuProps {
  dept: number;
  data: MenuCatagory;
  hasSubMenu: boolean;
  menuName: string | never;
  menuIndex: number;
}

interface SubProps {
  dept: number;
  data: MenuCatagory[];
  toggle: boolean;
  menuIndex: number;
}

interface IconProps {
  isToggle: boolean;
}

const MultiCatagory: React.FC<MultiProps> = (props) => {
  const { menus, navigate } = props;
  const [activeMenus, setActiveMenus] = React.useState<string[]>([""]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // const handleMenuClick = (data) => {
  //   console.log(data);
  // };

  const handleArrowClick = (menuName: string) => {
    const newActiveMenus: string[] = [...activeMenus];

    if (newActiveMenus.includes(menuName)) {
      const index = newActiveMenus.indexOf(menuName);
      if (index > -1) {
        newActiveMenus.splice(index, 1);
      }
    } else {
      newActiveMenus.push(menuName);
    }

    setActiveMenus(newActiveMenus);
  };
  console.log(activeMenus);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const IconSub: React.FC<IconProps> = ({ isToggle }) => {
    return (
      <FontAwesomeIcon
        icon={isToggle ? faCaretDown : faCaretRight}
        style={{ paddingRight: "10px" }}
      />
    );
  };

  const ListMenu = ({
    dept,
    data,
    hasSubMenu,
    menuName,
    menuIndex,
  }: MenuProps) => {
    const isToggle: boolean = activeMenus.includes(menuName);

    return (
      <ListItem
        style={{ marginLeft: "12px" }}
        onContextMenu={handleContextMenu}
      >
        <Item dept={dept} onClick={() => handleArrowClick(menuName)}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {data?.submenu ? <IconSub isToggle={isToggle} /> : null}
            <FontAwesomeIcon icon={data.icon} style={{ marginRight: "10px" }} />
          </div>
          <Label>{data.label} </Label>
        </Item>
        {hasSubMenu && data?.submenu ? (
          <SubMenu
            dept={dept}
            data={data.submenu}
            toggle={isToggle ?? false}
            menuIndex={menuIndex}
          />
        ) : null}
      </ListItem>
    );
  };

  const SubMenu = ({ dept, data, toggle, menuIndex }: SubProps) => {
    if (!toggle) {
      return null;
    }

    dept = dept + 1;

    return (
      <Box>
        {data.map((menu: MenuCatagory, index) => {
          const menuName = `sidebar-submenu-${dept}-${menuIndex}-${index}`;
          const isSubMenu = menu.submenu ? true : false;

          return (
            // <ListMenu
            //   dept={dept}
            //   data={menu}
            //   hasSubMenu={isSubMenu}
            //   menuName={menuName}
            //   key={menuName}
            //   menuIndex={index}
            // />
            <Typography  onContextMenu={handleContextMenu}>adaad</Typography>
          );
        })}
      </Box>
    );
  };

  return (
    <>
      <List>
        {menus.map((menu, index) => {
          const dept = 1;
          const menuName = `sidebar-menu-${dept}-${index}`;
          const isSubMenu = menu.submenu ? true : false;

          return (
            <>
              <ListMenu
                dept={dept}
                data={menu}
                hasSubMenu={isSubMenu}
                menuName={menuName}
                key={menuName}
                menuIndex={index}
              />
              {/* <Typography  onContextMenu={handleContextMenu}>adaad</Typography> */}
            </>
          );
        })}
      </List>
      {open && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Option 1</MenuItem>
          <MenuItem onClick={handleClose}>Option 2</MenuItem>
          <MenuItem onClick={handleClose}>Option 3</MenuItem>
        </Menu>
      )}
    </>
  );
};

export default MultiCatagory;
