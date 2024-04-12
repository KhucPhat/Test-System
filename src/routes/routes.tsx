import Test from "@/Test/Test";
import MainLayout from "@/layout/MainLayout";
import { AddNewTest, Catalog, Definition, Execution, Home, TestCase, TestSystem } from "@/pages";
import { Route, Routes, createBrowserRouter } from "react-router-dom";

// const RoutesApp = () => {
//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route index element={<Home />} path="/"></Route>
//         <Route element={<Catalog />} path="/catalog/:key"></Route>
//         <Route element={<Definition />} path="/definition/:key"></Route>
//         <Route element={<TestCase />} path="/test-case/:key"></Route>
//         <Route element={<Execution />} path="/execution"></Route>
//         <Route element={<Test />} path="/test"></Route>
//       </Route>
//     </Routes>
//   );
// };

// export default RoutesApp;
// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       { index: true, element: <Home /> },
//       { 
//         path: "catalog/:key",
//          element: <Catalog /> ,
//          children: [
//           { path: "test-system-add", element: <TestSystem /> },
//          ]
//         },
//       { path: "definition/:key", element: <Definition /> },
//       { path: "test-case/:key", element: <TestCase /> },
//       { path: "execution", element: <Execution /> },
//       { path: "test", element: <Test /> }
//     ]
//   }
// ]);

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'catalog',
        Component: Catalog,
        children: [
          {
            path: 'item/:id',
            Component: TestSystem,
          },
        ],
      },
      { path: "definition/:key", Component: Definition  },
      { path: "test-case/:key", Component: TestCase  },
      { path: "execution", Component: Execution },
      { path: "test", Component: Test  }
    ],
  },
]);
