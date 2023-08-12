/** @format */

import React from "react";
import "./menu.css";
import CoffeeMenu from "./coffee_menu/CoffeeMenu";
import BestSeller from "./best_seller/BestSeller";
import Pastry from "./pastry/Pastry";
import Footer from "../../components/footer/Footer";
import Nav from "../../components/header/Nav";

function Menu() {
  return (
    <div className="menu_container">
      <div className="menu_header--img">
        <div className="menu_header--nav">
          <Nav />
        </div>
      </div>
      <CoffeeMenu />
      <BestSeller />
      <Pastry />
      <Footer />
    </div>
  );
}

export default Menu;
