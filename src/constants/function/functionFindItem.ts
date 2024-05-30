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
