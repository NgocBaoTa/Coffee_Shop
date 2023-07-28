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
// import Profile from "./pages/profile/Profile";

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
      {login ? <Route path="/cart" element={<Cart />} /> : <></>}
      {login ? <Route path="/checkout" element={<Checkout />} /> : <></>}
      {/* {login ? <Route path="/wishlist" element={<Profile />} /> : <></>} */}
      {/* {login ? <Route path="/orders" element={<Profile />} /> : <></>} */}
      <Route path="*" element={<h2>Page not found</h2>} />
    </Routes>
  );
}

export default App;
