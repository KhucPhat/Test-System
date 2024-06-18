import React, { useState } from 'react';

function ArrayManager({ initialItems }) {
    const [items, setItems] = useState(initialItems);

   // Hàm để di chuyển phần tử lên trong mảng
function moveUp(items, index) {
 // Chỉnh index để phù hợp với mảng bắt đầu từ 0
    if (index > 1) {
        const newItems = [...items];
        // Đổi chỗ các phần tử
        [newItems[index - 1], newItems[index - 2]] = [newItems[index - 2], newItems[index - 1]];
        // Cập nhật index của các phần tử
        newItems[index - 2].index = index - 1; // Phần tử trước
        newItems[index - 1].index = index; // Phần tử hiện tại
        return newItems;
    }
    return items;
}

// Hàm để di chuyển phần tử xuống trong mảng
function moveDown(items, index) {
     // Chỉnh index để phù hợp với mảng bắt đầu từ 0
    if (index < items.length) {
        const newItems = [...items];
        // Đổi chỗ các phần tử
        [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
        // Cập nhật index của các phần tử
        newItems[index - 1].index = index; // Phần tử hiện tại
        newItems[index].index = index + 1; // Phần tử sau
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
