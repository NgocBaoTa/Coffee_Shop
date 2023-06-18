/** @format */

import React from "react";
import "./single_card.css";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ContentModal from "../ContentModal";

function SingleCard(props) {
  return (
    <ContentModal>
      <div className="singleCard_container">
        <img className="singleCard_img" src={props.src} alt="coffee" />
        <div className="singleCard_main">
          <div className="singleCard_main--name">{props.name}</div>
          <div className="singleCard_main--description">
            <div className="singleCard_main--price">${props.price}</div>
            <div className="singleCard_main--icon">
              <ShoppingCartCheckoutRoundedIcon className="singleCard_icon--cart" />
              {/* check if the product is loved (add to favorite list) => show the full heart */}
              {!props.isLoved ? (
                <FavoriteBorderRoundedIcon className="singleCard_icon--love" />
              ) : (
                <FavoriteRoundedIcon className="singleCard_icon--loved" />
              )}
            </div>
          </div>
        </div>
      </div>
    </ContentModal>
  );
}

export default SingleCard;
