import { ContextType, useMyContext } from '@/context/TestContext';
import React from 'react';

// Component con 1
const ChildComponent1 = () => {
  // Sử dụng custom hook để truy cập giá trị state từ Context
  const dataContext: ContextType = useMyContext();

  // Dùng các state và hàm setState từ Context ở đây
  const {data1, setState1, state1} = dataContext;

  return (
    <div>
      <h2>Child Component 1</h2>
      <p>Data 1 from Context: {JSON.stringify(data1)}</p>
      <p>State 1 from Context: {state1}</p>
      <button onClick={() => setState1('New State 1')}>Set State 1</button>
    </div>
  );
};

export default ChildComponent1;
