/** @format */

import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import SingleItem from "../../../components/single_item/SingleItem";

function Style() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await axios.get(
          "https://localhost:5000/products/new-coffee"

          // "https://coffee-shop-ony3.onrender.com/products/new-coffee"
        );

        setProducts(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
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
            <SingleItem
              src={item.productImage}
              name={item.productName}
              price={item.productPrice.toFixed(2)}
              key={item._id}
              description={item.productDescription.description}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Style;
