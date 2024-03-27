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

  const editMenuItem = (id, newData, currentMenus) => {
    return currentMenus.map(menu => {
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