import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UsersPage from "./pages/users/UsersPage";
import ProductsPage from "./pages/products/ProductsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
