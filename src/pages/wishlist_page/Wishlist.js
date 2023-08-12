/** @format */

import React, { useEffect, useContext, useState } from "react";
import "./wishlist.css";
import Nav from "../../components/header/Nav";
import { LoginContext } from "../../context/AuthContext";
import axios from "axios";
import { Support } from "../../Support";
import AlertMsg from "../../components/AlertMsg";

import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ContentModal from "../../components/content_modal/ContentModal";
import SingleCard from "../../components/single_card/SingleCard";

function Wishlist() {
  const { wishlist } = useContext(LoginContext);
  const [products, setProducts] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));
  const {
    handleCloseAddCart,
    handleCloseAlertLogin,
    handleClickCart,
    handleLikedClick,
    openAddCart,
    openAlertLogin,
  } = Support();

  const fetchData = async () => {
    try {
      let data = await axios.get(
        "https://coffee-shop-5r5c.onrender.com/products"

        // "/products"
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

  return (
    <div>
      <AlertMsg
        openAddCart={openAddCart}
        openAlertLogin={openAlertLogin}
        handleCloseAddCart={handleCloseAddCart}
        handleCloseAlertLogin={handleCloseAlertLogin}
      />

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
                          products={products}
                          setProducts={setProducts}
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
                        products={products}
                        setProducts={setProducts}
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
                        products={products}
                        setProducts={setProducts}
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
