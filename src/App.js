/** @format */
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/css/grid.css";
import "./assets/css/base.css";
import Home from "./components/home_page/Home";
import Menu from "./components/menu/Menu";
import Product from "./components/product/Product";
import About from "./components/about_page/About";
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
