import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductLayout from "./layouts/ProductLayout";
import ProductsView from "./views/ProductsView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProductLayout />}>
          <Route path="/" element={<ProductsView />} index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
