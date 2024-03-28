import React from "react";

interface TestProps {
  jsonData: any;
}

const Test: React.FC<TestProps> = (props) => {
  const { jsonData } = props;
  return (
    <div>
      <h2>Thông tin JSON:</h2>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default Test;
