// Hàm trích xuất phần trước các dấu ngoặc đơn
const extractBeforeParentheses = (input) => {
    const regex = /(\w+)\(/g;
    let match;
    let results = [];

    // Tìm kiếm lặp lại trong chuỗi
    while ((match = regex.exec(input)) !== null) {
      results.push(match[1]);
      regex.lastIndex = match.index + match[0].length; // Đảm bảo tiếp tục tìm kiếm sau mỗi phù hợp
    }

    return results;
  };

  function filterObjectsFromArray(arrayA, arrayB) {
    // Tạo một mảng để lưu trữ các đối tượng từ mảng A có thuộc tính name giống với các giá trị trong mảng B
    let filteredObjects = [];
  
    // Duyệt qua từng phần tử của mảng A
    arrayA.forEach(obj => {
      // Kiểm tra xem giá trị của thuộc tính name trong đối tượng có trong mảng B không
      if (arrayB.includes(obj.name)) {
        // Nếu có, thêm đối tượng vào mảng filteredObjects
        filteredObjects.push(obj);
      }
    });
  
    // Trả về mảng chứa các đối tượng từ mảng A có thuộc tính name giống với các giá trị trong mảng B
    return filteredObjects;
  }
  
  // Mảng đối tượng A
  const arrayA = [{ name: "getaadad" }, { name: "getaadad1" }];
  
  // Mảng chuỗi B
  const arrayB = ["getaadad", "getaadad1", "getaadad2"];
  
  // Lọc và hiển thị kết quả
  const filteredObjects = filterObjectsFromArray(arrayA, arrayB);
  console.log("Các đối tượng từ mảng A có thuộc tính name giống với các giá trị trong mảng B:", filteredObjects);
  

  // Mảng ban đầu
const initialArray = [
    { id: 1, left: 'getaadad(ad,adad,3)', right: 'getaadad1(ad,adad,2)' },
    { id: 2, left: 'getaadad2(ad,adad,4)', right: 'getaadad3(ad,adad,5)' }
  ];
  
  // Mảng giá trị mặc định
  const defaultValues = [
    { name: 'getaadad', parameter: 'a' },
    { name: 'getaadad1', parameter: 'av' }
  ];
  
  // Hàm để cập nhật giá trị của left và right trong mảng ban đầu
  function updateArrayWithDefaultValues(initialArray, defaultValues) {
    return initialArray.map(item => {
      // Tìm giá trị mặc định tương ứng dựa trên tên trong left và right
      const leftDefault = defaultValues.find(value => item.left.includes(value.name));
      const rightDefault = defaultValues.find(value => item.right.includes(value.name));
  
      // Trả về một đối tượng mới với left và right được cập nhật thành mảng chứa các tham số tương ứng
      return {
        ...item,
        left: leftDefault ? [leftDefault.parameter] : [],
        right: rightDefault ? [rightDefault.parameter] : []
      };
    });
  }
  
  // Cập nhật mảng ban đầu với giá trị mặc định
  const updatedArray = updateArrayWithDefaultValues(initialArray, defaultValues);
  
  // Hiển thị kết quả
  console.log(updatedArray);
  