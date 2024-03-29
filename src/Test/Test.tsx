import ParentComponent from "@/pages/TestContext/ParentComponent";
import React, { useState } from "react";

const Test = () => {
  const [value, setValue] = useState(1);
  return (
    <>
      <ParentComponent value={value} />
    </>
  );
};

export default Test;
