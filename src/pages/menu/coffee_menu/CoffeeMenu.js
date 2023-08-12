/** @format */

import React, { useEffect, useState, useContext } from "react";
import "./coffee_menu.css";
import axios from "axios";
import ContentModal from "../../../components/content_modal/ContentModal";
import { LoginContext } from "../../../context/AuthContext";

import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Support } from "../../../Support";
import { Alert } from "@mui/material";

function CoffeeMenu(props) {
  const [products, setProducts] = useState([]);
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
  const { setWishList, setCart } = useContext(LoginContext);
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

  // const handleClickCart = (id, noItem) => {
  //   if (user) {
  //     setCart((prevCart) => {
  //       const newCart = [...prevCart];

  //       let index = -1;
  //       newCart.forEach((item, idx) => {
  //         if (item.productID === id) {
  //           index = idx;
  //           return;
  //         }
  //       });
  //       if (index !== -1) {
  //         newCart[index].no += noItem;
  //       } else {
  //         let newProduct = {};
  //         newProduct.productID = id;
  //         newProduct.no = noItem;
  //         newCart.push(newProduct);
  //       }

  //       const updatedUser = { ...user, cart: newCart };
  //       localStorage.setItem("user", JSON.stringify(updatedUser));

  //       return newCart;
  //     });

  //     props.setOpenAddCart(true);
  //   } else {
  //     props.setOpenAlertLogin(true);
  //   }
  // };

  // const handleLikedClick = (id, index) => {
  //   if (user) {
  //     setWishList((prevWishlist) => {
  //       const newWishlist = [...prevWishlist];
  //       const newLikedProducts = [...products];

  //       if (newLikedProducts[index].isLiked === false) {
  //         newLikedProducts[index].isLiked = true;
  //         newWishlist.push(id);
  //       } else {
  //         newLikedProducts[index].isLiked = false;
  //         const indexToRemove = newWishlist.indexOf(id);
  //         if (indexToRemove !== -1) {
  //           newWishlist.splice(indexToRemove, 1);
  //         }
  //       }

  //       const updatedUser = { ...user, wishlist: newWishlist };
  //       localStorage.setItem("user", JSON.stringify(updatedUser));
  //       setProducts(newLikedProducts);

  //       return newWishlist;
  //     });
  //   } else {
  //     props.setOpenAlertLogin(true);
  //   }
  // };

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
