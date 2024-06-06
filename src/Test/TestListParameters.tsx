// import { extractFunctionNames } from '@/constants/common';
// import React, { useState, useEffect } from 'react';

// const comparatorDefinition= [
//   {
//     id: 1,
//     left: "getDeltaAvaiableAmountOfBal(#1,#2,@balType)",
//     right: "getDeltaX(#1,@alType)",
//     oragenor: 1,
//     name: 'đaaddd'
//   },
//   {
//     id: 2,
//     left: "getDeltaAvaiableAmountOfBal(#1,#2,@balType),getDeltaX(#1,@alType)",
//     right: "getDeltaX(#1,@alType)",
//     oragenor: 1,
//     name: 'đaaddd'
//   }
// ]

// const allParameters = [
//   { test: 'ob', name: 'system', func: "Get global" },
//   { pri: 'Long', name: 'Bal', func: "Get global"},
//   { test: 'ob', name: 'system', func: "Get global" },
//   { pri: 'Long', name: 'Bal', func: "Get global"},
//   { test: 'ob2', name: 'system2', func: "Get global2" },
//   { test: 'ob23', name: 'system23', func: "Get global2" },
//   { pri: 'Long2', name: 'Bal2', func: "Get global2" }
// ];

// // for (const data of dataList) {
// //   for (const param of data.parameter) {
// //       const matchingParam = allParameters.find(p =>
// //           p.name === param.name &&
// //           p.baseIndex === param.baseIndex &&
// //           p.func === param.func
// //       );
// //       if (matchingParam) {
// //           param.value = matchingParam.value;
// //       }
// //   }
// // }

// function SortedList() {

//             // Nếu tìm thấy, trả về một bản sao của param đã cập nhật
//             if (matchingParam) {
//                 return {...param, value: matchingParam.value};
//             }

//             // Nếu không tìm thấy, trả về bản sao của param không thay đổi
//             return {...param};
//         })};

//         return newData;
//     });

//     return newDataList;
// }

// // Sử dụng hàm này để cập nhật dataList với allParameters
// const updatedDataList = updateDataList(dataList, allParameters);
// console.log(updatedDataList);

// // Hàm phân tích cú pháp và lấy thông tin chi tiết
// function getFunctionDetails(functionString) {
//   const details = functionString.match(/(\w+)\(([^)]+)\)/);
//   if (!details) return null;

//   const functionName = details[1];
//   const args = details[2].split(',').map(arg => arg.trim().replace(/^[@#]/, ''));

//   // Tìm kiếm trong dataList
//   const functionData = dataList.find(d => d.name === functionName);
//   if (!functionData) return null;

//   // Lấy thông tin chi tiết từng tham số
//   const parameters = functionData.parameter.map(param => {
//     const isArgument = args.includes(param.name);
//     return isArgument ? `${param.name} (${param.desc})` : '';
//   }).filter(Boolean);

//   return `${functionName}(${parameters.join(', ')})`;
// }

// // Tạo mảng mới
// const enrichedComparisons = comparatorDefinition.map(comp => {
//   const leftDetails = comp.left.split(',').map(getFunctionDetails).filter(Boolean);
//   const rightDetails = getFunctionDetails(comp.right);

//   return {
//     ...comp,
//     left: leftDetails.join(', '),
//     right: rightDetails
//   };
// });

// console.log(enrichedComparisons);

// // Sử dụng hàm với dữ liệu dataList và allParameters
// updateDataList(dataList, allParameters);

// const valueMap = new Map();

// allParameters.forEach((param, index) => {
//   const key = `${param.func}-${param.name}`;
//   if (param.test) {
//     if (!valueMap.has(key)) {
//       // Count how many unique `test` types have been seen for each `func`
//       const funcTestCount = Array.from(valueMap.values())
//         .filter(value => value.startsWith('#') && value.includes(param.func))
//         .length + 1;
//       valueMap.set(key, `#${funcTestCount}`);
//     }
//   ];

//   const comparatorDefinition = [
//     { id: 1, left: "getDeltaAvaiableAmountOfBal(#3,#4,@balType)", right: "getDeltaX(#1,@balType)", oragenor: 1, name: 'đaaddd' },
//     { id: 2, left: "getDeltaAvaiableAmountOfBal(#1,#2,@balType),getDeltaX(#1,@balType)", right: "getDeltaX(#1,@balType)", oragenor: 1, name: 'đaaddd' }
//   ];

//   const matchFunctionsToDataList = (functions, type) => {
//     return functions.map(funcName => {
//       const foundItem = dataList.find(item => item.name === funcName);
//       if (foundItem) {
//         return { ...foundItem, type };
//       }
//       return null;
//     }).filter(item => item !== null);
//   };

//   const results = [];

//   comparatorDefinition.forEach(item => {
//     const leftFunctions = extractFunctionNames(item.left);
//     const rightFunctions = extractFunctionNames(item.right);

