/** @format */

import React from "react";
import "./checkout_item.css";
import ContentModal from "../../../components/content_modal/ContentModal";

function Checkout_item(props) {

  return (
    <>
      <div className="checkout_item--container">
        <div className="l-8 m-7">
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                className="checkout_item--img l-3 c-3 col"
                src={props.src}
                alt="coffee"
              />
              <div className="checkout_item--name l-9 m-8 c-0 col">
                {props.name}
              </div>
            </div>
          </ContentModal>
        </div>
        <div className="checkout_item--quantity col l-2  m-2-5 c-0">
          {props.quantity}
        </div>
        <div className="checkout_item--price col l-2 m-2 c-0">
          ${(props.price * props.quantity).toFixed(2)}
        </div>

        <div className="checkout_item--main l-0 m-0 c-8 col">
          <div className="checkout_item--name col">{props.name}</div>
          <div className="checkout_item--detail col">
            <div className="checkout_item--price col">${props.price}</div>
            <div className="checkout_item--qnt col">x{props.quantity}</div>
          </div>
        </div>
      </div>
      <hr className="checkout_item--line" />
    </>
  );
}

export default Checkout_item;
