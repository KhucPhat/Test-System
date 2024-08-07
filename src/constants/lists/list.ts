import {
  faBook,
  faDatabase,
  faGears,
  faHouseUser,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";

export const sidebarLinks = [
  {
    id: "catalog",
    label: "Catalog",
    icon: faTableCellsLarge,
    link: "/catalog/test-system",
  },
  {
    id: "definition",
    label: "Definition",
    icon: faBook,
    link: "/definition/element-definition",
  },
  {
    id: "test-case",
    label: "Test Case",
    icon: faDatabase,
    link: "/test-case/test-case",
  },
  {
    id: "execution",
    label: "Execution",
    icon: faGears,
    link: "/execution",
  },
];

export const listCatalog = [
  {
    id: "test-system",
    label: "Test System Object",
    link: "/catalog/test-system",
    icon: faHouseUser,
  },
  {
    id: "module",
    label: "Module",
    link: "/catalog/module",
    icon: faTableCellsLarge,
  },
  {
    id: "event-type",
    label: "Event Type",
    link: "/catalog/event-type",
    icon: faDatabase,
  },
];

export const listDefinition = [
  {
    id: "element-definition",
    label: "Test Data Element Definition",
    link: "/definition/element-definition",
    icon: faDatabase,
  },
  {
    id: "data-definition",
    label: "Test Data Definition",
    link: "/definition/data-definition",
    icon: faTableCellsLarge,
  },
  {
    id: "flow-definition",
    label: "Test Flow Definition",
    link: "/definition/flow-definition",
    icon: faGears,
  },
  {
    id: "case-definition",
    label: "Test Case Definition",
    link: "/definition/case-definition",
    icon: faDatabase,
  },
];

export const listTestCase = [
  {
    id: "test-case",
    label: "Test Case",
    link: "/test-case/test-case",
    icon: faHouseUser,
  },
  {
    id: "test-suite",
    label: "Test Suite",
    link: "/test-case/test-suite",
    icon: faTableCellsLarge,
  },
  {
    id: "test-scenario",
    label: "Test Scenario",
    link: "/test-case/test-scenario",
    icon: faDatabase,
  },
];

export listStepTabs = [
  {
    tabId: 11221,
    tabName: "step1",
    hasTab: true,
    childTabs: [
      {
        tabId: 333333,
        tabName: "req1",
        listDataCharSpec : [
          {
            charId: 890000,
            parentId: 333333,
            apiName: 'adadad',
            value: "true",
          },
            {
            charId: 8900055,
            parentId: 333333,
            apiName: 'test',
            value: "2334444",
          }
        ],
         listTagName: [
      {
        compaInfo: {
          id: 2,
          stepName: "step1",
          requestName: "req1",
          tabName: "tag2",
          charSpecUse: [
            {
               charSpecId: 1222,
              value: "true",
              referId: 12223
            }
          ]
        }
      }
    ],
        tabType: "request"
      },
       {
        tabId: 333334,
        tabName: "req2",
        listDataCharSpec : [
          {
            charId: 890001,
            parentId: 333334,
            apiName: 'bal',
            value: "false",
          }
        ],
          listTagName: [
      {
        compaInfo: {
          id: 23,
          stepName: "step1",
          requestName: "req2",
          tabName: "tag23",
          charSpecUse: [
            {
               charSpecId: 122244,
              value: "1312313",
              referId: 12223
            }
          ]
        }
      }
    ],
        tabType: "request"
      },
    ],
  },
  {
    tabId: 112245,
    tabName: "step2",
    hasTab: true,
    childTabs: [
      {
        tabId: 333383,
        tabName: "req21",
        listDataCharSpec : [
          {
            charId: 880000,
            parentId: 333383,
            apiName: 'adadad',
            value: "true",
          },
            {
            charId: 880255,
            parentId: 333383,
            apiName: 'test12',
            value: "2334444",
          }
        ],
         tabType: "request"
      },
       {
        tabId: 233323,
        tabName: "req2",
        listDataCharSpec : [
          {
            charId: 890001,
            parentId: 233323,
            apiName: 'bal223',
            value: "false",
          }
        ],
          tabType: "request"
      },
    ]
  }
];

export const stepsPopup = [
  {
    stepName: 'step1',
    id: 1222,
    childTabs: [
      {
        attrTag: [
          {
            name: 'tag1',
            listValue:[
               {
            charId: 890001,
            parentId: 233323,
            apiName: 'bal223',
            value: "false",
          }
            ]
          }
        ],
        charSpecList: [
           {
            charId: 800201,
            parentId: 1223,
            apiName: '1tabse1',
            value: "12222",
          }
        ]
      },
      {
        attrTag: [
          {
            name: 'tag2',
            listValue:[]
          },
          {
            name: 'tag3',
            listValue:[]
          }
        ],
        charSpecList: []
      }
    ]
  },
  {
    stepName: "step2",
    id: 1223,
    childTabs: [
      {
            name: 'comp1',
            listValue:[
               {
            charId: 890001,
            parentId: 233323,
            apiName: 'bal223',
            value: "false",
          }
            ]
      },
       {
            name: 'comp2',
            listValue:[]
      }
    ]
  }
]
