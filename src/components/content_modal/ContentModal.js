/** @format */

import React, { useState } from "react";
import "./content_modal.css";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Dialog from "@mui/material/Dialog";

function ContentModal(props) {
  const [noItem, setNoItem] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setNoItem(1);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {props.children}
      </div>

      <Dialog
        onClose={handleClose}
        open={open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "90%",
              maxWidth: "1000px",
            },
          },
        }}
        className="container"
      >
        <div className="content_modal--closeBtn">
          <CancelRoundedIcon fontSize="1"></CancelRoundedIcon>
        </div>
        <div className="content_modal--container">
          <div className="l-5 m-5 c-12 col modal_img">
            <img className="modal_img" src={props.src} alt="coffee" />
          </div>

          <div className="l-7 m-7 c-12 col modal_info--container">
            <div className="modal_info">
              <div className="modal_info--main">
                <div className="modal_main--name">{props.name}</div>
                {/* <div className="modal_main--name">ORGANIC COFFEE</div> */}
                {/* <div className="modal_main--price">$21.3</div> */}
                <div className="modal_main--price">${props.price}</div>
                <hr className="modal_main--hr"></hr>
                <div className="modal_main--group">
                  <div className="modal_main--input">
                    <button
                      className="main_btn--item main_btn--minus"
                      onClick={() => {
                        let value = noItem;
                        if (value !== 1) {
                          setNoItem(--value);
                        }
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={noItem}
                      onChange={(e) => setNoItem(e.target.value)}
                      className="main_btn--input"
                    />
                    <button
                      className="main_btn--item main_btn--plus"
                      onClick={() => {
                        let value = noItem;
                        setNoItem(++value);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="modal_main--icon">
                    <ShoppingCartCheckoutRoundedIcon
                      className="modal_icon--item modal_main--cart"
                      onClick={() => {
                        props.handleClickCart(props.id, +noItem);
                        if (props.setNoOfItem) {
                          let value = props.noOfItem;
                          value += +noItem;
                          props.setNoOfItem(value);
                        }
                      }}
                    />
                    {!props.isLiked ? (
                      <FavoriteBorderRoundedIcon
                        className="modal_icon--item modal_main--love"
                        onClick={() => {
                          props.handleLikedClick(props.id, props.index);
                        }}
                      />
                    ) : (
                      <FavoriteRoundedIcon
                        className="modal_icon--item modal_main--loved"
                        onClick={() => {
                          props.handleLikedClick(props.id, props.index);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="modal_info--description">
                {props.description ? (
                  <div className="modal_info--desc">{props.description}</div>
                ) : (
                  <></>
                )}
                {/* <div className="modal_info--desc">
                  Okapi's artisan-grown Ugandan Specialty Highland Coffee has
                  rich chocolate overtones with bright citrus and floral
                  notes.
                </div> */}
                {props.story ? (
                  <div className="modal_info--story">
                    <div className="modal_desc--heading">STORY</div>
                    <div className="modal_desc--story">{props.story}</div>
                  </div>
                ) : (
                  <></>
                )}
                {/* <div className="modal_info--story">
                  <div className="modal_desc--heading">STORY</div>
                  <div className="modal_desc--story">
                    Okapi's artisan-grown Ugandan Specialty Highland Coffee has
                    rich chocolate overtones with bright citrus and floral
                    notes.
                  </div>
                </div> */}
                <div className="modal_info--details">
                  <div className="modal_desc--heading">DETAILS</div>
                  <ul className="modal_details--list">
                    {/* <li className="modal_details--item">
                      Shipping cost is applied for each shipment.
                    </li>

                    <li className="modal_details--item">
                      Future orders can be modified or cancelled at any point.
                    </li>

                    <li className="modal_details--item">
                      Shipping cost is applied for each shipment.
                    </li>

                    <li className="modal_details--item">
                      Future orders can be modified or cancelled at any point.
                    </li> */}
                    {props.details.map((item, index) => {
                      return (
                        <li key={index} className="modal_details--item">
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
    // </div>
  );
}

export default ContentModal;
