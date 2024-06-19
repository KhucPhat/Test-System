function updateAndPruneArrayA(arrayA, arrayB) {
    // Tạo một Set để lưu trữ các parentId có trong arrayB
    const parentIdsInB = new Set(arrayB.map(item => item.parentId));

    // Đầu tiên, cập nhật giá trị của arrayA dựa trên arrayB
    arrayA.forEach(aItem => {
        const match = arrayB.find(bItem =>
            aItem.parentId === bItem.parentId &&
            aItem.name === bItem.name &&
            aItem.function === bItem.function &&
            aItem.type === bItem.type
        );
        if (match) {
            aItem.value = match.value; // Cập nhật giá trị nếu tìm thấy khớp
        }
    });

    // Sau đó, lọc arrayA để loại bỏ những object không có khớp nào trong arrayB nhưng có cùng parentId
    return arrayA.filter(aItem => {
        // Nếu object này có parentId không có trong arrayB, giữ nguyên object đó
        if (!parentIdsInB.has(aItem.parentId)) {
            return true;
        }
        // Nếu có, kiểm tra xem object này có khớp nào trong arrayB không
        return arrayB.some(bItem =>
            aItem.parentId === bItem.parentId &&
            aItem.name === bItem.name &&
            aItem.function === bItem.function &&
            aItem.type === bItem.type
        );
    });
}
// Ví dụ sử dụng
let arrayA = [
    { parentId: 1, name: 'Node 1', function: 'Func A', type: 'Type X', value: 10 },
    { parentId: 1, name: 'Node 2', function: 'Func B', type: 'Type Y', value: 20 },
    { parentId: 1, name: 'Node 3', function: 'Func C', type: 'Type Z', value: 30 },
      { parentId: 1, name: 'Node 123', function: 'Func A', type: 'Type X', value: 10 },
    { parentId: 1, name: 'Node 242', function: 'Func BA', type: 'Type Y', value: 20 },
    { parentId: 1, name: 'Node 313', function: 'Func CD', type: 'Type Z', value: 30 },
      { parentId: 2, name: 'Node 113', function: 'Func AD', type: 'Type X', value: 10 },
    { parentId: 2, name: 'Node 2', function: 'Func B', type: 'Type Y', value: 20 },
    { parentId: 2, name: 'Node 3', function: 'Func C', type: 'Type Z', value: 30 }
];
let arrayB = [
   { parentId: 1, name: 'Node 1', function: 'Func A', type: 'Type X', value: 40 },
    { parentId: 1, name: 'Node 2', function: 'Func B', type: 'Type Y', value: 28 },
    { parentId: 1, name: 'Node 3', function: 'Func C', type: 'Type Z', value: 38 },
];

let updatedArray = updateAndPruneArrayA(arrayA, arrayB);
console.log(updatedArray);
