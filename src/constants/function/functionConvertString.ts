
function extractIdAndName(inputString) {
  // Kiểm tra đầu vào hợp lệ
  if (!inputString.includes('@') || !inputString.includes('|') || !inputString.includes('#')) {
    return { id: null, name: null, error: 'Invalid format' };
  }

  const atSplit = inputString.split('@');
  if (atSplit.length > 1) {
    const pipeSplit = atSplit[1].split('|');
    if (pipeSplit.length > 1) {
      const hashSplit = pipeSplit[2].split('#');
      if (hashSplit.length > 0) {
        const id = pipeSplit[0];  // Lấy phần ID
        const name = pipeSplit[1]; // Lấy phần tên
        return { id, name };
      }
    }
  }
  // Trường hợp chuỗi không đúng định dạng
  return { id: null, name: null, error: 'Invalid extraction' };
}

// Ví dụ sử dụng hàm
const input = '@8034|chang|test#';
const result = extractIdAndName(input);
console.log(result);
