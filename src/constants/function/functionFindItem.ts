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