//     const leftResults = matchFunctionsToDataList(leftFunctions, 'left-expression');
//     const rightResults = matchFunctionsToDataList(rightFunctions, 'right-expression');

//     results.push(...leftResults, ...rightResults);
//   });

//   const originalArray = [
//     { testSystemObject: 'Subscriber', primitiveType: null, name: 'subcriber', desc: 'Subscriber chứa balance cần lấy', value: "#1", parentId: 24 },
//     { testSystemObject: 'Subscriber', primitiveType: null, name: 'newSubcriber', desc: 'Subscriber chứa balance cần lấy', value: "#2", parentId: 24 },
//     { testSystemObject: 'Subscriber', primitiveType: null, name: 'subcriber', desc: 'Subscriber chứa balance cần lấy', value: "#3", parentId: 24 },
//     { testSystemObject: 'Subscriber', primitiveType: null, name: 'newSubcriber', desc: 'Subscriber chứa balance cần lấy', value: "#4", parentId: 24 }
// ];

// const newArray = [
//     { testSystemObject: 'Subscriber', primitiveType: null, name: 'subcriber', desc: 'Subscriber chứa balance cần lấy', value: "#3", parentId: 24 },
//     { testSystemObject: 'Subscriber', primitiveType: null, name: 'newSubcriber', desc: 'Subscriber chứa balance cần lấy', value: "#8", parentId: 24 },
//     { testSystemObject: 'Subscriber', primitiveType: null, name: 'subcriber', desc: 'Subscriber chứa balance cần lấy', value: "#3", parentId: 24 },
//     { testSystemObject: 'Subscriber', primitiveType: null, name: 'newSubcriber', desc: 'Subscriber chứa balance cần lấy', value: "#2", parentId: 24 }
// ];

// // Tạo một mảng mới mà không thay đổi mảng ban đầu
// const updatedArray = originalArray.map(item => {
//     // Tìm mục tương ứng trong mảng mới
//     const newItem = newArray.find(newItem => newItem.name === item.name && newItem.parentId === item.parentId && newItem.desc === item.desc);
//     if (newItem) {
//         return { ...item, value: newItem.value }; // Trả về một bản sao của item với giá trị cập nhật
//     }
//     return { ...item }; // Trả về bản sao của item không thay đổi nếu không tìm thấy tương ứng
// });

// const allParameter = [
//   {
//       testSystemObject: 'Subscriber',
//       primitiveType: null,
//       title: 'subcriber',
//       desc: 'Subscriber chứa balance cần lấy',
//       value: "#2", parentId: 1, name: "getDeltaX", type: 'left'
//   },
//   {
//       testSystemObject: 'Subscriber',
//       primitiveType: null,
//       title: 'newSubcriber',
//       desc: 'Subscriber chứa balance cần lấy',
//       value: "#2", parentId: 1, name: "getDeltaX",
//       type: 'right'
//   },
//   {
//       testSystemObject: null,
//       primitiveType: 'Long',
//       title: 'balType',
//       desc: 'Loại tài khoản cần lấy',
//       value: "@balType", parentId: 1, name: "getDeltaX",
//       type: 'left'
//   },
//   {
//       testSystemObject: 'Subscriber',
//       primitiveType: null,
//       title: 'subcriber',
//       desc: 'Subscriber chứa balance cần lấy',
//       value: "#2", parentId: 2, name: "getDeltaX",
//       type: 'left'
//   },
//   {
//       testSystemObject: null,
//       primitiveType: 'Long',
//       title: 'balType',
//       desc: 'Loại tài khoản cần lấy',
//       value: "@balType", parentId: 2, name: "getDeltaAvaiableAmountOfBal",
//       type: 'right'
//   },
//   {
//       testSystemObject: 'Subscriber',
//       primitiveType: null,
//       title: 'subcriber',
//       desc: 'Subscriber chứa balance cần lấy',
//       value: "#6", parentId: 2, name: "getDeltaX",
//       type: 'left'
//   },
//   {
//       testSystemObject: 'Subscriber',
//       primitiveType: null,
//       title: 'newSubcriber',
//       desc: 'Subscriber chứa balance cần lấy',
//       value: "#7", parentId: 2, name: "getDeltaX",
//       type: 'leftright'
//   },
// ];

// allParameter.sort((a, b) => {
//   if (a.type === 'left' && b.type !== 'left') {
//       return -1;
//   } else if (a.type !== 'left' && b.type === 'left') {
//       return 1;
//   } else if (a.type === 'right' && b.type !== 'right') {
//       return -1;
//   } else if (a.type !== 'right' && b.type === 'right') {
//       return 1;
//   } else {
//       return 0;
//   }
// });

// console.log(allParameter);

