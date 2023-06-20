/** @format */

import React, { useState, useEffect } from "react";
import "./style.css";
import SingleProduct from "../single_product/SingleProduct";
import axios from "axios";

function Style() {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    try {
      let data = await axios.get(
        "https://coffee-shops.herokuapp.com/products/new-coffee"
      );

      setProducts(data.data);
      console.log(products);
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
        {products.map((item, index) => {
          return (
            <SingleProduct
              src={item.productImage}
              name={item.productName}
              price={item.productPrice.toFixed(2)}
              key={item._id}
            />
          );
        })}
        {/* <SingleProduct
          src="https://images.ctfassets.net/v601h1fyjgba/3BPpnehRjlQ9xzGPcYU2lU/6ad989f0eb91676186dceeb8de1be459/Cappuccino.jpg"
          name="Cappuccino"
          price="8.50"
          isProduct={true}
          isLoved={false}
        /> */}
      </ul>
    </div>
  );
}

export default Style;
