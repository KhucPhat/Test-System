import React, { useState } from 'react';

function ArrayManager({ initialItems }) {
    const [items, setItems] = useState(initialItems);

   // Hàm để di chuyển phần tử lên trong mảng
function moveUp(items, index) {
    if (index > 0) {
        const newItems = [...items];
        [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
        return newItems;
    }
    return items;
}

// Hàm để di chuyển phần tử xuống trong mảng
function moveDown(items, index) {
    if (index < items.length - 1) {
        const newItems = [...items];
        [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
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
