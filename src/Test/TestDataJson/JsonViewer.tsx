import React from "react";

const jsonData = `{
  attr: "a",
  attr2: "2024-12-23 23:40:20",
  attr3: 2,
  attr4: "[2,3]",
  attr5: {
    "attr c": "@56600|AT|ad#",
    "attr d": [0.1, 0.3],
    "attr e": [1, 3],
    "attr f": ["A", "B", "C", "D"],
  },
  attr6: [
    {
      "attr caa": 1,
      "attr dad": ["2024-12-23 20:12:34", "2024-12-23 20:12:34"],
      "attr ev": [1, 3],
      "attr fv": ["A", "B", "C", "D"],
    },
  ],
  attr7: {
    "attr c": 0.3,
    "attr d": [0.1, 0.3],
    "attr e": [1, 3],
    "attr f": [
      {
        "attr caa": 1,
        "attr dad": ["2024-12-23 20:12:34", "2024-12-23 20:12:34"],
        "attr ev": [1, 3],
        "attr fv": ["A", "B", "C", "D"],
      },
    ],
  },
  attr8: {
    "attr c": 0.3,
    "attr d": [0.1, 0.3],
    "attr e": [1, 3],
    attr6: {
      "attr caa": 1,
      "attr dad": ["2024-12-23 20:12:34", "2024-12-23 20:12:34"],
      "attr ev": [1, 3],
      "attr fv": ["A", "B", "C", "D"],
    },
  },
  attr9: {
    "0.3": {
      "attr c": 0.3,
      "attr d": [0.1, 0.3],
      "attr e": [1, 3],
      attr6: {
        "attr caa": 1,
        "attr dad": ["2024-12-23 20:12:34", "2024-12-23 20:12:34"],
        "attr ev": [1, 3],
        "attr fv": ["A", "B", "C", "D"],
      },
    },
  },
  attr10: {
    "[0,1]": {
      "attr c": "@800044|adr|ad#",
      "attr d": [0, 1],
      "attr e": [1, 3],
      attr9: {
        "0.3": {
          "attr c": 0.3,
          "attr d": [0.1, 0.3],
          "attr e": [1, 3],
          attr6: {
            "attr caa": 1,
            "attr dad": ["2024-12-23 20:12:34", "2024-12-23 20:12:34"],
            "attr ev": [1, 3],
            "attr fv": ["A", "B", "C", "D"],
          },
        },
      },
    },
  },
  attr11: {
    "attr caa": 1,
    "attr dad": ["2024-12-23 20:12:34", "2024-12-23 20:12:34"],
    "attr ev": [1, 3],
    "attr fv": ["A", "B", "C", "D"],
    attr10: {
      "[0,1]": {
        "attr c": 0.5,
        "attr d": [0, 1],
        "attr e": [1, 3],
        attr9: {
          "0.3": {
            "attr c": 0.3,
            "attr d": [0.1, 0.3],
            "attr e": [1, 3],
            attr6: {
              "attr caa": "@6000|a|f#",
              "attr dad": ["2024-12-23 20:12:34", "2024-12-23 20:12:34"],
              "attr ev": [1, 3],
              "attr fv": ["A", "B", "C", "D"],
            },
          },
        },
      },
    },
  },
}`;

const JsonDisplay = () => {
  const formatJson = (value, indent = 0) => {
    const spacer = " ".repeat(indent); // Creates indentation
    if (typeof value === "string") {
      return value.includes("@")
        ? `<span style={{ color: 'red' }}>${JSON.stringify(value)}</span>`
        : JSON.stringify(value);
    } else if (typeof value === "number" || typeof value === "boolean") {
      return value.toString();
    } else if (Array.isArray(value)) {
      const elements = value
        .map((v) => `${spacer}  ${formatJson(v, indent + 2)}`)
        .join(",\n");
      return `[\n${elements}\n${spacer}]`;
    } else if (typeof value === "object") {
      const entries = Object.entries(value).map(([key, val]) => {
        return `${spacer}  "${key}": ${formatJson(val, indent + 2)}`;
      });
      return `{\n${entries.join(",\n")}\n${spacer}}`;
    }
  };

  const renderedJson = formatJson(jsonData);

  return (
    <div style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
      <pre dangerouslySetInnerHTML={{ __html: renderedJson }} />
    </div>
  );
};

export default JsonDisplay;
