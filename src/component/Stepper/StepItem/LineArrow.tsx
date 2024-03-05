import React from "react";

const LineArrow = () => {
  const lineLength = 200; // Độ dài của đường thẳng
  const arrowSize = 10; // Kích thước của mũi tên
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 250"
        width="50"
        height="250"
      >
        {/* Vẽ đường thẳng */}
        <line
          x1="25"
          y1="20"
          x2="25"
          y2={20 + lineLength}
          stroke="black"
          strokeWidth="2"
        />

        {/* Vẽ mũi tên */}
        <polygon
          points={`${25 - arrowSize / 2},${20 + lineLength} ${25},${20 + lineLength + arrowSize} ${25 + arrowSize / 2},${20 + lineLength}`}
          fill="black"
        />
      </svg>
    </>
  );
};

export default LineArrow;
