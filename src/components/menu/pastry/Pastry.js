/** @format */

import React from "react";
import "./pastry.css";
import SingleItem from "../single_item/SingleItem";

function Pastry() {
  return (
    <div className="pastry_container">
      <div className="pastry_heading">
        <hr className="pastry_heading--icon" />
        <div className="pastry_heading--text">PASTRIES</div>
        <hr className="pastry_heading--icon" />
      </div>

      <div className="pastry_main grid wide">
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

export default Pastry;
