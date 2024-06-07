import EditableJSONFormatter from "./TestDataJson/TestChangeValueJson";
import TestChangeValueJson from "./TestDataJson/TestChangeValueJson";
import ContextValueJson from "./TestDataJson/TestContextValueJson";
import JSONFormatter from "./TestDataJson/TestConvertJsonMap";
import JSONDisplay from "./TestDataJson/TestConvertJsonMap";
import StyledJsonDisplay from "./TestDataJson/TestConvertJsonMap";

function Test() {
  const jsonMapString = `{
    "attrString": "a",
    "attrFloat": 0.3,
    "attrDate": "@70002|we|a#",
    "attList": "[1,2]",
    "attrSingleObject": {
       "string": ["a", "b"],
       "long": 2133
    },
    "attr Single Of List": [
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
                      "attri32": "@23449|ar|a#"
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
                "attr1313": "@23456|a|t#",
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
                   "attri32123": "2024-12-20 12:40:13"
                }
             },
             "attrMapofMap": {
                "22": {
                   "type1": "Ab1",
                   "type2": 22,
                   "attr131375": true,
                   "attri32123": "2024-12-20 12:40:13"
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
             "attr Mapof Map": {
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

 

  const jsonObject = `{
    "attr1": [2020, 2022],
    "attr2": 23,
    "attr3": "ab",
    "attr5": {
      "attr1": [2020, 2022],
      "attr2": 23,
      "attr3": "ab"
      },
      "attr6": {
       "attr1": [2020, 2022],
      "attr2": 23,
      "attr3": {
       "attr1": [2020, 2022],
      "attr2": 23,
      "attr3": "ab"
      }
      }
    }`;

    const jsonObjectList = `{
      "attr1": [2020, 2022],
      "attr2": 23,
      "attr3": "ab"
      }`;
  

    const jsonArray = `[
      0,1
        ]`;
  const jsonObjectArray = `
  [
    {
    "attrLong": 12,
    "attListLong": [23,23],
    "attriSingle": "A",
    "attriListSingle": ["a", "b"]
    }
  ]
  `

  function downloadJSON(data, filename = 'data.json') {
    // Không cần chuyển đổi data sang JSON vì nó đã là một chuỗi JSON đúng định dạng
    const blob = new Blob([data], { type: 'application/json' });

    // Tạo liên kết tải xuống
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Dọn dẹp sau khi tải xuống
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

  return (
   //  <StyledJsonDisplay jsonData={jsonMapString} />
   <ContextValueJson data={JSON.parse(jsonMapString)} />
  );
}

export default Test;
