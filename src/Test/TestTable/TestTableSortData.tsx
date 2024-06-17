import React, { useState } from 'react';
const data = [
    { id: 1, name: "Alice", age: 24 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 22 }
  ];

  
function DataTableSort() {
  const [items, setItems] = useState(data);
  const [sortDirection, setSortDirection] = useState('asc');

  const toggleSortByName = () => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedItems = [...items].sort((a, b) => {
      return direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
    setItems(sortedItems);
    setSortDirection(direction);
  };

  const toggleSortByAge = () => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedItems = [...items].sort((a, b) => {
      return direction === 'asc' ? a.age - b.age : b.age - a.age;
    });
    setItems(sortedItems);
    setSortDirection(direction);
  };

  return (
    <div>
      <button onClick={toggleSortByName}>Toggle Sort by Name</button>
      <button onClick={toggleSortByAge}>Toggle Sort by Age</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTableSort;
