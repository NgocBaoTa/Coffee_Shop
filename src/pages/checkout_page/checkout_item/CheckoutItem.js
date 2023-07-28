/** @format */

import React from "react";
import "./checkout_item.css";

function Checkout_item(props) {
  return (
    <>
      <div className="checkout_item--container">
        <img
          className="checkout_item--img l-2-4 m-4 c-3 col"
          src={props.src}
          alt="coffee"
        />
        <div className="checkout_item--name l-5-4 m-12 col">{props.name}</div>
        <div className="checkout_item--quantity col l-2">{props.quantity}</div>
        <div className="checkout_item--price col l-2">
          ${props.price * props.quantity}
        </div>
      </div>
      <hr className="checkout_item--line" />
    </>
  );
}

export default Checkout_item;
