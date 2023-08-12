/** @format */

import React, { useEffect, useState } from "react";
import "./coffee_menu.css";
import axios from "axios";
import ContentModal from "../../../components/content_modal/ContentModal";

import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Support } from "../../../Support";
import { Alert } from "@mui/material";

function CoffeeMenu() {
  const [products, setProducts] = useState([]);
  const {
    handleCloseAddCart,
    handleCloseAlertLogin,
    handleClickCart,
    handleLikedClick,
    openAddCart,
    openAlertLogin,
  } = Support();
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await axios.get(
          "/products?categoryName=Coffee"

          // "https://coffee-shop-ony3.onrender.com/products?categoryName=Coffee"
        );

        if (user) {
          let productArr = data.data;
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
          });
          setProducts(productArr);
        } else {
          setProducts(data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Alert
        openAddCart={openAddCart}
        openAlertLogin={openAlertLogin}
        handleCloseAddCart={handleCloseAddCart}
        handleCloseAlertLogin={handleCloseAlertLogin}
      />

      <div className="coffee_menu_container grid wide">
        <div className="coffee_menu--heading">
          <hr className="coffee_menu--heading-icon" />
          <div className="coffee_menu--heading-text">COFFEE MENU</div>
          <hr className="coffee_menu--heading-icon" />
        </div>

        <div className="coffee_menu--main">
          {products.map((item, index) => {
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
          })}
        </div>
      </div>
    </>
  );
}

export default CoffeeMenu;
