/** @format */

import React, { useEffect, useState } from "react";
import "./coffee_menu.css";
import axios from "axios";

function CoffeeMenu() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await axios.get(
          "https://coffee-shops.herokuapp.com/products?categoryName=Coffee"
        );

        setProducts(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="coffee_menu_container grid wide">
      <div className="coffee_menu--heading">
        <hr className="coffee_menu--heading-icon" />
        <div className="coffee_menu--heading-text">COFFEE MENU</div>
        <hr className="coffee_menu--heading-icon" />
      </div>

      <div className="coffee_menu--main">
        {products.map((item) => {
          return (
            <div className="coffee_menu--item" key={item._id}>
              <div className="coffee_menu--item-info">
                <img
                  className="coffee_menu--item-img"
                  src={item.productImage}
                  alt="coffee"
                />
                <div className="coffee_menu--item-desc">
                  <div className="coffee_menu--item-name">
                    {item.productName}
                  </div>
                  <div className="coffee_menu--item-text">
                    {item.productDescription.description}
                  </div>
                </div>
                <div className="coffee_menu--item-price">
                  ${item.productPrice.toFixed(2)}
                </div>
              </div>

              <hr className="coffee_menu--item-line" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CoffeeMenu;
