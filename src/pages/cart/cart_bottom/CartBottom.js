/** @format */

import React, { useEffect, useState } from "react";
import "./cartBottom.css";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function CartBottom(props) {
  const navigate = useNavigate();
  const [openAlertAddProduct, setOpenAlertAddProduct] = useState(false);

  const handleCloseAlertAddProduct = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertAddProduct(false);
  };
  let user = JSON.parse(localStorage.getItem("user"));
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let total = 0;
    props.chosenProduct.forEach((product) => {
      total += product.noOfItems * product.productPrice;
    });

    setTotalPrice(total.toFixed(2));
  }, [props.chosenProduct]);

  const handleClickCheckOut = () => {
    if (props.chosenProduct.length === 0) {
      setOpenAlertAddProduct(true);
    } else {
      user.checkoutProduct = props.chosenProduct;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/checkout");
    }
  };

  return (
    <div className="cart_bottom--container grid wide">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAlertAddProduct}
        onClose={handleCloseAlertAddProduct}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleCloseAlertAddProduct}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Please choose product to check out!
        </Alert>
      </Snackbar>
      <div className="cart_bottom--left">
        <input
          type="checkbox"
          className="cart_bottom--item cart_bottom--checkbox"
          checked={props.chooseAll}
          onChange={props.handleChooseAll}
        />
        <div className="cart_bottom--all">
          Select All{" "}
          <span className="cart_bottom--number">
            ({user.cart.length} products)
          </span>
        </div>
      </div>

      <div className="cart_bottom--right ">
        <div className="cart_bottom--total">
          Total ({props.chosenProduct.length} products): ${totalPrice}
        </div>
        <button className="cart_bottom--checkout" onClick={handleClickCheckOut}>
          Check Out
        </button>
      </div>
    </div>
  );
}

export default CartBottom;
