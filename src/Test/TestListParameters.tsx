import React, { useState, useEffect } from 'react';

const dataList = [
  {
    name: "Get global",
    parameter: [
      { test: 'ob', name: 'system', baseIndex: 0, func: "Get global", value: '' },
      { pri: 'Long', name: 'Bal', baseIndex: 1, func: "Get global", value: '' }
    ],
    type: 'left'
  },
  {
    name: "Get global2",
    parameter: [
      { test: 'ob2', name: 'system2', baseIndex: 0, func: "Get global2", value: ''  },
      { test: 'ob23', name: 'system23', baseIndex: 1, func: "Get global2", value: ''  },
      { pri: 'Long2', name: 'Bal2', baseIndex: 2, func: "Get global2", value: ''  }
    ],
    type: 'right'
  },
  {
    name: "Get global",
    parameter: [
      { test: 'ob', name: 'system', baseIndex: 0, func: "Get global", value: '' },
      { pri: 'Long', name: 'Bal', baseIndex: 1, func: "Get global", value: '' }
    ],
    type: 'right'
  },
];

const allParameters = [
  { test: 'ob', name: 'system', func: "Get global" },
  { pri: 'Long', name: 'Bal', func: "Get global"},
  { test: 'ob', name: 'system', func: "Get global" },
  { pri: 'Long', name: 'Bal', func: "Get global"},
  { test: 'ob2', name: 'system2', func: "Get global2" },
  { test: 'ob23', name: 'system23', func: "Get global2" },
  { pri: 'Long2', name: 'Bal2', func: "Get global2" }
];


// for (const data of dataList) {
//   for (const param of data.parameter) {
//       const matchingParam = allParameters.find(p => 
//           p.name === param.name && 
//           p.baseIndex === param.baseIndex && 
//           p.func === param.func
//       );
//       if (matchingParam) {
//           param.value = matchingParam.value;
//       }
//   }
// }

function SortedList() {
  function updateDataList(dataList, allParameters) {
    const newDataList = dataList.map(data => {
        // Tạo bản sao của data để tránh thay đổi trực tiếp
        const newData = {...data, parameter: data.parameter.map(param => {
            // Tìm kiếm matching parameter
            const matchingParam = allParameters.find(p => {
                return p.test === param.test && p.name === param.name && p.func === param.func && p.baseIndex === param.baseIndex;
            });

            // Nếu tìm thấy, trả về một bản sao của param đã cập nhật
            if (matchingParam) {
                return {...param, value: matchingParam.value};
            }
            
            // Nếu không tìm thấy, trả về bản sao của param không thay đổi
            return {...param};
        })};

        return newData;
    });

    return newDataList;
}

// Sử dụng hàm này để cập nhật dataList với allParameters
const updatedDataList = updateDataList(dataList, allParameters);
console.log(updatedDataList);


// Sử dụng hàm với dữ liệu dataList và allParameters
updateDataList(dataList, allParameters);

const valueMap = new Map();

allParameters.forEach((param, index) => {
  const key = `${param.func}-${param.name}`;
  if (param.test) {
    if (!valueMap.has(key)) {
      // Count how many unique `test` types have been seen for each `func`
      const funcTestCount = Array.from(valueMap.values())
        .filter(value => value.startsWith('#') && value.includes(param.func))
        .length + 1;
      valueMap.set(key, `#${funcTestCount}`);
    }
  } else if (param.pri) {
    valueMap.set(key, `@${param.name}`);
  }
});

const newParameters = allParameters.map(param => {
  const key = `${param.func}-${param.name}`;
  return { ...param, value: valueMap.get(key) };
});

console.log(newParameters);


  return (
    <div>
     
    
    </div>
  );
}

export default SortedList;
