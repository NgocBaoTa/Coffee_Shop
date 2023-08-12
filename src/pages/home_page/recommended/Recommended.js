/** @format */

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./recommended.css";
import Button from "../../../components/button/Button";
import axios from "axios";
import SingleCard from "../../../components/single_card/SingleCard";
import { LoginContext } from "../../../context/AuthContext";
import { Support } from "../../../Support";
import AlertMsg from "../../../components/AlertMsg";

function Recommended() {
  const navigate = useNavigate();
  const {
    handleCloseAddCart,
    handleCloseAlertLogin,
    handleClickCart,
    handleLikedClick,
    openAddCart,
    openAlertLogin,
  } = Support();
  const { login } = useContext(LoginContext);
  const [products, setProducts] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await axios.get(
          "https://coffee-shop-5r5c.onrender.com/products/recommend-products"

          // "/products/recommend-products"
          // "https://coffee-shop-ony3.onrender.com/products/recommend-products"
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

        <div className="recommended_bottom">
          <div className="recommended_bottom--secondary">
            Great ideas start with great coffee, Lets help you achieve that
          </div>
          <div className="recommended_bottom--main"> Get started today.</div>
          <div
            onClick={() => {
              navigate(login ? "/" : "auth/login");
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <Button className="recommended_bottom--btn" name="Join Us" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Recommended;
