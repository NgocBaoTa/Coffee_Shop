/** @format */

import React, { useEffect, useContext, useState } from "react";
import "./wishlist.css";
import Nav from "../../components/header/Nav";
import { LoginContext } from "../../context/AuthContext";
import axios from "axios";
import { AlertContext } from "../../context/AlertContext";

import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ContentModal from "../../components/content_modal/ContentModal";
import SingleCard from "../../components/single_card/SingleCard";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function Wishlist() {
  const {
    openAddCart,
    openAlertLogin,
    handleCloseAddCart,
    handleCloseAlertLogin,
    setOpenAlertLogin,
    setOpenAddCart,
  } = useContext(AlertContext);

  const { wishlist, setWishList, setCart } = useContext(LoginContext);
  const [products, setProducts] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      let data = await axios.get(
        "/products"
        // "https://coffee-shop-ony3.onrender.com/products?categoryName=Product"
      );

      let productArr = [];
      user.wishlist.forEach((item) => {
        const product = data.data.find((p) => p._id === item);
        if (product) {
          product.isLiked = true;
          productArr.push(product);
        }
      });

      setProducts(productArr);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [wishlist]);

  console.log(products);

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

  return (
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
      <div className="wishlist_header">
        <Nav />
      </div>
      <div className="wishlist_container grid wide">
        <div className="wishlist_heading">Wishlist</div>
        <div className="wishlist_main">
          <div className="coffee_menu_container">
            <div className="coffee_menu--heading">
              <hr className="coffee_menu--heading-icon" />
              <div className="coffee_menu--heading-text">COFFEE</div>
              <hr className="coffee_menu--heading-icon" />
            </div>
            <div className="coffee_menu--main">
              {products.map((item, index) => {
                if (item.categoryName === "Coffee") {
                  return (
                    <div className="coffee_menu--item" key={item._id}>
                      <div className="coffee_menu--item-info">
                        <ContentModal
                          src={item.productImage}
                          name={item.productName}
                          price={item.productPrice}
                          description={item.productDescription.description}
                          story={item.productDescription.story}
                          details={item.productDescription.details}
                          isLiked={item.isLiked}
                          handleLikedClick={handleLikedClick}
                          id={item.id}
                          index={index}
                          handleClickCart={handleClickCart}
                          productSold={item.productSold}
                          productQuantity={item.productQuantity}
                        >
                          <div className="coffee_menu--item-main">
                            <img
                              className="coffee_menu--item-img"
                              src={item.productImage}
                              alt="coffee"
                            />
                            <div className="coffee_menu--item-desc">
                              <div className="coffee_menu--item-name">
                                {item.productName}
                              </div>
                              <div className="coffee_menu--item-text">
                                {item.productDescription.description}
                              </div>
                            </div>
                          </div>
                        </ContentModal>

                        <div className="coffee_menu--item-group">
                          <div className="coffee_menu--item-price">
                            ${item.productPrice.toFixed(2)}
                          </div>
                          <div className="coffee_menu--item-icon">
                            <ShoppingCartCheckoutRoundedIcon
                              className="singleCard_icon--cart"
                              onClick={() => {
                                handleClickCart(item.id, 1);
                              }}
                            />
                            {item.isLiked ? (
                              <FavoriteRoundedIcon
                                className="singleCard_icon--loved"
                                onClick={() => {
                                  handleLikedClick(item.id, index);
                                }}
                              />
                            ) : (
                              <FavoriteBorderRoundedIcon
                                className="singleCard_icon--love"
                                onClick={() => {
                                  handleLikedClick(item.id, index);
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <hr className="coffee_menu--item-line" />
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className="pastry_container">
            <div className="pastry_heading">
              <hr className="pastry_heading--icon" />
              <div className="pastry_heading--text">PASTRIES</div>
              <hr className="pastry_heading--icon" />
            </div>

            <div className=" grid wide">
              <div className="pastry_main">
                {products.map((item, index) => {
                  if (item.categoryName === "Pastries") {
                    return (
                      <SingleCard
                        id={item._id}
                        src={item.productImage}
                        name={item.productName}
                        price={item.productPrice.toFixed(2)}
                        key={item._id}
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
                  }
                })}
              </div>
            </div>
          </div>

          <div className="pastry_container">
            <div className="pastry_heading">
              <hr className="pastry_heading--icon" />
              <div className="pastry_heading--text">PRODUCT</div>
              <hr className="pastry_heading--icon" />
            </div>

            <div className=" grid wide">
              <div className="pastry_main">
                {products.map((item, index) => {
                  if (item.categoryName === "Product") {
                    return (
                      <SingleCard
                        id={item._id}
                        src={item.productImage}
                        name={item.productName}
                        price={item.productPrice.toFixed(2)}
                        key={item._id}
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
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
