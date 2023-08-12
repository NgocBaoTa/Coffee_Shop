/** @format */

import React, { useState, useEffect} from "react";
import "./style.css";
import axios from "axios";
import SingleCard from "../../../components/single_card/SingleCard";
import { Support } from "../../../Support";
import AlertMsg from "../../../components/AlertMsg";

function Style() {
  const [products, setProducts] = useState([]);
  const {
    handleCloseAddCart,
    handleCloseAlertLogin,
    handleClickCart,
    handleLikedClick,
    openAddCart, 
    openAlertLogin
  } = Support();
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await axios.get(
          "/products/new-coffee"

          // "https://coffee-shop-ony3.onrender.com/products/new-coffee"
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
    <div className="style_container grid wide">
      <AlertMsg
        openAddCart={openAddCart}
        openAlertLogin={openAlertLogin}
        handleCloseAddCart={handleCloseAddCart}
        handleCloseAlertLogin={handleCloseAlertLogin}
      />
      <div className="style_heading">Enjoy a new blend of coffee style</div>
      <div className="style_text">
        Explore all flavours of coffee with us. There is always a new cup worth
        experiencing
      </div>
      <ul className="style_list">
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
        })}
      </ul>
    </div>
  );
}

export default Style;
