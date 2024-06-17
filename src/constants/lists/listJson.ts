export const jsonMapString = `{
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
                "attr3": ["2023-10-20 12:20:30","2023-10-20 12:20:30"],
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

export const jsonKeyNumber = `{
   "0.1": {
             "attr12": "0.1",
             "attr23": 23,
             "attr33": false,
              "attListLong": [23,23],
             "attr43": {
                "dateKey": {
                   "attr2312": "Ab1",
                   "attr23146": 22,
                   "attr131375": true,
                   "attri32123": "2024-12-20 12:40:13"
                }
             }
   }
}`

export const jsonObject = `{
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

export const jsonObjectList = `{
      "attr1": [2020, 2022],
      "attr2": 23,
      "attr3": "ab"
      }`;

export const jsonArray = `[
      0,1
        ]`;
export const jsonObjectArray = `
  [
    {
    "attrLong": 12,
    "attListLong": [23,23],
    "attriSingle": "A",
    "attriListSingle": ["a", "b"]
    }
  ]
  `;

export const listDataAttrJson = [
//    {
//       attrName: "Object1",
//       value: `{
//     "attrString": "a",
//     "attrFloat": 0.3,
//     "attrDate": "@70002|we|a#",
//     "attList": "[1,2]",
//     "attrSingleObject": {
//        "string": ["a", "b"],
//        "long": 2133
//     },
//     "attr Single Of List": [
//        {
//           "string": ["a", "b"],
//           "long": 2133,
//           "attrMap": {
//              "map0_1": {
//                 "attr1": "Ab",
//                 "attr2": 2,
//                 "attr3": [0, 1],
//                 "attr4": {
//                    "Ab1": {
//                       "attr23": "Ab1",
//                       "attr231": 22,
//                       "attr1313": true,
//                       "attri32": "@23449|ar|a#"
//                    }
//                 }
//              }
//           }
//        }
//     ],
//     "map": {
//        "map0_1": {
//           "attr1": "Ab",
//           "attr2": 2,
//           "attr3": [0, 1],
//           "attr4": {
//              "Ab1": {
//                 "attr23": "Ab1",
//                 "attr231": 22,
//                 "attr1313": "@23456|a|t#",
//                 "attri32": "2024-12-20 12:40:13"
//              }
//           }
//        },
//        "map1": {
//           "false": {
//              "attr12": "Abc",
//              "attr23": 23,
//              "attr33": false,
//              "attr43": {
//                 "true": {
//                    "attr2312": "Ab1",
//                    "attr23146": 22,
//                    "attr131375": true,
//                    "attri32123": "2024-12-20 12:40:13"
//                 }
//              },
//              "attrMapofMap": {
//                 "22": {
//                    "type1": "Ab1",
//                    "type2": 22,
//                    "attr131375": true,
//                    "attri32123": "2024-12-20 12:40:13"
//                 }
//              }
//           }
//        },
//        "map3": {
//           "Abc": {
//              "attr12": "Abc",
//              "attr23": 23,
//              "attr33": false,
//              "attr43": {
//                 "dateKey": {
//                    "attr2312": "Ab1",
//                    "attr23146": 22,
//                    "attr131375": true,
//                    "attri32123": "2024-12-20 12:40:13"
//                 }
//              },
//              "attr Mapof Map": {
//                 "true": {
//                    "type1": "Ab1",
//                    "type2": 22,
//                    "attr131375": true,
//                    "attri32123": {
//                       "arrayAB": {
//                          "bal1": ["a", "b"],
//                          "bal2": 1234000,
//                          "bal3": 0.3344,
//                          "bal4": {
//                             "0.321": {
//                                "typq1": 0.321,
//                                "type2": 4234,
//                                "typ3": true,
//                                "type4": [true, false]
//                             }
//                          }
//                       }
//                    }
//                 }
//              }
//           }
//        }
//     }
//  }`,
//    },
   // {
   //    attrName: "Object 2",
   //    value: `{
   //  "attr1": [2020, 2022],
   //  "attr2": 23,
   //  "attr3": "ab",
   //  "attr5": {
   //    "attr1": [2020, 2022],
   //    "attr2": 23,
   //    "attr3": "ab"
   //    },
   //    "attr6": {
   //     "attr1": [2020, 2022],
   //    "attr2": 23,
   //    "attr3": {
   //     "attr1": [2020, 2022],
   //    "attr2": 23,
   //    "attr3": "ab"
   //    }
   //    }
   //  }`,
   // },
   // {
   //    attrName: "Object 3",
   //    value: `{
   //    "attr1": [2020, 2022],
   //    "attr2": 23,
   //    "attr3": "ab"
   //    }`,
   // },
   {
      attrName: "Object 4",
      value: `[
      0,1
        ]`,
   },
   {
      attrName: "Object 5",
      value: `
   [
     {
     "attrLong": 12,
     "attListLong": [23,23],
     "attriSingle": "A",
     "attriListSingle": ["a", "b"]
     }
   ]
   `,
   },
];
