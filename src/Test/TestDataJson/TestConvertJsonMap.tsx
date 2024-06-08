import React from "react";

const JSONFormatter = ({ data }) => {
  // Hàm này render từng phần tử trong JSON
  const formatJSON = (item, depth = 0) => {
    if (typeof item === "object" && item !== null) {
      if (Array.isArray(item)) {
        // Xử lý nếu là một mảng
        return (
          <span>
            {"["}
            <br />
            {item.map((element, index) => (
              <div key={index} style={{ paddingLeft: `10px` }}>
                {formatJSON(element, depth + 20)}
                {index < item.length - 1 ? "," : ""}
              </div>
            ))}
            {"]"}
          </span>
        );
      } else {
        // Xử lý nếu là một đối tượng
        const keys = Object.keys(item);
        return (
          <span>
            {"{"}
            {keys.map((key, index) => (
              <div key={key} style={{ paddingLeft: `10px` }}>
                <strong>"{key}": </strong>
                {formatJSON(item[key], depth + 20)}
                {index < keys.length - 1 ? "," : ""}
              </div>
            ))}
            {"}"}
          </span>
        );
      }
    } else {
      // Xử lý nếu là một giá trị nguyên thủy
      const stringValue = JSON.stringify(item);
      return (
        <span style={{ color: stringValue.includes("@") ? "red" : "black" }}>
          {stringValue}
        </span>
      );
    }
  };

  return <div style={{ fontFamily: "monospace" }}>{formatJSON(data)}</div>;
};

export default JSONFormatter;
