import React, { useState } from 'react';

function EditableInputs() {
  const initialData = [
    { value: "#1", function: 'getBal' },
    { value: "#2", function: 'getBal' },
    { value: "#3", function: 'getBal' },
    { value: "#4", function: 'getBal2' }
  ];

  const [data, setData] = useState(initialData.map(item => ({ ...item, inputValue: item.value })));

  const handleChange = (index, newValue) => {
    const newData = data.map((item, idx) => {
      if (idx === index) {
        return { ...item, inputValue: newValue };
      }
      return item;
    });
    setData(newData);
  };

  const handleBlur = () => {
    const values = data.map(item => parseInt(item.inputValue.replace("#", ""), 10));
    const max = Math.max(...values);
    let counterArray = Array(max).fill(0);

    for (let value of values) {
      if (value <= max) {
        counterArray[value - 1] += 1;
      }
    }

    const normalizedValues = values.map(value => {
      if (value > max) {
        return value; // if the value is more than max, return it directly (shouldn't normally happen)
      }
      let findValue = 1;
      while (counterArray[findValue - 1] === 0) { // find the first non-zero occurrence
        findValue++;
      }
      counterArray[findValue - 1] -= 1; // decrement the counter as this value is now used
      return findValue;
    });

    const newData = data.map((item, idx) => ({
      ...item,
      value: `#${normalizedValues[idx]}`,
      inputValue: `#${normalizedValues[idx]}`
    }));

    setData(newData);
  };

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            value={item.inputValue}
            onChange={(e) => handleChange(index, e.target.value)}
            onBlur={handleBlur}
          />
        </div>
      ))}
    </div>
  );
}

export default EditableInputs;
