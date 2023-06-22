/** @format */

import React from "react";
import "./singleProduct.css";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

function SingleItem(props) {
  return (
    <div className="item-container  l-2-4 m-3 c-6">
      <img className="item_img" src={props.src} alt="coffee" />

      <div className="item_info">
        <div className="item_name">{props.name}</div>

        <div className="item_info--main ">
          <div className="item_price">{`$ ${props.price}`}</div>
          <div className="item_icon">
            {/* check if it is a product => show the cart, if not, just show the heart */}
            {props.isProduct ? (
              <ShoppingCartCheckoutRoundedIcon className="item_icon--cart" />
            ) : (
              <></>
            )}
            {/* check if the product is loved (add to favorite list) => show the full heart */}
            {!props.isLiked ? (
              <FavoriteBorderRoundedIcon className="item_icon--love" />
            ) : (
              <FavoriteRoundedIcon className="item_icon--love" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleItem;
