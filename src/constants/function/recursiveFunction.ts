// Hàm đệ quy tính toán 
const deleteMenuItem = (id, currentMenus) => {
    return currentMenus.filter(menu => {
      if (menu.id === id) {
        return false;
      } else if (menu.submenu) {
        menu.submenu = deleteMenuItem(id, menu.submenu);
        return true;
      }
      return true;
    });
  };

  const editMenuItem = (id: number, newData: any, currentMenus: any) => {
    return currentMenus.map((menu: any) => {
      if (menu.id === id) {
        return { ...menu, ...newData };
      } else if (menu.submenu) {
        return { ...menu, submenu: editMenuItem(id, newData, menu.submenu) };
      }
      return menu;
    });
  };

  const addMenuItem = (parentId, newItem, currentMenus) => {
    return currentMenus.map(menu => {
      if (menu.id === parentId) {
        if (!menu.submenu) {
          menu.submenu = [newItem];
        } else {
          menu.submenu.push(newItem);
        }
      } else if (menu.submenu) {
        menu.submenu = addMenuItem(parentId, newItem, menu.submenu);
      }
      return menu;
    });
  };

  // Chuyển item con của thằng này sang thằng khác
  const moveSubMenu = (currentParentId, newParentId, submenuItem, menus) => {
    const updatedMenus = menus.map(menu => {
      if (menu.id === currentParentId) {
        menu.submenu = menu.submenu.filter(item => item.id !== submenuItem.id);
      }
      if (menu.id === newParentId) {
        if (!menu.submenu) {
          menu.submenu = [submenuItem];
        } else {
          menu.submenu.push(submenuItem);
        }
      } else if (menu.submenu) {
        menu.submenu = moveSubMenu(currentParentId, newParentId, submenuItem, menu.submenu);
      }
      return menu;
    });
    return updatedMenus;
  };