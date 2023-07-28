/** @format */

import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import Header from "./cart_header/Header";
import CartItem from "./cart_item/CartItem";
import { LoginContext } from "../../context/AuthContext";
import axios from "axios";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CartBottom from "./cart_bottom/CartBottom";

function Cart() {
  const navigate = useNavigate();
  // ALERT  -  start
  const [openAddCart, setOpenAddCart] = useState(false);
  const [openAlertLogin, setOpenAlertLogin] = useState(false);

  const handleCloseAddCart = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAddCart(false);
  };

  const handleCloseAlertLogin = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertLogin(false);
  };
  // ALERT  -  end

  const { setCart, setWishList, cart } = useContext(LoginContext);
  const [products, setProducts] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));

  const [chosenProduct, setChosenProduct] = useState([]);
  const [chooseAll, setChosenAll] = useState(false);

  const fetchData = async () => {
    try {
      let data = await axios.get(
        "/products?categoryName=Product"
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

  const handleChangeCart = (id, noItem) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];

      newCart.forEach((item, idx) => {
        if (item.productID === id) {
          newCart[idx].no = noItem;
          return;
        }
      });

      const updatedUser = { ...user, cart: newCart };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return newCart;
    });
  };

  const handleDeleteProduct = (id) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];

      newCart.forEach((item, idx) => {
        if (item.productID === id) {
          newCart.splice(idx, 1);
          return;
        }
      });

      const updatedUser = { ...user, cart: newCart };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return newCart;
    });
  };

  const handleLikedClick = (id, index) => {
    if (user) {
      setWishList((prevWishlist) => {
        const newWishlist = [...prevWishlist];
        const newLikedProducts = [...products];

        if (newLikedProducts[index].isLiked === false) {
          newLikedProducts[index].isLiked = true;
          newWishlist.push(id);
        } else {
          newLikedProducts[index].isLiked = false;
          const indexToRemove = newWishlist.indexOf(id);
          if (indexToRemove !== -1) {
            newWishlist.splice(indexToRemove, 1);
          }
        }

        const updatedUser = { ...user, wishlist: newWishlist };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setProducts(newLikedProducts);

        return newWishlist;
      });
    } else {
      setOpenAlertLogin(true);
    }
  };

  const handleClickCart = (id, noItem) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];

      let index = -1;
      newCart.forEach((item, idx) => {
        if (item.productID === id) {
          index = idx;
          return;
        }
      });
      if (index !== -1) {
        newCart[index].no += noItem;
      } else {
        let newProduct = {};
        newProduct.productID = id;
        newProduct.no = noItem;
        newCart.push(newProduct);
      }

      const updatedUser = { ...user, cart: newCart };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return newCart;
    });

    setOpenAddCart(true);
  };

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
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openAddCart}
          onClose={handleCloseAddCart}
          autoHideDuration={6000}
        >
          <Alert
            onClose={handleCloseAddCart}
            severity="success"
            sx={{ width: "100%" }}
          >
            Product is added to cart!
          </Alert>
        </Snackbar>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openAlertLogin}
          onClose={handleCloseAlertLogin}
          autoHideDuration={6000}
        >
          <Alert
            onClose={handleCloseAlertLogin}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Please login to continue!
          </Alert>
        </Snackbar>

        <Header />
        
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
                      item.productDescription.detail
                        ? item.productDescription.detail
                        : null
                    }
                    index={index}
                    noOfItems={item.noOfItems}
                    isChosen={item.isChosen}
                    handleLikedClick={handleLikedClick}
                    handleClickCart={handleClickCart}
                    handleChangeCart={handleChangeCart}
                    handleDeleteProduct={handleDeleteProduct}
                    handleChooseProduct={handleChooseProduct}
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
