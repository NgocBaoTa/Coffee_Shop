/** @format */

import React, { useEffect, useState, useContext } from "react";
import "./recommended.css";
import Button from "../../../components/button/Button";
import axios from "axios";
import SingleCard from "../../../components/single_card/SingleCard";
import { LoginContext } from "../../../context/AuthContext";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { AlertContext } from "../../../context/AlertContext";
function Recommended() {
  // const [openAddCart, setOpenAddCart] = useState(false);
  // const [openAlertLogin, setOpenAlertLogin] = useState(false);

  // const handleCloseAddCart = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpenAddCart(false);
  // };

  // const handleCloseAlertLogin = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpenAlertLogin(false);
  // };
  const {
    openAddCart,
    openAlertLogin,
    handleCloseAddCart,
    handleCloseAlertLogin,
    setOpenAlertLogin,
    setOpenAddCart,
  } = useContext(AlertContext);

  const { setWishList, setCart } = useContext(LoginContext);
  const [products, setProducts] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await axios.get(
          "https://localhost:5000/products/recommend-products"

          // "https://coffee-shop-ony3.onrender.com/products/recommend-products"
        );

        if (user) {
          let productArr = data.data;
          // setWishList(user.wishlist);
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
    if (user) {
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
    } else {
      setOpenAlertLogin(true);
    }
  };

  return (
    <>
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
      <div className="recommended_container grid wide">
        <div className="recommended_heading">Recommended products</div>
        <div className="recommended_text">
          We don’t just make your coffee, we make your day!
        </div>

        <ul className="recommended_list">
          {products.map((item, index) => {
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
                  item.productDescription.detail
                    ? item.productDescription.detail
                    : null
                }
                handleLikedClick={handleLikedClick}
                index={index}
                handleClickCart={handleClickCart}
              />
            );
          })}
        </ul>

        <div className="recommended_bottom">
          <div className="recommended_bottom--secondary">
            Great ideas start with great coffee, Lets help you achieve that
          </div>
          <div className="recommended_bottom--main"> Get started today.</div>
          <Button className="recommended_bottom--btn" name="Join Us" />
        </div>
      </div>
    </>
  );
}

export default Recommended;
