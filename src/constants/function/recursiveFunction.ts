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


  // Hàm di chuyển mục trong mảng
  const moveItem = (array, from, to) => {
    const item = array[from];
    array.splice(from, 1);
    array.splice(to, 0, item);
    return array;
  };

  // Hàm đệ quy để tìm mục và mảng chứa nó
  const findItemAndMove = (items, id, direction, path = []) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        // Tìm thấy mục, xử lý di chuyển
        if (direction === 'up' && i > 0) {
          return [...moveItem(items, i, i - 1)];
        }
        if (direction === 'down' && i < items.length - 1) {
          return [...moveItem(items, i, i + 1)];
        }
      } else if (items[i].submenu) {
        // Tìm trong submenu nếu có
        const result = findItemAndMove(items[i].submenu, id, direction, [...path, i]);
        if (result) return [...items.slice(0, i), {...items[i], submenu: result}, ...items.slice(i + 1)];
      }
    }
  };

