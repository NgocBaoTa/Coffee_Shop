/** @format */

import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import SingleProduct from "../single_product/SingleProduct";
import axios from "axios";
import { LoginContext } from "../../../context/AuthContext";

function Style() {
  const { login } = useContext(LoginContext);
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    try {
      let data = await axios.get(
        "https://coffee-shops.herokuapp.com/products/new-coffee"
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
    <div className="style_container grid wide">
      <div className="style_heading">Enjoy a new blend of coffee style</div>
      <div className="style_text">
        Explore all flavours of coffee with us. There is always a new cup worth
        experiencing
      </div>
      <ul className="style_list">
        {products.map((item) => {
          return (
            <SingleProduct
              src={item.productImage}
              name={item.productName}
              price={item.productPrice.toFixed(2)}
              key={item._id}
              isLiked={item.isLiked ? item.isLiked : false}
            />
          );
        })}
        {/* <SingleProduct
          src="https://images.ctfassets.net/v601h1fyjgba/3BPpnehRjlQ9xzGPcYU2lU/6ad989f0eb91676186dceeb8de1be459/Cappuccino.jpg"
          name="Cappuccino"
          price="8.50"
          isProduct={true}
          isLiked={false}
        /> */}
      </ul>
    </div>
  );
}

export default Style;
