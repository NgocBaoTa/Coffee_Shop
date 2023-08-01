/** @format */

import React, { useState, useEffect } from "react";
import "./cartItem.css";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import ContentModal from "../../../components/content_modal/ContentModal";

function CartItem(props) {
  const [noItem, setNoItem] = useState(props.noOfItems);

  return (
    <>
      <div className="cart_item--container">
        <input
          type="checkbox"
          className="cart_item--checkbox col l-1 m-1 c-1"
          checked={props.isChosen}
          onChange={(e) => props.handleChooseProduct(e, props.index)}
        />

        <div className=" l-5 col m-5 c-10">
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
            setNoOfItem={setNoItem}
            noOfItem={noItem}
            productQuantity={props.productQuantity}
            productSold={props.productSold}
          >
            <div className="cart_item--product">
              <img
                className="cart_item--img l-4 m-4 c-3 col"
                src={props.src}
                alt="coffee"
              />
              <div className="cart_item--main col l-8 m-8 c-8">
                <div className="cart_item--name l-12 m-12 col ">
                  {props.name}
                </div>

                <div className="cart_item--price col l-0 m-0">
                  $ {props.price}
                </div>

                <div className="cart_item--qnt col l-0 m-0">
                  <button
                    className="cart_item--minus"
                    onClick={() => {
                      let value = noItem;
                      if (value !== 1) {
                        setNoItem(--value);
                      }
                      props.handleChangeCart(props.id, value);
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={noItem}
                    onChange={(e) => {
                      setNoItem(e.target.value);
                      props.handleChangeCart(props.id, +e.target.value);
                    }}
                    className="cart_item--input"
                  />
                  <button
                    className="cart_item--plus"
                    onClick={() => {
                      let value = noItem;
                      setNoItem(++value);
                      props.handleChangeCart(props.id, value);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </ContentModal>
        </div>

        <div className="cart_item--price col l-1-5 m-1-5 c-0">
          $ {props.price}
        </div>

        <div className="cart_item--quantity col l-2 m-2 c-0">
          <button
            className="cart_item--minus"
            onClick={() => {
              let value = noItem;
              if (value !== 1) {
                setNoItem(--value);
              }
              props.handleChangeCart(props.id, value);
            }}
          >
            -
          </button>
          <input
            type="number"
            value={noItem}
            onChange={(e) => {
              setNoItem(e.target.value);
              props.handleChangeCart(props.id, +e.target.value);
            }}
            className="cart_item--input"
          />
          <button
            className="cart_item--plus"
            onClick={() => {
              let value = noItem;
              setNoItem(++value);
              props.handleChangeCart(props.id, value);
            }}
          >
            +
          </button>
        </div>

        <div className="cart_item--total col l-2-5 m-2-5 c-0">
          <div className="l-7 m-7">$ {(noItem * props.price).toFixed(2)}</div>
          <ClearRoundedIcon
            className="cart_item--delete l-5 m-5"
            onClick={() => {
              props.handleDeleteProduct(props.id);
            }}
          />
        </div>

        <div className="col l-0 m-0 c-1-5">
          <ClearRoundedIcon
            className="cart_item--delete"
            onClick={() => {
              props.handleDeleteProduct(props.id);
            }}
          />
        </div>
      </div>
      <div className="cart_item--line"></div>
    </>
  );
}

export default CartItem;
