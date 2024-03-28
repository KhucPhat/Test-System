import { useMyContext } from "@/context/TestContext";

// Component con 2
const ChildComponent2 = () => {
  // Sử dụng custom hook để truy cập giá trị state từ Context
  const { data, setState, state } = useMyContext();

  // Dùng các state và hàm setState từ Context ở đây
  const { data2 } = data;
  const { setState2 } = setState;
  const { state2 } = state;

  return (
    <div>
      <h2>Child Component 2</h2>
      <p>Data 2 from Context: {JSON.stringify(data2)}</p>
      <p>State 2 from Context: {state2}</p>
      <button onClick={() => setState2('New State 2')}>Set State 2</button>
    </div>
  );
};

export default ChildComponent2;
