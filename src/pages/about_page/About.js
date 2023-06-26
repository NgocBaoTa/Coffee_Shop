/** @format */

import React from "react";
import "./about.css";
import Header from "./header/Header";
import Story from "./coffee_story/Story";
import Map from "./map/Map";
import Footer from "../../components/footer/Footer";

function About() {
  return (
    <div className="about_container">
      <Header />
      <Story />
      <Map />
      <Footer />
    </div>
  );
}

export default About;
