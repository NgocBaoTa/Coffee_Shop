/** @format */

import React from "react";
import Nav from "./Nav";
import "./header.css";
import "../../assets/css/grid.css";
import Box from "./Box";

function Header() {
  return (
    <div className="header_img">
      <div className="header_bg">
        <div className="grid wide container">
          <Nav />
          <Box />
        </div>
      </div>
    </div>
  );
}

export default Header;
