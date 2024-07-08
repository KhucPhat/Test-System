const array = ['#1', '@8032|a|des', '#3', '@8033|b|De'];
const data = [{id: 8032, value: 100}, {id: 8033, value: 2}];

// Hàm chính để lấy giá trị từ data dựa trên mảng chuỗi
function getValuesFromArray(array, data) {
  // Hàm tìm giá trị tương ứng trong mảng data
  function findValue(id) {
    const item = data.find(d => d.id === parseInt(id));
    return item ? item.value : null;
  }

  // Tạo mảng mới chỉ với các giá trị tương ứng
  return array.map(item => {
    if (item.startsWith('@')) {
      const id = item.split('|')[0].substring(1);
      const value = findValue(id);
      return value !== null ? value : undefined; // Sử dụng undefined cho các giá trị không tìm thấy
    }
    return undefined; // Sử dụng undefined cho các phần tử không phải là '@id|...'
  }).filter(item => item !== undefined); // Lọc bỏ các giá trị undefined
}

const items = [
  { id: 1, name: "Item1", value: 10, des: "Description1" },
  { id: 1, name: "Item1", value: 20, des: "Description1" },
  { id: 1, name: "Item1", value: 10, des: "Description2" },
  { id: 2, name: "Item1", value: 30, des: "Description4" }, // Trùng name, khác id
  { id: 3, name: "Item3", value: 40, des: "Description5" }
];

function hasDuplicatesWithDifferentIdOrValueAndDes(array) {
  const nameMap = new Map();
  const detailedMap = new Map();

  for (const item of array) {
    const nameKey = item.name;
    const detailedKey = `${item.id}-${item.name}`;

    // Kiểm tra các đối tượng có cùng name nhưng khác id
    if (nameMap.has(nameKey)) {
      const otherId = nameMap.get(nameKey);
      if (otherId !== item.id) {
        return true; // Tìm thấy đối tượng có cùng name nhưng khác id
      }
    } else {
      nameMap.set(nameKey, item.id);
    }

    // Kiểm tra các đối tượng có cùng id và name nhưng khác value hoặc des
    if (detailedMap.has(detailedKey)) {
      const entries = detailedMap.get(detailedKey);
      if (entries.some(entry => entry.value !== item.value || entry.des !== item.des)) {
        return true; // Tìm thấy đối tượng có cùng id và name nhưng khác value hoặc des
      }
      entries.push(item);
    } else {
      detailedMap.set(detailedKey, [item]);
    }
  }
  return false;
}

const result = hasDuplicatesWithDifferentIdOrValueAndDes(items);
console.log(result); // Output: true hoặc false

const listdata = [
    { id: 8008, param: "23" },
    { id: 8007, param: "23a" },
    { id: 8078, param: "239" }
];

function extractId(str) {
    // Loại bỏ tất cả ký tự không phải số để trích xuất ID
    return str.replace(/[^0-9]/g, '');
}

function findItemById(id) {
    // Tìm item trong listdata phù hợp với ID đã cho
    return listdata.find(d => d.id === parseInt(id));
}

function processObject(object) {
    // Xử lý đối tượng đầu vào và trả về đối tượng listdata tương ứng
    if (typeof object.value === 'string') {
        const id = extractId(object.value);
        return findItemById(id);
    } else if (Array.isArray(object.value)) {
        return object.value.map(subObj => {
            for (let att in subObj) {
                const id = extractId(subObj[att]);
                return findItemById(id);
            }
        });
    } else if (typeof object.value === 'object') {
        const result = {};
        for (let att in object.value) {
            const id = extractId(object.value[att]);
            result[att] = findItemById(id);
        }
        return result;
    }
}

// Ví dụ sử dụng:
const object1 = { key: 'object1', value: "@8078|a|b#" };
const object2 = { key: 'object2', value: [{ att1: "@8007|v|c#" }] };
const object3 = { key: 'object3', value: { attr2: "@8008|c|d#" } };

console.log("Result for object1:", processObject(object1));
console.log("Result for object2:", processObject(object2));
console.log("Result for object3:", processObject(object3));

// Hàm Update và add dữ liệu
function updateAndPruneListAllParams(currentList, listPar) {
    const parentIdsInB = new Set(listPar.map(item => item.parentId));

    // Update existing items in currentList with values from listPar
    currentList.forEach(aItem => {
        const match = listPar.find(bItem => aItem.parentId === bItem.parentId);
        if (match) {
            aItem.value = match.value;
            aItem.valuePar = match.valuePar;
        }
    });

    // Add new items from listPar to currentList
    listPar.forEach(bItem => {
        if (!currentList.some(aItem => aItem.parentId === bItem.parentId)) {
            currentList.push({ parentId: bItem.parentId, value: bItem.value, valuePar: bItem.valuePar });
        }
    });

    // Filter currentList to remove items not in listPar
    return currentList.filter(aItem => {
        if (!parentIdsInB.has(aItem.parentId)) {
            return true;
        }
        return listPar.some(bItem => aItem.parentId === bItem.parentId);
    });
}

