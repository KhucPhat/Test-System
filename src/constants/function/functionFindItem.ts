// Hàm tìm giá trị từ mảng chuỗi 
const array = ['#1', '@8032|a|des', '#3', '@8033|b|De'];
const data = [{id: 8032, value: 100}, {id: 8033, value: 2}];

// Hàm chính để thay thế giá trị trong mảng chuỗi
function replaceValues(array, data) {
  // Hàm tìm giá trị tương ứng trong mảng data
  function findValue(id) {
    const item = data.find(d => d.id === parseInt(id));
    return item ? item.value : null;
  }

  // Tạo mảng mới với giá trị đã thay thế
  return array.map(item => {
    if (item.startsWith('@')) {
      const id = item.split('|')[0].substring(1);
      const value = findValue(id);
      return value !== null ? value : item;
    } else {
      return item;
    }
  });
}

// Sử dụng hàm
const newArray = replaceValues(array, data);
console.log(newArray);
