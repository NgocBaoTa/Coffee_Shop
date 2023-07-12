/** @format */

import React, { useEffect, useState } from "react";
import "./best_seller.css";
import SingleItem from "../../../components/single_item/SingleItem";
import axios from "axios";

function BestSeller() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await axios.get(
          "https://localhost:5000/products/best-seller"

          // "https://coffee-shop-ony3.onrender.com/products/best-seller"
        );

        setProducts(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  // console.log(products);

  return (
    <div className="bestseller_container">
      <div className="bestseller_heading">
        <hr className="bestseller_heading--icon" />
        <div className="bestseller_heading--text">BEST SELLERS</div>
        <hr className="bestseller_heading--icon" />
      </div>
      <div className=" grid wide">
        <div className="bestseller_main">
          {products.map((item) => {
            return (
              <SingleItem
                src={item.productImage}
                name={item.productName}
                price={item.productPrice.toFixed(2)}
                description={item.productDescription.description}
                key={item._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
