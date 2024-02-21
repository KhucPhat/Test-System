import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Catalog from "@/pages/Catalog/Catalog";
import Test from "@/Test/Test";
import Home from "@/pages/Home/Home";
import Definition from "@/pages/Definition/Definition";
import TestCase from "@/pages/TestCase/TestCase";
import Execution from "@/pages/Execution/Execution";

const RoutesApp = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<Home />} path="/"></Route>
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
