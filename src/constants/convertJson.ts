export function parseAndConvertJSON(jsonStr) {
    try {
      // Sửa chuỗi thứ ba để nó trở thành JSON hợp lệ
      if (jsonStr.startsWith('"Recuring":')) {
        jsonStr = `{${jsonStr}}`;
      }
      const parsed = JSON.parse(jsonStr);
      return convertToIdKeyValueArray(parsed);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return []; // Trả về mảng rỗng nếu có lỗi
    }
  }
  
  export function convertJSONToArray(jsonStr) {
    try {
      const parsed = JSON.parse(jsonStr);
      let items = [];
      let idCounter = 1;
  
      if (Array.isArray(parsed)) {
        // Xử lý trường hợp mảng các object
        items = parsed.map((item, index) => {
            console.log('array')
            console.log(parsed)
          return Object.keys(item).map(key => ({
            id: idCounter++,
            key: key,
            value: item[key]
          }));
        }).flat(); // Phẳng hóa mảng
      } else if (typeof parsed === 'object') {
        // Xử lý trường hợp object đơn hoặc object lồng
        let index = 0;
        for (const key in parsed) {
          if (parsed.hasOwnProperty(key)) {
            if (typeof parsed[key] === 'object' && !Array.isArray(parsed[key])) {
              const subKeys = Object.keys(parsed[key]);
              if (subKeys.length === 0) {
                // Xử lý trường hợp object rỗng
                items.push({
                  id: index,
                  key: key,
                  value: {}
                });
              } else {
                // Xử lý object lồng nhau có thuộc tính
                subKeys.forEach(subKey => {
                  items.push({
                    id: index,
                    key: `${key}.${subKey}`, // Để dễ dàng nhận biết key lồng
                    value: parsed[key][subKey]
                  });
                });
              }
            } else {
              // Xử lý trường hợp các key không lồng
              items.push({
                id: index,
                key: key,
                value: parsed[key]
              });
            }
            index++;
          }
        }
      }
  
      return items;
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return []; // Trả về mảng rỗng nếu có lỗi
    }
  }
  
 export function convertToIdKeyValueArray(parsed, prefix = '', parentIsArray = false) {
    let result = [];
    if (Array.isArray(parsed)) {
      // Xử lý khi là một mảng các object hoặc giá trị
      parsed.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          result.push(...convertToIdKeyValueArray(item, `${prefix}Arr${index}.`, true));
        } else {
          // Xử lý các phần tử đơn giản trong mảng (số, chuỗi, v.v.)
          result.push({
            id: `${prefix}Arr${index}`,
            key: `${prefix}Arr${index}`,
            value: item
          });
        }
      });
    } else if (typeof parsed === 'object') {
      // Xử lý khi là một object (bao gồm cả object lồng nhau)
      Object.entries(parsed).forEach(([key, value], index) => {
        const newKey = `${prefix}${key}`;
        if (typeof value === 'object' && value !== null) {
          if (Object.keys(value).length === 0 && !Array.isArray(value)) {
            // Xử lý đặc biệt cho object rỗng
            result.push({
              id: newKey,
              key: newKey,
              value: {}
            });
          } else {
            // Đệ quy cho object không rỗng hoặc mảng
            result.push(...convertToIdKeyValueArray(value, newKey + '.', Array.isArray(value)));
          }
        } else {
          // Trường hợp giá trị đơn giản (không phải object/mảng)
          result.push({
            id: newKey,
              key: newKey,
              value: value
          });
        }
      });
    }
    return result;
  }