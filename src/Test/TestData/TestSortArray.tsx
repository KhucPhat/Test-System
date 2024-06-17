import React, { useState } from 'react';

function SortableObjectArray() {
  const [array, setArray] = useState([
    { id: 2, name: 'Alice' },
    { id: 5, name: 'Bob' },
    { id: 1, name: 'Charlie' },
    { id: 4, name: 'David' },
    { id: 3, name: 'Eve' }
  ]);
  const [sortOrder, setSortOrder] = useState('asc');  // Lưu trữ thứ tự sắp xếp hiện tại

  const sortArray = (key, order) => {
    const sortedArray = [...array].sort((a, b) => {
      if (order === 'asc') {
        return a[key] - b[key];
      } else {
        return b[key] - a[key];
      }
    });
    setArray(sortedArray);
    setSortOrder(order);
  };

  return (
    <div>
      <h2>Click on the button to sort the array:</h2>
      <button onClick={() => sortArray('id', 'asc')}>Sort by ID Ascending 🔼</button>
      <button onClick={() => sortArray('id', 'desc')}>Sort by ID Descending 🔽</button>
      <ul>
        {array.map(item => (
          <li key={item.id}>{item.id} - {item.name}</li>
        ))}
      </ul>
      Sorted by ID in {sortOrder} order.
    </div>
  );
}

export default SortableObjectArray;
