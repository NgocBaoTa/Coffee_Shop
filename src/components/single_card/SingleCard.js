/** @format */

import React from "react";
import "./single_card.css";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ContentModal from "../content_modal/ContentModal";

function SingleCard(props) {
  return (
    <div data={props.id} className=" l-2-4 m-4 c-6 c-2-6 col">
      <div className="singleCard_container">
        <ContentModal
          src={props.src}
          name={props.name}
          price={props.price}
          description={props.description}
          story={props.story}
          details={props.details}
          isLiked={props.isLiked}
          handleLikedClick={props.handleLikedClick}
          id={props.id}
          index={props.index}
          handleClickCart={props.handleClickCart}
          productSold={props.productSold}
          productQuantity={props.productQuantity}
        >
          <img className="singleCard_img" src={props.src} alt="coffee" />
          <div className="singleCard_main--name">{props.name}</div>
        </ContentModal>
        <div className="singleCard_main--description">
          <div className="singleCard_main--price">${props.price}</div>
          <div className="singleCard_main--icon">
            <ShoppingCartCheckoutRoundedIcon
              className="singleCard_icon--cart"
              onClick={() => {
                props.handleClickCart(props.id, 1);
              }}
            />
            {props.isLiked ? (
              <FavoriteRoundedIcon
                className="singleCard_icon--loved"
                onClick={() => {
                  props.handleLikedClick(props.id, props.index);
                }}
              />
            ) : (
              <FavoriteBorderRoundedIcon
                className="singleCard_icon--love"
                onClick={() => {
                  props.handleLikedClick(props.id, props.index);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCard;
