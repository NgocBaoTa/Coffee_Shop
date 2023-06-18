/** @format */

import React from "react";
import "./home.css";
import Header from "./header/Header";
import Discover from "./discover_part/Discover";
import Style from "./coffee_style/Style";
import Recommended from "./recommended/Recommended";
import Chance from "./chance_part/Chance";
import Footer from "../footer/Footer";

function Home() {
  return (
    <div className="home_page">
      <Header />
      <Discover />
      <Style />
      <Recommended />
      <Chance />
      <Footer />
    </div>
  );
}

export default Home;
