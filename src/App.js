/** @format */
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { LoginContext } from "./context/AuthContext";
import "./assets/css/grid.css";
import "./assets/css/base.css";
import Home from "./pages/home_page/Home";
import Menu from "./pages/menu/Menu";
import Product from "./pages/product/Product";
import About from "./pages/about_page/About";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout_page/Checkout";
import Order from "./pages/order_page/Order";
import Wishlist from "./pages/wishlist_page/Wishlist";

function App() {
  const { login } = useContext(LoginContext);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/product" element={<Product />} />
      <Route path="/about" element={<About />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/cart" element={login ? <Cart /> : <Login />} />
      <Route path="/checkout" element={login ? <Checkout /> : <Login />} />
      <Route path="/orders" element={login ? <Order /> : <Login />} />
      <Route path="/wishlist" element={login ? <Wishlist /> : <Login />} />
      <Route path="*" element={<h2>Page not found</h2>} />
    </Routes>
  );
}

export default App;
