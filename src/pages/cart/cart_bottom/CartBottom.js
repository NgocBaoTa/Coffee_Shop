/** @format */

import React, { useEffect, useState } from "react";
import "./cartBottom.css";

function CartBottom(props) {
  let user = JSON.parse(localStorage.getItem("user"));
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let total = 0;
    props.chosenProduct.forEach((product) => {
      total += product.noOfItems * product.productPrice;
    });

    setTotalPrice(total.toFixed(2));
  }, [props.chosenProduct]);

  return (
    <div className="cart_bottom--container grid wide">
      <div className="cart_bottom--left">
        <input
          type="checkbox"
          className="cart_bottom--item cart_bottom--checkbox"
          checked={props.chooseAll}
          onChange={props.handleChooseAll}
        />
        <div className="cart_bottom--all">
          Select All ({user.cart.length} products)
        </div>
      </div>

      <div className="cart_bottom--right ">
        <div className="cart_bottom--total">
          Total ({props.chosenProduct.length} products): $ {totalPrice}
        </div>
        <button className="cart_bottom--checkout">Check Out</button>
      </div>
    </div>
  );
}

export default CartBottom;
