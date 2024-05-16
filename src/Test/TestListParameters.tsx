import React, { useState, useEffect } from 'react';

const dataList = [{
  name: 'getDeltaX',
  parameter: [
    {
      testSystemObject: 'Subscriber',
      primitiveType: null,
      name: 'subcriber',
      desc: 'Subscriber chứa balance cần lấy',
    },
    {
      testSystemObject: null,
      primitiveType: 'Long',
      name: 'balType',
      desc: 'Loại tài khoản cần lấy'
    }
  ]
},
{
  name: 'getDeltaAvaiableAmountOfBal'
  parameter: [
    {
      testSystemObject: 'Subscriber',
      primitiveType: null,
      name: 'subcriber',
      desc: 'Subscriber chứa balance cần lấy'
    },
    {
      testSystemObject: 'Subscriber',
      primitiveType: null,
      name: 'newSubcriber',
      desc: 'Subscriber chứa balance cần lấy'
    },
    {
      testSystemObject: null,
      primitiveType: 'Long',
      name: 'balType',
      desc: 'Loại tài khoản cần lấy'
    }
  ]
}
];

const comparatorDefinition= [
  {
    id: 1,
    left: "getDeltaAvaiableAmountOfBal(#1,#2,@balType)",
    right: "getDeltaX(#1,@alType)",
    oragenor: 1,
    name: 'đaaddd'
  },
  {
    id: 2,
    left: "getDeltaAvaiableAmountOfBal(#1,#2,@balType),getDeltaX(#1,@alType)",
    right: "getDeltaX(#1,@alType)",
    oragenor: 1,
    name: 'đaaddd'
  }
]

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

// Hàm phân tích cú pháp và lấy thông tin chi tiết
function getFunctionDetails(functionString) {
  const details = functionString.match(/(\w+)\(([^)]+)\)/);
  if (!details) return null;

  const functionName = details[1];
  const args = details[2].split(',').map(arg => arg.trim().replace(/^[@#]/, ''));

  // Tìm kiếm trong dataList
  const functionData = dataList.find(d => d.name === functionName);
  if (!functionData) return null;

  // Lấy thông tin chi tiết từng tham số
  const parameters = functionData.parameter.map(param => {
    const isArgument = args.includes(param.name);
    return isArgument ? `${param.name} (${param.desc})` : '';
  }).filter(Boolean);

  return `${functionName}(${parameters.join(', ')})`;
}

// Tạo mảng mới
const enrichedComparisons = comparatorDefinition.map(comp => {
  const leftDetails = comp.left.split(',').map(getFunctionDetails).filter(Boolean);
  const rightDetails = getFunctionDetails(comp.right);

  return {
    ...comp,
    left: leftDetails.join(', '),
    right: rightDetails
  };
});

console.log(enrichedComparisons);


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

  return (
    <div>
     
    
    </div>
  );
}

export default SortedList;
