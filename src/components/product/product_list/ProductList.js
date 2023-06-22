/** @format */

import React, { useState, useEffect, useContext } from "react";
import "./product_list.css";
import SingleCard from "../single_card/SingleCard";
import axios from "axios";
import { LoginContext } from "../../../context/AuthContext";

function ProductList() {
  const { login } = useContext(LoginContext);
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    try {
      let data = await axios.get(
        "https://coffee-shops.herokuapp.com/products?categoryName=Product"
      );

      if (login) {
        let productArr = data.data;
        const wishlistItems = JSON.parse(localStorage.getItem("user")).wishlist;

        wishlistItems.forEach((item) => {
          const product = productArr.find((p) => p._id === item);
          if (product) {
            product.isLiked = true;
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid wide">
      <div className="productList_container">
        {products.map((item) => {
          return (
            <SingleCard
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
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
