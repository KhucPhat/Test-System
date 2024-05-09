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
  { test: 'ob', name: 'system', baseIndex: 0, func: "Get global" },
  { pri: 'Long', name: 'Bal', baseIndex: 1, func: "Get global"},
  { test: 'ob2', name: 'system2', baseIndex: 0, func: "Get global2" },
  { test: 'ob23', name: 'system23', baseIndex: 1, func: "Get global2" },
  { pri: 'Long2', name: 'Bal2', baseIndex: 2, func: "Get global2" }
]


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
    dataList.forEach(data => {
        data.parameter.forEach(param => {
            const matchingParam = allParameters.find(p => {
                return (
                    p.test === param.test &&
                    p.name === param.name &&
                    p.func === param.func &&
                    p.baseIndex === param.baseIndex
                );
            });
            console.log(matchingParam)
            if (matchingParam) {
                param.value = matchingParam.value;
            }
        });
    });
    return dataList;
}


// Sử dụng hàm với dữ liệu dataList và allParameters
updateDataList(dataList, allParameters);

// Kiểm tra kết quả
console.log(dataList);


// Sử dụng hàm với dữ liệu dataList và allParameters
updateParameters(dataList, allParameters);

// Kiểm tra kết quả
console.log(dataList);


  return (
    <div>
     
    
    </div>
  );
}

export default SortedList;
