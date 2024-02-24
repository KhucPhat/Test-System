import Test from "@/Test/Test";
import MainLayout from "@/layout/MainLayout";
import { Catalog, Definition, Execution, Home, TestCase } from "@/pages";
import { Route, Routes } from "react-router-dom";

const RoutesApp = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} path="/"></Route>
        <Route element={<Catalog />} path="/catalog/:key"></Route>
        <Route element={<Definition />} path="/definition/:key"></Route>
        <Route element={<TestCase />} path="/test-case/:key"></Route>
        <Route element={<Execution />} path="/execution"></Route>
        <Route element={<Test />} path="/test"></Route>
      </Route>
    </Routes>
  );
};

export default RoutesApp;
