/** @format */
import React, { useState, useContext } from "react";
import { LoginContext } from "./context/AuthContext";

export const Support = () => {
  const { setCart, setWishList } = useContext(LoginContext);
  let user = JSON.parse(localStorage.getItem("user"));
  const [openAddCart, setOpenAddCart] = useState(false);
  const [openAlertLogin, setOpenAlertLogin] = useState(false);

  const handleCloseAddCart = (reason) => {
    // if (reason === "clickaway") {
    //   return;
    // }
    setOpenAddCart(false);
  };

  const handleCloseAlertLogin = (reason) => {
    // if (reason === "clickaway") {
    //   return;
    // }
    setOpenAlertLogin(false);
  };

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

  const handleLikedClick = (id, index, products, setProducts) => {
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
    if (user) {
      setCart((prevCart) => {
        // const newCart = [...prevCart];
        const newCart = Array.isArray(prevCart) ? [...prevCart] : [];

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
    } else {
      setOpenAlertLogin(true);
    }
  };

  return {
    handleChangeCart,
    handleCloseAddCart,
    handleCloseAlertLogin,
    handleDeleteProduct,
    handleClickCart,
    handleLikedClick,
    openAddCart,
    openAlertLogin,
    setOpenAddCart,
    setOpenAlertLogin,
  };
};
