- Các Tài liệu về test Jest trong React:
+ https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react/
+ https://github.com/RidhwanDev/calculator-tutorial

- Các video về test jest
  + Testing in React using Jest
  + React Testing Course for Beginners – Code and Test 3 Apps
  + React Testing Tutorial (Jest + React Testing Library)
  + Testing In React Tutorial - Jest and React Testing Library

- Doc:
1. render
Hàm render của React Testing Library được sử dụng để "vẽ" một thành phần React vào một DOM ảo để bạn có thể thực hiện kiểm thử trên nó.
Hàm này trả về một đối tượng có nhiều phương thức hỗ trợ để truy vấn thành phần đã được vẽ, như getByText, getByTestId, và nhiều hàm khác.

2. fireEvent
fireEvent là một phương thức cung cấp bởi React Testing Library, cho phép bạn mô phỏng các sự kiện người dùng, như click chuột hoặc nhập liệu từ bàn phím.
Trong ví dụ, fireEvent.click(buttonElement) được dùng để mô phỏng hành động click vào nút.

3. screen
screen là một tiện ích giúp truy cập các phương thức truy vấn DOM mà không cần truyền DOM container mỗi lần. screen.getByText('Click me') được sử dụng để tìm nút có chữ "Click me".
+)  getAllByTestId là một truy vấn giúp bạn lấy tất cả các phần tử trong DOM mà có thuộc tính data-testid khớp với ID mà bạn cung cấp. 
Truy vấn này trả về một mảng các phần tử và sẽ ném ra một lỗi nếu không có phần tử nào được tìm thấy.

4. expect
expect là một hàm của Jest dùng để định nghĩa một kỳ vọng hoặc một assertion. Đây là cách bạn nói với Jest rằng bạn mong đợi một giá trị cụ thể hoặc một điều kiện được đáp ứng.
Trong ví dụ, expect(buttonElement).toBeInTheDocument() kiểm tra xem nút có tồn tại trong tài liệu hay không.
+ expect(buttonElement).toContainHtml(thẻ html): thường được sử dụng để kiểm tra xem một phần tử cụ thể có chứa đoạn HTML bạn mong đợi hay không;
+ expect(buttonElement).toHaveTextContent(text): là một phương thức kiểm tra được sử dụng để kiểm tra xem một phần tử DOM cụ thể có chứa một chuỗi văn bản đã cho, không tính các thẻ HTML bên trong phần tử đó. 

5. jest.fn()
jest.fn() tạo một hàm giả (mock function), cho phép bạn kiểm tra xem hàm đó có được gọi hay không, được gọi bao nhiêu lần, và được gọi với những đối số gì.
Trong ví dụ, jest.fn() được sử dụng để tạo một hàm giả cho sự kiện onClick của nút.

6. describe và it
describe là một hàm của Jest cho phép bạn nhóm nhiều bài kiểm thử có liên quan lại với nhau. Điều này giúp tổ chức các bài kiểm thử một cách rõ ràng và dễ quản lý.
it (tương tự như test) là hàm bạn sử dụng để định nghĩa một bài kiểm thử cụ thể. Mỗi bài kiểm thử sẽ chứa một hoặc nhiều expect để xác nhận hành vi của thành phần.

7. waitFor là một tiện ích của React Testing Library dùng để đợi cho đến khi một điều kiện không đồng bộ hoàn thành.
Điều này hữu ích khi kiểm tra các thao tác mà cần đợi cho các hành động như cập nhật trạng thái hoặc các yêu cầu mạng hoàn thành.

8.jest.fn()
jest.fn() là một hàm của Jest dùng để tạo ra một mock function. Bạn có thể sử dụng mock function này để kiểm tra xem nó đã được gọi hay chưa, được gọi bao nhiêu lần, và được gọi với những đối số gì.

9.test()
test là một hàm trong Jest được sử dụng để viết một test case. Nó nhận hai tham số: một chuỗi mô tả bài kiểm thử và một hàm thực hiện các kiểm tra cụ thể. 
Hàm này có thể là đồng bộ hoặc bất đồng bộ, tùy thuộc vào bản chất của các thao tác bạn cần kiểm thử.

10.afterEach
afterEach là một hàm thuộc nhóm lifecycle hooks dùng để định nghĩa các hoạt động sẽ được thực hiện sau khi mỗi test case hoàn thành.
Việc sử dụng afterEach giúp bạn làm sạch hoặc reset trạng thái môi trường để đảm bảo rằng mỗi test case được thực hiện trong một môi trường sạch,
không bị ảnh hưởng bởi các test case khác, từ đó giúp kết quả kiểm thử trở nên đáng tin cậy hơn.
+ cleanup(): sẽ tự động làm sạch DOM sau khi mỗi test hoàn thành, giúp mỗi test chạy trong một môi trường sạch sẽ, không bị ảnh hưởng bởi các test trước đó.
+ jest.resetAllMocks(): là một hàm hữu ích dùng để reset tất cả các hàm giả (mock functions) và giá trị của chúng về trạng thái ban đầu.

7. @testing-library/jest-dom/extend-expect
Thư viện này cung cấp thêm các matchers cho Jest, giúp các bài kiểm thử dễ viết và dễ hiểu hơn. 
Ví dụ, .toBeInTheDocument() là một matcher từ thư viện này, giúp kiểm tra xem một phần tử có xuất hiện trong tài liệu HTML hiện tại hay không.

- Example
+ Kiểm thử button create
// CreateProduct.js
import React, { useState } from 'react';

function CreateProduct({ onCreate }) {
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('https://api.example.com/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (response.ok) {
      onCreate();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter product name"
      />
      <button type="submit">Create Product</button>
    </form>
  );
}

export default CreateProduct;

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateProduct from './CreateProduct';

describe('CreateProduct Component', () => {
  test('creates a new product on form submission', async () => {
    window.fetch = jest.fn(() => Promise.resolve({ ok: true }));
    const mockOnCreate = jest.fn();
    render(<CreateProduct onCreate={mockOnCreate} />);

    fireEvent.change(screen.getByPlaceholderText('Enter product name'), { target: { value: 'New Product' } });
    fireEvent.click(screen.getByText('Create Product'));

    expect(window.fetch).toHaveBeenCalledWith('https://api.example.com/products', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'New Product' })
    }));
    await waitFor(() => expect(mockOnCreate).toHaveBeenCalled());
  });
});

+ kiểm thử button Read
// ProductList.js
import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://api.example.com/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

export default ProductList;

import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList from './ProductList';

describe('ProductList Component', () => {
  test('fetches and displays products', async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }])
      })
    );

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });
});

