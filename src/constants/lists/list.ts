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
