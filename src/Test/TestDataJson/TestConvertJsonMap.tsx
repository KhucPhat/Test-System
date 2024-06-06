import React from 'react';
 function StyledJsonDisplay() {
   const jsonString = `{
      "attrString": "a",
      "attrFloat": 0.3,
      "attrDate": "2024-12-20 12:20:10",
      "attrSingleObject": {
         "string": ["a", "b"],
         "long": 2133
      },
      "attrSingleOfList": [
         {
            "string": ["a", "b"],
            "long": 2133,
            "attrMap": {
               "map0_1": {
                  "attr1": "Ab",
                  "attr2": 2,
                  "attr3": [0, 1],
                  "attr4": {
                     "Ab1": {
                        "attr23": "Ab1",
                        "attr231": 22,
                        "attr1313": true,
                        "attri32": "2024-12-20 12:40:13"
                     }
                  }
               }
            }
         }
      ],
      "map": {
         "map0_1": {
            "attr1": "Ab",
            "attr2": 2,
            "attr3": [0, 1],
            "attr4": {
               "Ab1": {
                  "attr23": "Ab1",
                  "attr231": 22,
                  "attr1313": true,
                  "attri32": "2024-12-20 12:40:13"
               }
            }
         },
         "map1": {
            "false": {
               "attr12": "Abc",
               "attr23": 23,
               "attr33": false,
               "attr43": {
                  "true": {
                     "attr2312": "Ab1",
                     "attr23146": 22,
                     "attr131375": true,
                     "attri32123": "@2024-12-20 12:40:13"
                  }
               },
               "attrMapofMap": {
                  "22": {
                     "type1": "Ab1",
                     "type2": 22,
                     "attr131375": true,
                     "attri32123": "@2024-12-20 12:40:13"
                  }
               }
            }
         },
         "map3": {
            "Abc": {
               "attr12": "Abc",
               "attr23": 23,
               "attr33": false,
               "attr43": {
                  "dateKey": {
                     "attr2312": "Ab1",
                     "attr23146": 22,
                     "attr131375": true,
                     "attri32123": "2024-12-20 12:40:13"
                  }
               },
               "attrMapofMap": {
                  "true": {
                     "type1": "Ab1",
                     "type2": 22,
                     "attr131375": true,
                     "attri32123": {
                        "arrayAB": {
                           "bal1": ["a", "b"],
                           "bal2": 1234000,
                           "bal3": 0.3344,
                           "bal4": {
                              "0.321": {
                                 "typq1": 0.321,
                                 "type2": 4234,
                                 "typ3": true,
                                 "type4": [true, false]
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
      }
   }
   `;
   // Hàm đệ quy để xử lý và hiển thị JSON
   const renderJson = (obj, indent = 0, isLast = true) => {
      const entries = Object.entries(obj);
      return entries.map(([key, value], index) => {
          const isValueLast = index === entries.length - 1;
          const paddingLeftStyle = { paddingLeft: `${0}px` };

          if (typeof value === 'string') {
              // Kiểm tra nếu giá trị là chuỗi và có thể là JSON list
              try {
                  const parsedValue = JSON.parse(value);
                  if (Array.isArray(parsedValue)) {
                      value = parsedValue;
                  }
              } catch (e) {
                  // Không làm gì nếu value không phải là JSON hợp lệ
              }
          }

          if (Array.isArray(value)) {
              // Xử lý nếu giá trị là một mảng
              return (
                  <div key={index} style={paddingLeftStyle}>
                      <span style={{ color: 'green' }}>"{key}"</span>: [
                      <div style={{ paddingLeft: '20px' }}>
                          {value.map((item, idx) => (
                              <div key={idx}>
                                  {typeof item === 'object' ? (
                                      <>
                                          {'{'}
                                          <div>{renderJson(item, indent + 20, idx === value.length - 1)}</div>
                                          {'}'}
                                          {idx === value.length - 1 ? '' : ','}
                                      </>
                                  ) : (
                                      <>
                                          {typeof item === 'string' && item.includes('@') ? (
                                              <span style={{ color: 'red' }}>"{item}"</span>
                                          ) : (
                                              `"${item}"`
                                          )}
                                          {idx === value.length - 1 ? '' : ','}
                                      </>
                                  )}
                              </div>
                          ))}
                      </div>
                      ]
                      {isLast && isValueLast ? '' : ','}
                  </div>
              );
          } else if (typeof value === 'object' && value !== null) {
              // Nếu giá trị là một đối tượng
              return (
                  <div key={index} style={paddingLeftStyle}>
                      <span style={{ color: 'green' }}>"{key}"</span>: {'{'}
                      <div style={{ paddingLeft: '20px' }}>{renderJson(value, indent + 20, isValueLast)}</div>
                      {'}'}
                      {isLast && isValueLast ? '' : ','}
                  </div>
              );
          } else {
              // Kiểm tra nếu giá trị là chuỗi và có chứa ký tự '@'
              const displayValue =
                  typeof value === 'string' && value.includes('@') ? (
                      <span style={{ color: 'red' }}>"{value}"</span>
                  ) : (
                      `"${value}"`
                  );
              return (
                  <div key={index} style={paddingLeftStyle}>
                      <span style={{ color: 'green' }}>"{key}"</span>: {displayValue}
                      {isLast && isValueLast ? '' : ','}
                  </div>
              );
          }
      });
  };

  return (
      <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
          <pre>{'{'}</pre>
          <pre>{renderJson(JSON.parse(jsonString), 0, true)}</pre>
          <pre>{'}'}</pre>
      </div>
  );
}

export default StyledJsonDisplay;
