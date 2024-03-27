import MyContext from '@/context/TestContext';
import React, { useState, useEffect } from 'react';
import ChildComponent1 from './ChildComponent1';
import ChildComponent2 from './ChildComponent2';
interface ContextType {
    data1: any[];
    data2: any[];
    setState1: React.Dispatch<React.SetStateAction<string>>;
    setState2: React.Dispatch<React.SetStateAction<string>>;
    state1: string;
    state2: string;
  }

// Component cha
const ParentComponent = (props) => {
    const {value} = props;
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [state1, setState1] = useState('');
  const [state2, setState2] = useState('');
  console.log(value)

  // Mô phỏng việc lấy dữ liệu từ API bằng useEffect
  useEffect(() => {
    // Giả sử gọi API và cập nhật dữ liệu
    const fetchData1 = async () => {
      const response = await fetch('api_url_1');
      const data = await response.json();
      setData1(data);
    };

    const fetchData2 = async () => {
      const response = await fetch('api_url_2');
      const data = await response.json();
      setData2(data);
    };

    // Gọi fetchData1 và fetchData2
    fetchData1();
    fetchData2();
  }, []);

  // Định nghĩa một đối tượng chứa tất cả thông tin cần thiết
  const contextValue: ContextType = {
    data: {
      data1,
      data2,
    },
    setState: {
      setState1,
      setState2,
    },
    state: {
      state1,
      state2,
    },
  };

  return (
    <MyContext.Provider value={contextValue}>
      <ChildComponent1 />
      <ChildComponent2 />
    </MyContext.Provider>
  );
};

export default ParentComponent;
