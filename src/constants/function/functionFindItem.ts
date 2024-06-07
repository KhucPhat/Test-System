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

// Sử dụng hàm
const valuesArray = getValuesFromArray(array, data);
console.log(valuesArray);
const items = [
  { id: 1, name: "Item1", value: 10, des: "Description1" },
  { id: 1, name: "Item1", value: 20, des: "Description1" },
  { id: 1, name: "Item1", value: 10, des: "Description2" },
  { id: 2, name: "Item2", value: 30, des: "Description4" },
  { id: 3, name: "Item3", value: 40, des: "Description5" }
];

function hasDuplicatesWithDifferentValueAndDes(array) {
  // Sử dụng map để lưu trữ các nhóm dựa trên id và name
  const map = new Map();

  for (const item of array) {
    // Tạo khóa dựa trên id và name
    const key = `${item.id}-${item.name}`;
    if (map.has(key)) {
      // Nếu key đã tồn tại, kiểm tra các đối tượng đã lưu có khác value hoặc des không
      const entries = map.get(key);
      if (entries.some(entry => entry.value !== item.value || entry.des !== item.des)) {
        return true;
      }
      entries.push(item);
    } else {
      // Nếu key chưa tồn tại, thêm mới vào map
      map.set(key, [item]);
    }
  }
  return false;
}

const result = hasDuplicatesWithDifferentValueAndDes(items);
console.log(result); // Output: true hoặc false
