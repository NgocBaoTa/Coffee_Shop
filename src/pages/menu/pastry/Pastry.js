/** @format */

import React, { useEffect, useState } from "react";
import "./pastry.css";
import axios from "axios";
import SingleCard from "../../../components/single_card/SingleCard";
import { Support } from "../../../Support";
import AlertMsg from "../../../components/AlertMsg";

function Pastry() {
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
          "https://coffee-shop-5r5c.onrender.com/products?categoryName=Pastries"
          // "/products?categoryName=Pastries"
          // "https://coffee-shop-ony3.onrender.com/products?categoryName=Patries"
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
      <AlertMsg
        openAddCart={openAddCart}
        openAlertLogin={openAlertLogin}
        handleCloseAddCart={handleCloseAddCart}
        handleCloseAlertLogin={handleCloseAlertLogin}
      />

      <div className="pastry_container">
        <div className="pastry_heading">
          <hr className="pastry_heading--icon" />
          <div className="pastry_heading--text">PASTRIES</div>
          <hr className="pastry_heading--icon" />
        </div>

        <div className=" grid wide">
          <div className="pastry_main">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Pastry;
