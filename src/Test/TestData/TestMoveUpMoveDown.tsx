import React, { useState } from 'react';

function ArrayManager({ initialItems }) {
    const [items, setItems] = useState(initialItems);

   // Hàm để di chuyển phần tử lên trong mảng
function moveUp(items, index) {
  // Điều chỉnh index để phù hợp với mảng bắt đầu từ 0 (index truyền vào là từ 1)
    if (index > 1) {
        const newItems = [...items];
        // Hoán đổi các phần tử
        let temp = newItems[index - 1];
        newItems[index - 1] = newItems[index - 2];
        newItems[index - 2] = temp;
        // Cập nhật index của các phần tử
        newItems[index - 2].index = index - 1;
        newItems[index - 1].index = index;
        return newItems;
    }
    return items;
}

// Hàm để di chuyển phần tử xuống trong mảng
function moveDown(items, index) {
   // Điều chỉnh index để phù hợp với mảng bắt đầu từ 0 (index truyền vào là từ 1)
    if (index < items.length) {
        const newItems = [...items];
        // Hoán đổi các phần tử
        let temp = newItems[index];
        newItems[index] = newItems[index - 1];
        newItems[index - 1] = temp;
        // Cập nhật index của các phần tử
        newItems[index - 1].index = index;
        newItems[index].index = index + 1;
        return newItems;
    }
    return items;
}
const handleMoveUp = index => {
    const newItems = moveUp(items, index);
    setItems(newItems);
};

const handleMoveDown = index => {
    const newItems = moveDown(items, index);
    setItems(newItems);
};

return (
    <div>
        {items.map((item, index) => (
            <div key={item.id || index}>
                {item.name || item}
                <button onClick={() => handleMoveUp(index)}>Move Up</button>
                <button onClick={() => handleMoveDown(index)}>Move Down</button>
            </div>
        ))}
    </div>
);
}

// Ví dụ sử dụng
const initialItems = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

export default function TestMove() {
    return <ArrayManager initialItems={initialItems} />;
}
