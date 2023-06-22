/** @format */

import React, { useEffect, useState } from "react";
import "./pastry.css";
import SingleItem from "../single_item/SingleItem";
import axios from "axios";

function Pastry() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await axios.get(
          "https://coffee-shops.herokuapp.com/products?categoryName=Patries"
        );

        setProducts(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pastry_container">
      <div className="pastry_heading">
        <hr className="pastry_heading--icon" />
        <div className="pastry_heading--text">PASTRIES</div>
        <hr className="pastry_heading--icon" />
      </div>

      <div className="pastry_main grid wide">
        {products.map((product) => {
          return (
            <SingleItem
              src={product.productImage}
              name={product.productName}
              description={product.productDescription.description}
              price={product.productPrice.toFixed(2)}
              key={product._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Pastry;
