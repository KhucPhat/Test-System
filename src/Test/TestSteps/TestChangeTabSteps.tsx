// const dataTabSteps = [
//     {
//         tabId: 1,
//         tabName: 'Case 1',
//         hasTab: true,
//         childTabs: [
//             {
//                 tabId: 2,
//                 tabName: 'Inputs',
//                 hasTab: true,
//                 childTabs: [
//                     {
//                         tabId: 3,
//                         tabName: 'Test Bal Type',
//                         hasTab: true,
//                         childTabs: [
//                             {
//                                 tabId: 46,
//                                 tabName: 'Attribute Tags',
//                                 hasTab: true,
//                                 childTabs: [
//                                     {
//                                         tabId: 4,
//                                         tabName: 'Balance',
//                                         hasTab: true,
//                                         childTabs: []
//                                     }
//                                 ]
//                             },
//                             {
//                                 tabId: 5,
//                                 tabName: 'Characteristic',
//                                 hasTab: false,
//                                 charSpecUse: [
//                                     {
//                                         id: 6,
//                                         name: 'Kied',
//                                         value: 12
//                                     }
//                                 ]
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     }
// ];

// const updates = [
//     { id: 6, name: 'Kied', value: 100, parentTabId: 3 }
// ];

// function deepCopyUpdate(node, updates) {
//     const newNode = {...node};
//     if (node.childTabs) {
//         newNode.childTabs = node.childTabs.map(child => deepCopyUpdate(child, updates));
//     }
//     if (node.charSpecUse && node.tabId === updates[0].parentTabId) {
//         newNode.charSpecUse = node.charSpecUse.map(charSpec => {
//             const updatedCharSpec = {...charSpec};
//             if (updatedCharSpec.id === updates[0].id) {
//                 updatedCharSpec.value = updates[0].value;
//             }
//             return updatedCharSpec;
//         });
//     }
//     return newNode;
// }

// const updatedData = dataTabSteps.map(tabStep => deepCopyUpdate(tabStep, updates));

// // Log the updated structure to verify the changes
// console.log(updatedData);

// // Hàm đệ quy tìm kiếm parentId để thêm phần tử con
// function addTabToChildTabsWithoutMutation(originalData, tabIdToAdd, newTab) {
//     // Create a deep copy of the original data to avoid direct mutation
//     const newData = JSON.parse(JSON.stringify(originalData));

//     function recurseAndUpdate(data) {
//         data.forEach(item => {
//             if (item.tabId === tabIdToAdd) {
//                 // When the correct tab is found, add the new tab to childTabs
//                 item.childTabs.push(newTab);
//             }
//             if (item.childTabs) {
//                 recurseAndUpdate(item.childTabs);
//             }
//         });
//     }

//     // Start the recursive update process
//     recurseAndUpdate(newData);
//     return newData;
// }

// const updatedData = addTabToChildTabsWithoutMutation(dataTabSteps, 4, newChildTab);
