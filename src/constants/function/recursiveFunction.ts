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

// Hàm lọc các item là object và các category con chứa object
function filterMenu(menus) {
  // Hàm đệ quy để lọc các phần tử và submenu của chúng
  function filterItems(items) {
    return items.reduce((filtered, item) => {
      // Kiểm tra nếu phần tử thỏa mãn điều kiện hasCategory là false
      const meetsCondition = !item.hasCategory;

      // Nếu phần tử có submenu, áp dụng hàm lọc đệ quy cho submenu
      let filteredSubmenu = [];
      if (item.subMenu || item.submenu) {
        filteredSubmenu = filterItems(item.subMenu || item.submenu);
      }

      // Nếu phần tử thỏa mãn điều kiện hoặc sau khi lọc, submenu còn phần tử
      if (meetsCondition || filteredSubmenu.length > 0) {
        // Tạo một bản sao của phần tử với submenu đã được lọc
        const newItem = { ...item };
        if (item.subMenu) newItem.subMenu = filteredSubmenu;
        if (item.submenu) newItem.submenu = filteredSubmenu;

        // Thêm phần tử vào mảng kết quả
        filtered.push(newItem);
      }

      return filtered;
    }, []);
  }

  // Bắt đầu lọc từ mảng menu cấp ngoài cùng
  return filterItems(menus);
}

// Hàm lọc ra danh sách menu 
const filterMenus = (menus) => {
  return menus.reduce((acc, item) => {
    // Check if the current menu item has hasCategory true
    if (item.hasCategory) {
      // Create a new object to avoid mutating the original
      const newItem = { ...item };

      // Recursively filter the submenu, if it exists
      if (newItem.subMenu || newItem.submenu) {
        newItem.subMenu = filterMenus(newItem.subMenu || newItem.submenu);
      }
      acc.push(newItem);
    }
    return acc;
  }, []);
};

// Hàm để lấy danh sách của tất cả id
function generateIds(menuArray) {
  const ids = [];
  menuArray.forEach((item) => {
    const id = item.id;
    ids.push(id);
    if (item.subMenu || item.submenu) {
      ids.push(...generateIds(item.subMenu || item.submenu));
    }
  });
  return ids;
};

// Hàm đệ quy tìm item 
function findMenuItemById(menuItems, id) {
  for (let item of menuItems) {
    if (item.id === id) {
      return item;
    }
    if (item.subMenu) {
      const found = findMenuItemById(item.subMenu, id);
      if (found) return found;
    }
  }
  return null; // Return null if no item is found
}

// Hàm parse Json
function parseJsonToKeyValueArray(jsonString, filterEmptyObjects = false) {
  try {
    // Parse JSON string to JavaScript object
    const jsonObject = JSON.parse(jsonString);

    // Initialize the output array and a counter for the id
    const keyValueArray = [];
    let idCounter = 1;

    // Helper function to process an object
    function processObject(obj, prefix = '') {
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          if (Object.keys(value).length === 0) {
            if (!filterEmptyObjects) {
              keyValueArray.push({ id: idCounter++, name: fullKey, value: '{}' });
            }
          } else {
            processObject(value, fullKey);
          }
        } else {
          keyValueArray.push({ id: idCounter++, name: fullKey, value: JSON.stringify(value) });
        }
      }
    }

    // Determine if the jsonObject is an array or a single object
    if (Array.isArray(jsonObject)) {
      jsonObject.forEach(item => processObject(item));
    } else if (typeof jsonObject === 'object' && jsonObject !== null) {
      processObject(jsonObject);
    } else {
      // Handle primitive types or nulls
      keyValueArray.push({ id: idCounter++, name: 'value', value: JSON.stringify(jsonObject) });
    }

    return keyValueArray;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return []; // Return an empty array in case of error
  }
};

export const copyAndSort = (menu) => {
  // Copy the array to avoid modifying the original array
  const copiedMenu = JSON.parse(JSON.stringify(menu));

  // Recursive function to sort based on the 'hasCategory' property
  function sortByHasCategory(menu) {
    menu.sort((a, b) => (b.hasCategory === a.hasCategory ? 0 : b.hasCategory ? 1 : -1));

    // Recursively sort any submenus
    menu.forEach(item => {
      if (item.subMenu) {
        sortByHasCategory(item.subMenu);
      } else if (item.submenu) {
        sortByHasCategory(item.submenu);
      }
    });
  }

  // Start sorting from the copied root array
  sortByHasCategory(copiedMenu);

  // Return the sorted array
  return copiedMenu;
};

// Hàm sao chép sâu để đảm bảo không thay đổi mảng gốc
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Hàm đệ quy để sắp xếp mảng
const sortMenus = (menuArray) => {
  // Sử dụng slice() để tạo một bản sao của mảng hiện tại và sắp xếp
  let sortedArray = menuArray.slice().sort((a, b) => (b.hasCategory === a.hasCategory) ? 0 : b.hasCategory ? 1 : -1);

  // Duyệt qua từng phần tử trong mảng đã sao chép và xử lý các submenu
  return sortedArray.map(menu => {
    if (menu.submenu) {
      // Sử dụng deepCopy để sao chép submenu trước khi đệ quy
      // Điều này đảm bảo submenu được sắp xếp mà không thay đổi gốc
      menu.submenu = sortMenus(deepCopy(menu.submenu));
    }
    return menu;
  });
};

// Mảng ban đầu
const menus = [
  // Dữ liệu mảng giống như đã cung cấp ở trên
];

// Sao chép sâu mảng ban đầu để tránh thay đổi
const originalMenus = deepCopy(menus);

// Gọi hàm để sắp xếp mảng sao chép
const sortedMenus = sortMenus(originalMenus);

// In mảng đã được sắp xếp
console.log(sortedMenus);

