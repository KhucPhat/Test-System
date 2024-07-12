function updateAndPruneArrayA(arrayA, arrayB) {
    // Tạo một Set để lưu trữ các parentId có trong arrayB
    const parentIdsInB = new Set(arrayB.map(item => item.parentId));

    // Đầu tiên, cập nhật giá trị của arrayA dựa trên arrayB
    arrayA.forEach(aItem => {
        const match = arrayB.find(bItem =>
            aItem.parentId === bItem.parentId &&
            aItem.name === bItem.name &&
            aItem.function === bItem.function &&
            aItem.type === bItem.type
        );
        if (match) {
            aItem.value = match.value; // Cập nhật giá trị nếu tìm thấy khớp
        }
    });

    // Sau đó, lọc arrayA để loại bỏ những object không có khớp nào trong arrayB nhưng có cùng parentId
    return arrayA.filter(aItem => {
        // Nếu object này có parentId không có trong arrayB, giữ nguyên object đó
        if (!parentIdsInB.has(aItem.parentId)) {
            return true;
        }
        // Nếu có, kiểm tra xem object này có khớp nào trong arrayB không
        return arrayB.some(bItem =>
            aItem.parentId === bItem.parentId &&
            aItem.name === bItem.name &&
            aItem.function === bItem.function &&
            aItem.type === bItem.type
        );
    });
};

// Hàm Update và add dữ liệu
function updateAndPruneListAllParams(currentList, listPar) {
    const parentIdsInB = new Set(listPar.map(item => item.parentId));

    // Update existing items in currentList with values from listPar
    currentList.forEach(aItem => {
        const match = listPar.find(bItem => aItem.parentId === bItem.parentId);
        if (match) {
            aItem.value = match.value;
            aItem.valuePar = match.valuePar;
        }
    });

    // Add new items from listPar to currentList
    listPar.forEach(bItem => {
        if (!currentList.some(aItem => aItem.parentId === bItem.parentId)) {
            currentList.push({ parentId: bItem.parentId, value: bItem.value, valuePar: bItem.valuePar });
        }
    });

    // Filter currentList to remove items not in listPar
    return currentList.filter(aItem => {
        if (!parentIdsInB.has(aItem.parentId)) {
            return true;
        }
        return listPar.some(bItem => aItem.parentId === bItem.parentId);
    });
}

// Ví dụ sử dụng
let arrayA = [
    { parentId: 1, name: 'Node 1', function: 'Func A', type: 'Type X', value: 10 },
    { parentId: 1, name: 'Node 2', function: 'Func B', type: 'Type Y', value: 20 },
    { parentId: 1, name: 'Node 3', function: 'Func C', type: 'Type Z', value: 30 },
      { parentId: 1, name: 'Node 123', function: 'Func A', type: 'Type X', value: 10 },
    { parentId: 1, name: 'Node 242', function: 'Func BA', type: 'Type Y', value: 20 },
    { parentId: 1, name: 'Node 313', function: 'Func CD', type: 'Type Z', value: 30 },
      { parentId: 2, name: 'Node 113', function: 'Func AD', type: 'Type X', value: 10 },
    { parentId: 2, name: 'Node 2', function: 'Func B', type: 'Type Y', value: 20 },
    { parentId: 2, name: 'Node 3', function: 'Func C', type: 'Type Z', value: 30 }
];
let arrayB = [
   { parentId: 1, name: 'Node 1', function: 'Func A', type: 'Type X', value: 40 },
    { parentId: 1, name: 'Node 2', function: 'Func B', type: 'Type Y', value: 28 },
    { parentId: 1, name: 'Node 3', function: 'Func C', type: 'Type Z', value: 38 },
];

let updatedArray = updateAndPruneArrayA(arrayA, arrayB);
console.log(updatedArray);

function updateCharacterSpecs(listStepTabs, newListDataCharSpec) {
  // Duyệt qua từng phần tử trong mảng cập nhật mới
  newListDataCharSpec.forEach(updateItem => {
    // Duyệt qua từng tab và child tab trong mảng ban đầu
    listStepTabs.forEach(stepTab => {
      stepTab.childTabs.forEach(childTab => {
        // Tìm và cập nhật thông tin character nếu tìm thấy khớp charId và parentId
        childTab.listDataCharSpec.forEach(charSpec => {
          if (charSpec.charId === updateItem.charId && charSpec.parentId === updateItem.parentId) {
            charSpec.apiName = updateItem.apiName;
            charSpec.value = updateItem.value;
          }
        });
      });
    });
  });

  // In ra mảng sau khi đã cập nhật để kiểm tra
  console.log(listStepTabs);
};

function updateListTagName(listStepTabs, newTags) {
  listStepTabs.forEach(tab => {
    tab.childTabs.forEach(child => {
      if (child.listTagName) {
        child.listTagName.forEach(tag => {
          newTags.forEach(newTag => {
            if (tag.compaInfo.id === newTag.compaInfo.id &&
                tag.compaInfo.stepName === newTag.compaInfo.stepName &&
                tag.compaInfo.requestName === newTag.compaInfo.requestName &&
                tag.compaInfo.tabName === newTag.compaInfo.tabName) {
              tag.compaInfo.charSpecUse = newTag.compaInfo.charSpecUse.map(item => ({ ...item }));
            }
          });
        });
      }
    });
  });

  // In ra mảng sau khi cập nhật để kiểm tra
  console.log(listStepTabs);
};

function filterStepsWithNonEmptyValues(stepsPopup) {
  return stepsPopup.map(step => {
    const filteredChildTabs = step.childTabs.filter(tab => {
      // Kiểm tra các tab có listValue không rỗng
      const hasNonEmptyListValue = tab.listValue && tab.listValue.length > 0;
      // Kiểm tra các tab có attrTag với listValue không rỗng hoặc charSpecList không rỗng
      const hasValidAttrTag = tab.attrTag && tab.attrTag.some(tag => tag.listValue && tag.listValue.length > 0);
      const hasNonEmptyCharSpecList = tab.charSpecList && tab.charSpecList.length > 0;

      return hasNonEmptyListValue || hasValidAttrTag || hasNonEmptyCharSpecList;
    });

    return {
      ...step,
      childTabs: filteredChildTabs
    };
  }).filter(step => step.childTabs.length > 0);
};


