/** @format */

import React from "react";
import "./menu.css";
import Header from "./header/Header";
import CoffeeMenu from "./coffee_menu/CoffeeMenu";
import BestSeller from "./best_seller/BestSeller";
import Pastry from "./pastry/Pastry";
import Footer from "../../components/footer/Footer";

function Menu() {
  return (
    <div className="menu_container">
      <Header />
      <CoffeeMenu />
      <BestSeller />
      <Pastry />
      <Footer />
    </div>
  );
}

export default Menu;
