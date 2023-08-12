/** @format */

import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import CartItem from "./cart_item/CartItem";
import { LoginContext } from "../../context/AuthContext";
import axios from "axios";
import CartBottom from "./cart_bottom/CartBottom";
import { Support } from "../../Support";
import AlertMsg from "../../components/AlertMsg";
import Nav from "../../components/header/Nav";

function Cart() {
  const navigate = useNavigate();
  const {
    handleChangeCart,
    handleCloseAddCart,
    handleCloseAlertLogin,
    handleDeleteProduct,
    handleClickCart,
    handleLikedClick,
    openAddCart,
    openAlertLogin,
  } = Support();

  const { cart } = useContext(LoginContext);
  const [products, setProducts] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));

  const [chosenProduct, setChosenProduct] = useState([]);
  const [chooseAll, setChosenAll] = useState(false);

  const fetchData = async () => {
    try {
      let data = await axios.get(
        "https://coffee-shop-5r5c.onrender.com/products"
        // "/products"
        // "/products?categoryName=Product"
        // "https://coffee-shop-ony3.onrender.com/products?categoryName=Product"
      );

      let productArr = [];
      user.cart.forEach((item) => {
        const product = data.data.find((p) => p._id === item.productID);
        if (product) {
          product.noOfItems = item.no;
          productArr.push(product);
        }
      });

      user.wishlist.forEach((item) => {
        const product = productArr.find((p) => p._id === item);
        if (product) {
          product.isLiked = true;
        }
      });

      productArr.forEach((item) => {
        if (!item.isLiked) {
          item.isLiked = false;
        }
        item.isChosen = false;
      });

      if (chosenProduct.length > 0) {
        setChosenProduct((prev) => {
          let newArr = [...prev];

          let isExist = -1;
          newArr.forEach((product, idx) => {
            let index = productArr.findIndex(
              (item) => item._id === product._id
            );
            if (index !== -1) {
              productArr[index].isChosen = true;
              product.noOfItems = productArr[index].noOfItems;
            } else {
              isExist = idx;
            }
          });

          if (isExist !== -1) {
            newArr.splice(isExist, 1);
          }

          return newArr;
        });
      }

      setProducts(productArr);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cart]);

  // Handle click CHECKBOX  -  START

  const handleChooseAll = (e) => {
    setChosenAll(e.target.checked);

    const productArr = products.map((product) => ({
      ...product,
      isChosen: e.target.checked,
    }));

    if (e.target.checked) {
      setChosenProduct(productArr);
      setProducts(productArr);
    } else {
      setChosenProduct([]);
      setProducts(productArr);
    }
  };

  const handleChooseProduct = (e, index) => {
    let product = products[index];
    if (e.target.checked) {
      product.isChosen = true;
      setChosenProduct((prev) => {
        let productArr = [...prev];
        productArr.push(product);
        if (productArr.length === products.length) {
          setChosenAll(true);
        }
        return productArr;
      });
    } else {
      product.isChosen = false;
      setChosenProduct((prev) => {
        let productArr = [...prev];
        productArr.splice(index, 1);
        if (productArr.length !== products.length) {
          setChosenAll(false);
        }
        return productArr;
      });
    }
  };
  // Handle click CHECKBOX  -  END

  // Add space at the bottom  -  START
  const elRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!elRef?.current?.clientHeight) {
      return;
    }
    setHeight(elRef?.current?.clientHeight);
  }, [elRef?.current?.clientHeight]);
  // Add space at the bottom  -  END

  return (
    <>
      <div>
        <AlertMsg
          openAddCart={openAddCart}
          openAlertLogin={openAlertLogin}
          handleCloseAddCart={handleCloseAddCart}
          handleCloseAlertLogin={handleCloseAlertLogin}
        />

        <div className="cart_bg_nav">
          <Nav />
        </div>

        <div className="cart_container grid wide">
          <div className="cart_table--header">
            <input
              type="checkbox"
              className="cart_header--item cart_table--checkbox col l-1 m-1 c-1"
              onChange={handleChooseAll}
              checked={chooseAll}
            />
            <div className="cart_header--item cart_table--product col l-5 m-5 c-10">
              Product
            </div>
            <div className="cart_header--item cart_table--price col c-0 l-1-5 m-1-5 ">
              Price
            </div>
            <div className="cart_header--item cart_table--quantity col l-2 m-2 c-0">
              Quantity
            </div>
            <div className="cart_header--item cart_table--total col l-2-5 m-2-5 c-0">
              Total
            </div>
            <div className="cart_header--item cart_table--delete col l-0 m-0 c-1"></div>
          </div>

          {cart.length === 0 ? (
            <div className="cart_empty">
              Your cart is empty.{" "}
              <span
                className="cart_ctn_shopping"
                onClick={() => {
                  navigate("/product");
                }}
              >
                Continue shopping.
              </span>
            </div>
          ) : (
            <div className="cart_table--list">
              {products.map((item, index) => {
                return (
                  <CartItem
                    key={item._id}
                    id={item._id}
                    src={item.productImage}
                    name={item.productName}
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
                    index={index}
                    noOfItems={item.noOfItems}
                    productQuantity={item.productQuantity}
                    productSold={item.productSold}
                    isChosen={item.isChosen}
                    handleLikedClick={handleLikedClick}
                    handleClickCart={handleClickCart}
                    handleChangeCart={handleChangeCart}
                    handleDeleteProduct={handleDeleteProduct}
                    handleChooseProduct={handleChooseProduct}
                    products={products}
                    setProducts={setProducts}
                  />
                );
              })}

              <div style={{ height: `${height}px` }}></div>
            </div>
          )}
        </div>

        <div className="cart_bottom" ref={elRef}>
          <CartBottom
            handleChooseAll={handleChooseAll}
            chooseAll={chooseAll}
            chosenProduct={chosenProduct}
          />
        </div>
      </div>
    </>
  );
}

export default Cart;
