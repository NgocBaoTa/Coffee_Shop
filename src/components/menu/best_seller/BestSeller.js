/** @format */

import React, { useEffect, useState } from "react";
import "./best_seller.css";
import SingleItem from "../single_item/SingleItem";
import axios from "axios";

function BestSeller() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await axios.get(
          "https://coffee-shops.herokuapp.com/products/best-seller"
        );

        setProducts(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  console.log(products);

  return (
    <div className="bestseller_container">
      <div className="bestseller_heading">
        <hr className="bestseller_heading--icon" />
        <div className="bestseller_heading--text">BEST SELLERS</div>
        <hr className="bestseller_heading--icon" />
      </div>

      <div className="bestseller_main grid wide">
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
        {/* <SingleItem
          src="https://t4.ftcdn.net/jpg/05/26/75/21/360_F_526752166_wTcIujiVJLkWuJ70KyfoQDrnGHdSsF2P.jpg"
          name="Cappuccino"
          description="Lorem ipsum dolor sit abc, margin and padding."
          price="12.00"
        /> */}
      </div>
    </div>
  );
}

export default BestSeller;
