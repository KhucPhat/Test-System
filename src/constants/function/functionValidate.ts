function isValidFloatString(input) {
    const num = parseFloat(input);
    // Check if the parsed number is finite, and the input is not an empty string
    if (!isNaN(num) && isFinite(num) && input.trim() !== "") {
        // Ensure the input matches a strict float pattern and consider numbers with a '.0' suffix
        const floatRegex = /^-?\d+(\.\d+)?$/;
        return floatRegex.test(input) || (input.includes('.') && input.endsWith('.0'));
    }
    return false;
}

function validateDateInput(dateString) {
    // Regex pattern to validate the correct format YYYY-MM-DD HH:MM:SS
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (!regex.test(dateString)) {
        return false; // Early rejection if format is incorrect
    }

    // Splitting the dateString to manually construct the date to avoid timezone issues
    const parts = dateString.split(/[- :]/);
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-based in JavaScript
    const day = parseInt(parts[2], 10);
    const hour = parseInt(parts[3], 10);
    const minute = parseInt(parts[4], 10);
    const second = parseInt(parts[5], 10);

    // Early reject for invalid year or invalid month/day values
    if (year < 1001 || year > 9999 || month < 0 || month > 11 || day < 1 || day > 31) {
        return false;
    }

    const date = new Date(year, month, day, hour, minute, second);

    // Define the minimum and maximum allowable dates in local time
    const minDate = new Date(1001, 0, 1, 0, 0, 0); // 1001-01-01 00:00:00
    const maxDate = new Date(9999, 11, 31, 23, 59, 59); // 9999-12-31 23:59:59

    // Additional checks for the JavaScript date object edge cases
    if (isNaN(date.getTime())) {
        return false; // Check if date is not valid (e.g., Feb 30)
    }

    // Check if the date is valid and within the allowed range
    return date >= minDate && date <= maxDate;
};

// Hàm check xem có value ! rỗng trong list object không
function hasNonEmptyValue(obj) {
  // Sử dụng Object.values() để lấy tất cả các giá trị trong object,
  // sau đó sử dụng some() để kiểm tra xem có giá trị nào không phải là chuỗi rỗng
  return Object.values(obj).some(value => value !== '');
};

function determineDataType(defaultValue) {
    // Kiểm tra kiểu Boolean
    if (defaultValue === "true" || defaultValue === "false") {
        return 'Boolean';
    }

    // Kiểm tra kiểu Date
    const datePattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; // YYYY-MM-DD HH:MM:SS
    if (datePattern.test(defaultValue)) {
        return 'Date';
    }

    // Kiểm tra kiểu Number (Long và Float)
    if (!isNaN(defaultValue)) {
        // Phân biệt giữa Long và Float
        if (defaultValue.includes('.')) {
            return 'Float';
        } else {
            return 'Long';
        }
    }

    // Mặc định sẽ trả về kiểu String
    return 'String';
}


// // globalAccess.ts
// import store from './store';

// let globalValue: string = '';

// store.subscribe(() => {
//     const state = store.getState();
//     globalValue = state.globalValue;
//     console.log('Updated global value:', globalValue);
// });

// // This file can now export `globalValue` or use it for other global purposes.
function isValidLong(value) {
    return Number.isInteger(value);
  }
  
  function isValidFloat(value) {
    return typeof value === 'number' && !Number.isInteger(value);
  }
  
  function isValidBoolean(value) {
    return typeof value === 'boolean';
  }
  
  function isValidDateTime(value) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
    return typeof value === 'string' && dateRegex.test(value);
  }
  
  export function validateDataType(newValue, oldValue) {
    if (typeof oldValue === 'boolean') {
      return isValidBoolean(newValue);
    } else if (typeof oldValue === 'number') {
      return Number.isInteger(oldValue) ? isValidLong(newValue) : isValidFloat(newValue);
    } else if (typeof oldValue === 'string') {
      // Chú ý rằng kiểu string có thể là DateTime hoặc chuỗi thông thường
      const isOldDateTime = isValidDateTime(oldValue);
      if (isOldDateTime) {
        return isValidDateTime(newValue);
      }
      return typeof newValue === 'string'; // Xử lý chuỗi thông thường
    }
    return false; // Nếu kiểu dữ liệu không được hỗ trợ
  };

 export function validateComplexJson(value, expectedType) {
    if (Array.isArray(value)) {
      // Kiểm tra nếu value là một mảng
      return value.every(item => validateComplexJson(item, expectedType));
    } else if (typeof value === 'object' && value !== null) {
      // Kiểm tra nếu value là một đối tượng
      return Object.keys(value).every(key => expectedType[key] && validateComplexJson(value[key], expectedType[key]));
    } else {
      // Kiểm tra nếu value là giá trị đơn lẻ
      return validateDataType(value, expectedType);
    }
  }
  
