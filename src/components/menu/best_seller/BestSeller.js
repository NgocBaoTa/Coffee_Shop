/** @format */

import React from "react";
import "./best_seller.css";
import SingleItem from "../single_item/SingleItem";

function BestSeller() {
  return (
    <div className="bestseller_container">
      <div className="bestseller_heading">
        <hr className="bestseller_heading--icon" />
        <div className="bestseller_heading--text">BEST SELLERS</div>
        <hr className="bestseller_heading--icon" />
      </div>

      <div className="bestseller_main grid wide">
        <SingleItem
          src="https://t4.ftcdn.net/jpg/05/26/75/21/360_F_526752166_wTcIujiVJLkWuJ70KyfoQDrnGHdSsF2P.jpg"
          name="Cappuccino"
          description="Lorem ipsum dolor sit abc, margin and padding."
          price="12.00"
        />

        <SingleItem
          src="https://t4.ftcdn.net/jpg/05/26/75/21/360_F_526752166_wTcIujiVJLkWuJ70KyfoQDrnGHdSsF2P.jpg"
          name="Cappuccino"
          description="Lorem ipsum dolor sit abc, margin and padding."
          price="12.00"
        />

        <SingleItem
          src="https://t4.ftcdn.net/jpg/05/26/75/21/360_F_526752166_wTcIujiVJLkWuJ70KyfoQDrnGHdSsF2P.jpg"
          name="Cappuccino"
          description="Lorem ipsum dolor sit abc, margin and padding."
          price="12.00"
        />
      </div>
    </div>
  );
}

export default BestSeller;
