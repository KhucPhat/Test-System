import Test from "@/Test/Test";
import MainLayout from "@/layout/MainLayout";
import {
  Catalog,
  Definition,
  Execution,
  Home,
  TestCase,
  TestSystem,
} from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "catalog",
        Component: Catalog,
        children: [
          {
            path: "item",
            Component: TestSystem,
          },
        ],
      },
      { path: "definition/:key", Component: Definition },
      { path: "test-case/:key", Component: TestCase },
      { path: "execution", Component: Execution },
      { path: "test", Component: Test },
    ],
  },
]);
