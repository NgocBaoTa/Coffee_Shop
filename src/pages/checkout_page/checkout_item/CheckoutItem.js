/** @format */

import React from "react";
import "./checkout_item.css";

function Checkout_item(props) {
  return (
    <>
      <div className="checkout_item--container">
        <img
          className="checkout_item--img l-2-4 c-3 col"
          src={props.src}
          alt="coffee"
        />
        <div className="checkout_item--name l-5-4 m-5 c-0 col">
          {props.name}
        </div>
        <div className="checkout_item--quantity col l-2  m-2-5 c-0">
          {props.quantity}
        </div>
        <div className="checkout_item--price col l-2 m-2 c-0">
          ${props.price * props.quantity}
        </div>

        <div className="checkout_item--main l-0 m-0 c-8 col">
          <div className="checkout_item--name col">{props.name}</div>
          <div className="checkout_item--detail col">
            <div className="checkout_item--price col">${props.price}</div>
            <div className="checkout_item--qnt col">x{props.quantity}</div>
          </div>
        </div>
      </div>
      <hr className="checkout_item--line" />
    </>
  );
}

export default Checkout_item;
