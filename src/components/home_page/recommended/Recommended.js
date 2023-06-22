/** @format */

import React, { useEffect, useState, useContext } from "react";
import "./recommended.css";
import SingleProduct from "../single_product/SingleProduct";
import Button from "../../button/Button";
import axios from "axios";
import { LoginContext } from "../../../context/AuthContext";

function Recommended() {
  const { login } = useContext(LoginContext);
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    try {
      let data = await axios.get(
        "https://coffee-shops.herokuapp.com/products/recommend-products"
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
    <div className="recommended_container grid wide">
      <div className="recommended_heading">Recommended products</div>
      <div className="recommended_text">
        We don’t just make your coffee, we make your day!
      </div>

      <ul className="recommended_list">
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

      <div className="recommended_bottom">
        <div className="recommended_bottom--secondary">
          Great ideas start with great coffee, Lets help you achieve that
        </div>
        <div className="recommended_bottom--main"> Get started today.</div>
        <Button className="recommended_bottom--btn" name="Join Us" />
      </div>
    </div>
  );
}

export default Recommended;
