import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faFile } from '@fortawesome/free-solid-svg-icons';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li<{ isActive: boolean, depth: number, numChildren: number }>`
  position: relative;
  padding-left: ${props => props.depth * 20}px; /* Tính toán khoảng cách lề dựa trên độ sâu của mục */
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Label = styled.span`
  margin-left: 10px;
`;

function countVisibleChildren(menu, activeMenus) {
  if (!menu.submenu || !activeMenus.includes(menu.label)) {
    return 0;
  }
  return menu.submenu.reduce((total, sub) => {
    return total + 1 + countVisibleChildren(sub, activeMenus);
  }, 0);
}

const menus = [
  {
    label: "Category 1",
    icon: faFile,
    submenu: [
      { label: "Object 1,2", icon: faFile },
      { label: "Object 1,3", icon: faFile }
    ]
  },
  {
    label: "Category 2",
    icon: faFile,
    submenu: [
      { label: "Sub Category 1", icon: faFile },
      { label: "Sub Category 2", icon: faFile }
    ]
  },
  {
    label: "Category 3",
    icon: faFile,
    submenu: [
      {
        label: "Sub 1",
        icon: faFile,
        submenu: [
          { label: "Boom 1", icon: faFile },
          { label: "Boom 2", icon: faFile }
        ]
      },
      {
        label: "Sub 2",
        icon: faFile,
        submenu: [
          { label: "Deep 1", icon: faFile },
          { label: "Deep 2", icon: faFile }
        ]
      }
    ]
  },
  {
    label: "Object 4",
    icon: faFile
  }
];

const MultiCategory = ({ data, depth = 0 }) => {
  const [activeMenus, setActiveMenus] = useState([]);

  const toggleMenu = (menuLabel) => {
    setActiveMenus(prev =>
      prev.includes(menuLabel) ? prev.filter(m => m !== menuLabel) : [...prev, menuLabel]
    );
  };

  return (
    <List>
      {data.map((menu, index) => {
        const isActive = activeMenus.includes(menu.label);
        const numVisibleChildren = countVisibleChildren(menu, activeMenus);

        return (
          <ListItem key={index} isActive={isActive} depth={depth} numChildren={numVisibleChildren}>
            <Item onClick={() => toggleMenu(menu.label)}>
              <FontAwesomeIcon icon={isActive ? faCaretDown : faCaretRight} />
              <Label>{menu.label}</Label>
            </Item>
            {isActive && menu.submenu && (
              <MultiCategory data={menu.submenu} depth={depth + 1} />
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

export default MultiCategory;
