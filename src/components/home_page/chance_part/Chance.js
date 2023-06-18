/** @format */

import React from "react";
import Button from "../../button/Button";
import "./chance.css";

function Chance() {
  return (
    <div className="chance_container ">
      <div className="chance_bg--img">
        <div className="chance_bg"></div>
      </div>
      <div className="chance_main grid wide row">
        <div className="chance_left l-6 m-6 c-6">
          <div className="chance_heading">
            Get a chance to have an Amazing morning
          </div>
          <div className="chance_text">
            We are giving you are one time opportunity to experience a better
            life with coffee.
          </div>
          <div className="chance_btn">
            <Button name="Order Now" />
          </div>
        </div>
        <div className="chance_right l-6 m-6 c-6">
          <div className="chance_coffee--bean"></div>
          <div className="chance_coffee--cup"></div>
        </div>
      </div>
    </div>
  );
}

export default Chance;
