/** @format */

import React, { useState, useContext, useEffect } from "react";
import "./checkout.css";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/header/Nav";
import CheckoutItem from "./checkout_item/CheckoutItem";
import axios from "axios";
import { LoginContext } from "../../context/AuthContext";
import { Support } from "../../Support";
import AlertMsg from "../../components/AlertMsg";

function Checkout() {
  const {
    handleCloseAddCart,
    handleCloseAlertLogin,
    handleClickCart,
    openAddCart,
    openAlertLogin,
    setOpenAlertLogin,
  } = Support();

  const navigate = useNavigate();
  const { cart, setCart, setWishList } = useContext(LoginContext);
  const [invalidFields, setInvalidFields] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    postalCode: "",
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
    if (shippingInfo.name.length === 0) invalidField.push("name");
    if (shippingInfo.address.length === 0) invalidField.push("address");
    if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
        shippingInfo.phone
      )
    ) {
      invalidField.push("phone");
    }
    if (
      !/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(
        shippingInfo.postalCode
      )
    ) {
      invalidField.push("postalCode");
    }
    if (paymentInfo.cardHolder.length === 0) invalidField.push("cardHolder");
    if (paymentInfo.method.length === 0) invalidField.push("method");
    if (paymentInfo.cardNumber.length !== 19) invalidField.push("cardNumber");
    if (paymentInfo.cvc.length !== 3 || typeof +paymentInfo.cvc !== "number")
      invalidField.push("cvc");
    if (paymentInfo.expireDate.length !== 0) {
      const [month, year] = paymentInfo.expireDate.split("/");
      const currentYear = new Date().getFullYear() % 100;

      const isMonthValid = /^[01]\d$/.test(month);
      const isYearValid =
        /^\d\d$/.test(year) && parseInt(year, 10) >= currentYear;
      let isValid = isMonthValid && isYearValid;
      if (!isValid) invalidField.push("expireDate");
    } else {
      invalidField.push("expireDate");
    }

    return invalidField;
  };

  let checkoutProducts = user.checkoutProduct;

  let product = checkoutProducts.map(({ id, noOfItems }) => ({
    productID: id,
    noOfItems,
  }));

  let subtotal = checkoutProducts.reduce((total, item) => {
    return total + item.noOfItems * item.productPrice;
  }, 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setInvalidFields(() => checkValidation());
    try {
      if (checkValidation().length === 0) {
        const data = await axios.post(
          "https://coffee-shop-5r5c.onrender.com/orders",
          // "/orders",
          {
            customerID: user.userID,
            orderReceiver: shippingInfo.name,
            orderProducts: product,
            orderAddress: shippingInfo.address,
            orderPostalCode: shippingInfo.postalCode,
            orderPhone: +shippingInfo.phone,
            orderPayMethod: paymentInfo.method,
            orderCardholder: paymentInfo.cardHolder,
            orderCardNumber: +paymentInfo.cardNumber,
            orderExpireDate: paymentInfo.expireDate,
            orderCVC: +paymentInfo.cvc,
            orderSubtotal: subtotal,
          }
        );

        checkoutProducts.forEach(async (product) => {
          let quantity = product.productQuantity;
          let sold = product.productSold;
          await axios.put(
            `https://coffee-shop-5r5c.onrender.com/products/${product.id}`,
            {
              productQuantity: quantity - product.noOfItems,
              productSold: sold + product.noOfItems,
            }
          );
        });

        const updatedCart = cart.filter(
          (item) => !product.some((p) => p.productID === item.productID)
        );

        setCart(updatedCart);
        const updatedUser = { ...user, checkoutProduct: [], cart: updatedCart };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        document.querySelector(".checkout_shipping--form").reset();
        document.querySelector(".checkout_payment--form").reset();
        navigate("/");
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          console.log(e.response.data);
        }
      }
    }
  };

  //===================================================================

  useEffect(() => {
    if (user) {
      user.wishlist.forEach((item) => {
        const product = checkoutProducts.find((p) => p._id === item);
        if (product) {
          product.isLiked = true;
        }
      });

      checkoutProducts.forEach((item) => {
        if (!item.isLiked) {
          item.isLiked = false;
        }
      });
    }
  }, []);

  const handleLikedClick = (id, index) => {
    if (user) {
      setWishList((prevWishlist) => {
        const newWishlist = [...prevWishlist];

        if (checkoutProducts[index].isLiked === false) {
          checkoutProducts[index].isLiked = true;
          newWishlist.push(id);
        } else {
          checkoutProducts[index].isLiked = false;
          const indexToRemove = newWishlist.indexOf(id);
          if (indexToRemove !== -1) {
            newWishlist.splice(indexToRemove, 1);
          }
        }

        const updatedUser = { ...user, wishlist: newWishlist };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        return newWishlist;
      });
    } else {
      setOpenAlertLogin(true);
    }
  };

  return (
    <>
      <AlertMsg
        openAddCart={openAddCart}
        openAlertLogin={openAlertLogin}
        handleCloseAddCart={handleCloseAddCart}
        handleCloseAlertLogin={handleCloseAlertLogin}
      />

      <div className="checkout_header">
        <Nav />
      </div>
      <div className="checkout_container grid wide">
        <div className="checkout_heading">Checkout</div>
        <div className="checkout_main">
          <div className="l-5 m-12 c-12">
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
                        if (invalidFields.includes("name")) {
                          let newArr = invalidFields.filter(
                            (field) => field !== "name"
                          );
                          setInvalidFields(newArr);
                          document
                            .querySelector('input[name="name"]')
                            .classList.remove("invalid");
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
                        if (invalidFields.includes("phone")) {
                          let newArr = invalidFields.filter(
                            (field) => field !== "phone"
                          );
                          setInvalidFields(newArr);
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
                          address: e.target.value,
                        });
                        if (invalidFields.includes("address")) {
                          let newArr = invalidFields.filter(
                            (field) => field !== "address"
                          );
                          setInvalidFields(newArr);
                          document
                            .querySelector('input[name="address"]')
                            .classList.remove("invalid");
                        }
                      }}
                    />
                  </div>

                  <div className="checkout_shipping--item">
                    <input
                      required
                      type="text"
                      maxLength={7}
                      className={
                        invalidFields.includes("postalCode")
                          ? "invalid checkout_shipping--input"
                          : "checkout_shipping--input"
                      }
                      placeholder="Postal Code"
                      value={shippingInfo.postalCode}
                      name="postalCode"
                      onChange={(e) => {
                        setShippingInfo({
                          ...shippingInfo,
                          postalCode: e.target.value.trim().toUpperCase(),
                        });
                        if (invalidFields.includes("postalCode")) {
                          let newArr = invalidFields.filter(
                            (field) => field !== "postalCode"
                          );
                          setInvalidFields(newArr);
                          document
                            .querySelector('input[name="postalCode"]')
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
                      <label htmlFor="checkout_debit_card">Debit card</label>
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
                      <label htmlFor="checkout_credit_card">Credit card</label>
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
                          let newArr = invalidFields.filter(
                            (field) => field !== "cardHolder"
                          );
                          setInvalidFields(newArr);
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
                      type="number"
                      className={
                        invalidFields.includes("cardNumber")
                          ? "invalid checkout_payment--input checkout_payment--cardNumber"
                          : "checkout_payment--input checkout_payment--cardNumber"
                      }
                      value={paymentInfo.cardNumber}
                      name="cardNumber"
                      onChange={(e) => {
                        setPaymentInfo({
                          ...paymentInfo,
                          cardNumber: e.target.value.trim(),
                        });
                        if (invalidFields.includes("cardNumber")) {
                          let newArr = invalidFields.filter(
                            (field) => field !== "cardNumber"
                          );
                          setInvalidFields(newArr);
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
                            let newArr = invalidFields.filter(
                              (field) => field !== "expireDate"
                            );
                            setInvalidFields(newArr);
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
                            let newArr = invalidFields.filter(
                              (field) => field !== "cvc"
                            );
                            setInvalidFields(newArr);
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

          <div className="l-7 m-12 c-12">
            <div className="checkout_main--right col">
              <div className="checkout_product--info">
                <div className="checkout_product--heading">Products</div>
                <div className="checkout_product--header">
                  <div className="checkout_header--image col l-2-4 m-2"></div>
                  <div className="checkout_header--name col l-5-4 m-5-5">
                    Product
                  </div>
                  <div className="checkout_product--quantity col l-2 m-2 c-0">
                    Quantity
                  </div>
                  <div className="checkout_product--price col l-2 m-2 c-0">
                    Price
                  </div>
                </div>
                <hr />
                <div className="checkout_product--list">
                  {checkoutProducts.map((item, index) => {
                    return (
                      <CheckoutItem
                        key={item._id}
                        src={item.productImage}
                        name={item.productName}
                        quantity={item.noOfItems}
                        id={item._id}
                        price={item.productPrice.toFixed(2)}
                        isLiked={item.isLiked ? item.isLiked : false}
                        description={
                          item.productDescription.description
                            ? item.productDescription.description
                            : null
                        }
                        story={
                          item.productDescription.story
                            ? item.productDescription.story
                            : null
                        }
                        details={
                          item.productDescription.details
                            ? item.productDescription.details
                            : null
                        }
                        productQuantity={item.productQuantity}
                        productSold={item.productSold}
                        handleLikedClick={handleLikedClick}
                        index={index}
                        handleClickCart={handleClickCart}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="checkout_summary--info">
                <div className="checkout_summary--space col l-8 m-8 c-5"></div>
                <div className="checkout_summary--main col l-4 m-4 c-7">
                  <div className="checkout_summary--subtotal checkout_summary--item">
                    <span className="checkout_summary--text col l-5 m-5 c-5">
                      Subtotal
                    </span>
                    <span className="checkout_summary--value col l-7 m-7 c-7">
                      : &nbsp; $ {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="checkout_summary--tax checkout_summary--item">
                    <span className="checkout_summary--text col l-5 m-5 c-5">
                      Tax
                    </span>
                    <span className="checkout_summary--value col l-7 m-7 c-7">
                      : &nbsp; $ {(subtotal * 0.13).toFixed(2)}
                    </span>
                  </div>
                  <div className="checkout_summary--total checkout_summary--item">
                    <span className="checkout_summary--text col l-5 m-5 c-5">
                      Total
                    </span>
                    <span className="checkout_summary--value col l-7 m-7 c-7">
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
