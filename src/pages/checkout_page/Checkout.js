/** @format */

import React, { useState, useContext, useEffect } from "react";
import "./checkout.css";
import Nav from "../../components/header/Nav";
import CheckoutItem from "./checkout_item/CheckoutItem";
import axios from "axios";
import { LoginContext } from "../../context/AuthContext";

function Checkout() {
  const { userID } = useContext(LoginContext);
  const [invalidFields, setInvalidFields] = useState([]);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: "",
    cardHolder: "",
    cardNumber: "",
    expireDate: "",
    cvc: "",
  });

  const checkValidation = () => {
    let invalidField = [];
    if (shippingInfo.name.length === 0) invalidFields.push("name");
    if (shippingInfo.address.length === 0) invalidFields.push("address");
    if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
        shippingInfo.phone
      )
    )
      invalidFields.push("phone");
    if (paymentInfo.cardHolder.length === 0) invalidFields.push("cardHolder");
    if (paymentInfo.method.length === 0) invalidFields.push("method");
    if (paymentInfo.cardNumber.length !== 19) invalidFields.push("cardNumber");
    if (paymentInfo.cvc.length !== 3 || typeof +paymentInfo.cvc !== "number")
      invalidFields.push("cvc");
    if (paymentInfo.expireDate.length !== 0) {
      const [month, year] = paymentInfo.expireDate.split("/");
      const currentYear = new Date().getFullYear() % 100;

      const isMonthValid = /^[01]\d$/.test(month);
      const isYearValid =
        /^\d\d$/.test(year) && parseInt(year, 10) >= currentYear;

      let isValid = isMonthValid && isYearValid;
      if (!isValid) invalidFields.push("expireDate");
    } else {
      invalidFields.push("expireDate");
    }

    return invalidField;
  };

  let checkoutProducts = JSON.parse(
    localStorage.getItem("user")
  ).checkoutProduct;

  let products = checkoutProducts.map(({ id, noOfItems }) => ({
    id,
    noOfItems,
  }));

  let subtotal = checkoutProducts.reduce((total, item) => {
    return total + item.noOfItems * item.productPrice;
  }, 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      setInvalidFields(checkValidation());
      console.log("Invalid fields: ", invalidFields);
      if (invalidFields.length !== 0) {
        invalidFields.forEach((field) => {
          document
            .querySelector(`input[name=${field}]`)
            .classList.add("invalid");
        });
      } else {
        const data = await axios.post("/orders", {
          customerID: userID,
          orderProducts: products,
          orderAddress: shippingInfo.address,
          orderPhone: +shippingInfo.phone,
          orderPayMethod: paymentInfo.method,
          orderCardholder: paymentInfo.cardHolder,
          orderCardNumber: +paymentInfo.cardNumber,
          orderExpireDate: paymentInfo.expireDate,
          orderCVC: +paymentInfo.cvc,
          orderSubtotal: subtotal,
        });

        console.log("DATA: ", data.data);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          console.log(e.response.data);
        }
      }
    }
  };

  useEffect(() => {
    console.log("fields: ", invalidFields);
  }, [invalidFields]);

  return (
    <>
      <div className="checkout_header">
        <Nav />
      </div>
      <div className="checkout_container grid wide">
        <div className="checkout_heading">Checkout</div>
        <div className="checkout_main">
          <div className="l-5">
            <div className="checkout_main--left col">
              <div className="checkout_shipping--info">
                <div className="checkout_shipping--heading">
                  Shipping Information
                </div>

                <form className="checkout_shipping--form">
                  <div className="checkout_shipping--item">
                    <input
                      required
                      autoFocus
                      type="text"
                      className={
                        invalidFields.includes("name")
                          ? "invalid checkout_shipping--input"
                          : "checkout_shipping--input"
                      }
                      placeholder="Name"
                      name="name"
                      value={shippingInfo.name}
                      onChange={(e) => {
                        setShippingInfo({
                          ...shippingInfo,
                          name: e.target.value.trim(),
                        });
                        console.log("test: ", invalidFields);
                        if (invalidFields.includes("name")) {
                          // let newArr = invalidFields.filter(
                          //   (field) => field !== "name"
                          // );
                          // invalidFields = newArr;
                          // document
                          //   .querySelector('input[name="name"]')
                          //   .classList.remove("invalid");
                        }
                      }}
                    />
                  </div>

                  <div className="checkout_shipping--item">
                    <input
                      required
                      type="number"
                      className={
                        invalidFields.includes("phone")
                          ? "invalid checkout_shipping--input checkout_shipping--phone"
                          : "checkout_shipping--input checkout_shipping--phone"
                      }
                      placeholder="Phone"
                      value={shippingInfo.phone}
                      name="phone"
                      onChange={(e) => {
                        setShippingInfo({
                          ...shippingInfo,
                          phone: e.target.value.trim(),
                        });
                        console.log(invalidFields);
                        if (invalidFields.includes("phone")) {
                          let newArr = invalidFields.filter(
                            (field) => field !== "phone"
                          );
                          invalidFields = newArr;
                          document
                            .querySelector('input[name="phone"]')
                            .classList.remove("invalid");
                        }
                      }}
                    />
                  </div>

                  <div className="checkout_shipping--item">
                    <input
                      required
                      type="text"
                      className={
                        invalidFields.includes("address")
                          ? "invalid checkout_shipping--input"
                          : "checkout_shipping--input"
                      }
                      placeholder="Address"
                      value={shippingInfo.address}
                      name="address"
                      onChange={(e) => {
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value.trim(),
                        });
                        if (invalidFields.includes("address")) {
                          invalidFields = invalidFields.filter(
                            (field) => field !== "address"
                          );
                          document
                            .querySelector('input[name="address"]')
                            .classList.remove("invalid");
                        }
                      }}
                    />
                  </div>
                </form>
              </div>

              <div className="checkout_payment--info">
                <div className="checkout_payment--heading">
                  Payment Information
                </div>

                <form className="checkout_payment--form">
                  <div className="checkout_payment--group-radio">
                    <div className="checkout_payment--radio">
                      <input
                        type="radio"
                        id="checkout_debit_card"
                        value="Debit"
                        name="method"
                        onChange={(e) => {
                          setPaymentInfo({
                            ...paymentInfo,
                            method: e.target.value,
                          });
                        }}
                      />
                      <label for="checkout_debit_card">Debit card</label>
                    </div>

                    <div className="checkout_payment--radio">
                      <input
                        type="radio"
                        id="checkout_credit_card"
                        value="Credit"
                        name="method"
                        onChange={(e) => {
                          setPaymentInfo({
                            ...paymentInfo,
                            method: e.target.value,
                          });
                        }}
                      />
                      <label for="checkout_credit_card">Credit card</label>
                    </div>
                  </div>
                  <div className="checkout_payment--item">
                    <label className="checkout_payment--label">
                      Cardholder
                    </label>
                    <input
                      required
                      type="text"
                      className={
                        invalidFields.includes("cardHolder")
                          ? "invalid checkout_payment--input"
                          : "checkout_payment--input"
                      }
                      value={paymentInfo.cardHolder}
                      name="cardHolder"
                      onChange={(e) => {
                        setPaymentInfo({
                          ...paymentInfo,
                          cardHolder: e.target.value.trim(),
                        });
                        if (invalidFields.includes("cardHolder")) {
                          invalidFields = invalidFields.filter(
                            (field) => field !== "cardHolder"
                          );
                          document
                            .querySelector('input[name="cardHolder"]')
                            .classList.remove("invalid");
                        }
                      }}
                    />
                  </div>

                  <div className="checkout_payment--item">
                    <label className="checkout_payment--label">
                      Card Number
                    </label>
                    <input
                      required
                      type="text"
                      className={
                        invalidFields.includes("cardNumber")
                          ? "invalid checkout_payment--input"
                          : "checkout_payment--input"
                      }
                      value={paymentInfo.cardNumber}
                      name="cardNumber"
                      onChange={(e) => {
                        setPaymentInfo({
                          ...paymentInfo,
                          cardNumber: e.target.value.trim(),
                        });
                        if (invalidFields.includes("cardNumber")) {
                          invalidFields = invalidFields.filter(
                            (field) => field !== "cardNumber"
                          );
                          document
                            .querySelector('input[name="cardNumber"]')
                            .classList.remove("invalid");
                        }
                      }}
                    />
                  </div>

                  <div className="checkout_payment--group-item">
                    <div className="checkout_payment--item">
                      <label className="checkout_payment--label">
                        Expire Date
                      </label>

                      <input
                        required
                        type="text"
                        className={
                          invalidFields.includes("expireDate")
                            ? "invalid checkout_payment--input"
                            : "checkout_payment--input"
                        }
                        pattern="\d\d/\d\d"
                        maxLength="5"
                        placeholder="MM/YY"
                        value={paymentInfo.expireDate}
                        name="expireDate"
                        onChange={(e) => {
                          const numbersOnly = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 4);
                          const formattedExpiry = numbersOnly.replace(
                            /^(\d\d)(\d\d)$/g,
                            (match, p1, p2) => `${p1}/${p2}`
                          );
                          setPaymentInfo({
                            ...paymentInfo,
                            expireDate: formattedExpiry,
                          });
                          if (invalidFields.includes("expireDate")) {
                            invalidFields = invalidFields.filter(
                              (field) => field !== "expireDate"
                            );
                            document
                              .querySelector('input[name="expireDate"]')
                              .classList.remove("invalid");
                          }
                        }}
                      />
                    </div>
                    <div className="checkout_payment--item">
                      <label className="checkout_payment--label">CVC</label>
                      <input
                        required
                        type="text"
                        maxLength="3"
                        className={
                          invalidFields.includes("cvc")
                            ? "invalid checkout_payment--input"
                            : "checkout_payment--input"
                        }
                        value={paymentInfo.cvc}
                        name="cvc"
                        onChange={(e) => {
                          setPaymentInfo({
                            ...paymentInfo,
                            cvc: e.target.value,
                          });
                          if (invalidFields.includes("cvc")) {
                            invalidFields = invalidFields.filter(
                              (field) => field !== "cvc"
                            );
                            document
                              .querySelector('input[name="cvc"]')
                              .classList.remove("invalid");
                          }
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="l-7">
            <div className="checkout_main--right col">
              <div className="checkout_product--info">
                <div className="checkout_product--heading">Products</div>
                <div className="checkout_product--header">
                  <div className="checkout_header--image col l-2-4"></div>
                  <div className="checkout_header--name col l-5-4">Product</div>
                  <div className="checkout_product--quantity col l-2">
                    Quantity
                  </div>
                  <div className="checkout_product--price col l-2">Price</div>
                </div>
                <hr />
                <div className="checkout_product--list">
                  {checkoutProducts.map((product) => {
                    return (
                      <CheckoutItem
                        key={product._id}
                        src={product.productImage}
                        name={product.productName}
                        quantity={product.noOfItems}
                        price={product.productPrice}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="checkout_summary--info">
                <div className="checkout_summary--space col l-8"></div>
                <div className="checkout_summary--main col l-4">
                  <div className="checkout_summary--subtotal checkout_summary--item">
                    <span className="checkout_summary--text col l-5">
                      Subtotal
                    </span>
                    <span className="checkout_summary--value col l-7">
                      : &nbsp; $ {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="checkout_summary--tax checkout_summary--item">
                    <span className="checkout_summary--text col l-5">Tax</span>
                    <span className="checkout_summary--value col l-7">
                      : &nbsp; $ {(subtotal * 0.13).toFixed(2)}
                    </span>
                  </div>
                  <div className="checkout_summary--total checkout_summary--item">
                    <span className="checkout_summary--text col l-5">
                      Total
                    </span>
                    <span className="checkout_summary--value col l-7">
                      : &nbsp; $ {(subtotal * 1.13).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "end" }}>
                <button className="checkout_button" onClick={handlePlaceOrder}>
                  Place My Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
