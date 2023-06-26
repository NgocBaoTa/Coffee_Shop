/** @format */

import React from "react";
import "./discover.css";
import Button from "../../../components/button/Button";

function Discover() {
  return (
    <div>
      <div className="discover_container grid wide">
        <div className="discover_left l-7 m-7 c-12">
          <div className="discover_heading">Discover the best coffee</div>
          <div className="discover_text">
            Bean Scene is a coffee shop that provides you with quality coffee
            that helps boost your productivity and helps build your mood. Having
            a cup of coffee is good, but having a cup of real coffee is greater.
            There is no doubt that you will enjoy this coffee more than others
            you have ever tasted.
          </div>
          <Button name="Learn More" />
        </div>

        <img
          className="discover_right l-5 m-5 c-0"
          src={require("../../../assets/img/discover.png")}
          alt="discover"
        />
      </div>
    </div>
  );
}

export default Discover;
