/** @format */
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/css/grid.css";
import "./assets/css/base.css";
import Home from "./pages/home_page/Home";
import Menu from "./pages/menu/Menu";
import Product from "./pages/product/Product";
import About from "./pages/about_page/About";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/product" element={<Product />} />
      <Route path="/about" element={<About />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
    </Routes>
  );
}

export default App;
