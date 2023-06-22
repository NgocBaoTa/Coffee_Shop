/** @format */

import React from "react";
import "./single_card.css";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ContentModal from "../ContentModal";

function SingleCard(props) {
  return (
      <div className="singleCard l-2-4 m-4 c-6 col">
        <div className="singleCard_container">
          <ContentModal
            src={props.src}
            name={props.name}
            price={props.price}
            description={props.description}
            story={props.story}
            details={props.details}
            isLiked={props.isLiked}
          >
            <img className="singleCard_img" src={props.src} alt="coffee" />
            <div className="singleCard_main--name">{props.name}</div>
          </ContentModal>
          <div className="singleCard_main--description">
            <div className="singleCard_main--price">${props.price}</div>
            <div className="singleCard_main--icon">
              <ShoppingCartCheckoutRoundedIcon
                onClick={() => {
                  console.log("TEST");
                }}
                className="singleCard_icon--cart"
              />
              {!props.isLiked ? (
                <FavoriteBorderRoundedIcon className="singleCard_icon--love" />
              ) : (
                <FavoriteRoundedIcon className="singleCard_icon--loved" />
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

export default SingleCard;