// const dataList1 = [
//   {
//     idRule: 1,
//     listExpression: [
//       {
//           name: 'getDeltaX',
//           parameter: [
//               {
//                   testSystemObject: 'Subscriber',
//                   primitiveType: null,
//                   name: 'subcriber',
//                   desc: 'Subscriber chứa balance cần lấy',
//                   value: "#1", parentId: 1
//               },
//               {
//                 testSystemObject: 'Subscriber',
//                 primitiveType: null,
//                 title: 'subcriber',
//                 desc: 'Subscriber chứa balance cần lấy',
//                 value: "#2", parentId: 1,
//             },
//               {
//                   testSystemObject: null,
//                   primitiveType: 'Long',
//                   name: 'balType',
//                   desc: 'Loại tài khoản cần lấy'
//               }
//           ]
//       },
//       {
//           name: 'getDeltaAvaiableAmountOfBal',
//           parameter: [
//               {
//                   testSystemObject: 'Subscriber',
//                   primitiveType: null,
//                   name: 'subcriber',
//                   desc: 'Subscriber chứa balance cần lấy',
//                   value: "#2", parentId: 1
//               },
//               {
//                   testSystemObject: 'Subscriber',
//                   primitiveType: null,
//                   name: 'newSubcriber',
//                   desc: 'Subscriber chứa balance cần lấy',
//                   value: "#3", parentId: 1
//               },
//               {
//                   testSystemObject: null,
//                   primitiveType: 'Long',
//                   name: 'balType',
//                   desc: 'Loại tài khoản cần lấy',
//                   value: "@balType", parentId: 1
//               }
//           ]
//       }
//     ]
//   },  {
//     idRule: 2,
//     listExpression: [
//       {
//           name: 'getDeltaX',
//           parameter: [
//               {
//                   testSystemObject: 'Subscriber',
//                   primitiveType: null,
//                   name: 'subcriber',
//                   desc: 'Subscriber chứa balance cần lấy',
//                   value: "#1", parentId: 2
//               },
//               {
//                 testSystemObject: 'Subscriber',
//                 primitiveType: null,
//                 title: 'subcriber',
//                 desc: 'Subscriber chứa balance cần lấy',
//                 value: "#2", parentId: 2,
//             },
//               {
//                   testSystemObject: null,
//                   primitiveType: 'Long',
//                   name: 'balType',
//                   desc: 'Loại tài khoản cần lấy'
//               }
//           ]
//       },
//       {
//           name: 'getDeltaAvaiableAmountOfBal',
//           parameter: [
//               {
//                   testSystemObject: 'Subscriber',
//                   primitiveType: null,
//                   name: 'subcriber',
//                   desc: 'Subscriber chứa balance cần lấy',
//                   value: "#2", parentId: 2
//               },
//               {
//                   testSystemObject: 'Subscriber',
//                   primitiveType: null,
//                   name: 'newSubcriber',
//                   desc: 'Subscriber chứa balance cần lấy',
//                   value: "#3", parentId: 2
//               },
//               {
//                   testSystemObject: null,
//                   primitiveType: 'Long',
//                   name: 'balType',
//                   desc: 'Loại tài khoản cần lấy',
//                   value: "@balType", parentId: 2
//               }
//           ]
//       }
//     ]
//   },
// ]

// // Hàm để tạo bản sao mới của dataList với giá trị value được cập nhật
// function updateValuesDeepCopy(dataList, parameters) {
//   return dataList.map(rule => ({
//     ...rule,
//     listExpression: rule.listExpression.map(expression => ({
//       ...expression,
//       parameter: expression.parameter.map(param => {
//         // Tìm parameter tương ứng trong allParameter
//         const matchingParam = parameters.find(p =>
//           p.name === param.name &&
//           p.testSystemObject === param.testSystemObject &&
//           p.primitiveType === param.primitiveType &&
//           p.parentId === param.parentId
//         );

//         // Trả về bản sao của param với value được cập nhật nếu có
//         return {
//           ...param,
//           value: matchingParam ? matchingParam.value : param.value
//         };
//       })
//     }))
//   }));
// }

// // Tạo một bản sao mới của dataList1 với giá trị value được cập nhật
// const updatedDataList1 = updateValuesDeepCopy(dataList1, allParameter);

// // Hàm để loại bỏ các phần tử trùng lặp
// function removeDuplicates(parameters) {
//   const uniqueParameters = [];
//   const seen = new Set();

//   parameters.forEach(param => {
//     const key = `${param.testSystemObject}-${param.value}`;
//     if (!seen.has(key)) {
//       seen.add(key);
//       uniqueParameters.push(param);
//     }
//   });

//   return uniqueParameters;
// }

// // Gọi hàm để loại bỏ các phần tử trùng lặp
// const uniqueParameters1 = removeDuplicates(allParameter);

// // In ra kết quả để xem sự khác biệt
// // console.log(uniqueParameters1);

//   return (
//     <div>

//     </div>
//   );
// }

// export default SortedList;
