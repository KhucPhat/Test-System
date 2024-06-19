function updateArray(arrayA, arrayB) {
    // Tạo một map cho arrayA với key là sự kết hợp của các thuộc tính
    const mapA = new Map(arrayA.map(item => [`${item.parentId}_${item.name}_${item.type}_${item.function}`, item]));

    // Tạo một set của các keys từ mảng B
    const keysInB = new Set(arrayB.map(item => `${item.parentId}_${item.name}_${item.type}_${item.function}`));

    // Xử lý mảng B: thêm hoặc cập nhật các phần tử
    arrayB.forEach(itemB => {
        const keyB = `${itemB.parentId}_${itemB.name}_${itemB.type}_${itemB.function}`;
        if (mapA.has(keyB)) {
            // Cập nhật thông tin từ B
            Object.assign(mapA.get(keyB), itemB);
        } else {
            // Thêm mới phần tử từ B
            mapA.set(keyB, itemB);
        }
    });

    // Trả về toàn bộ các phần tử từ mapA mà không lọc bỏ bất kỳ phần tử nào
    let finalArray = Array.from(mapA.values());

    return finalArray;
}

// Ví dụ sử dụng
let arrayA = [
    { parentId: 1, name: 'Node 1', function: 'Func A', type: 'Type X', value: 10 },
    { parentId: 1, name: 'Node 2', function: 'Func B', type: 'Type Y', value: 20 },
    { parentId: 1, name: 'Node 3', function: 'Func C', type: 'Type Z', value: 30 },
      { parentId: 2, name: 'Node 1', function: 'Func A', type: 'Type X', value: 10 },
    { parentId: 2, name: 'Node 2', function: 'Func B', type: 'Type Y', value: 20 },
    { parentId: 2, name: 'Node 3', function: 'Func C', type: 'Type Z', value: 30 }
];
let arrayB = [
   { parentId: 1, name: 'Node 1', function: 'Func A', type: 'Type X', value: 40 },
    { parentId: 1, name: 'Node 2', function: 'Func B', type: 'Type Y', value: 28 },
    { parentId: 1, name: 'Node 3', function: 'Func C', type: 'Type Z', value: 38 },
];

let updatedArray = updateArray(arrayA, arrayB);
console.log(updatedArray);
