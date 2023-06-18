/** @format */

import React, { useState } from "react";
import "./content_modal.css";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Dialog from "@mui/material/Dialog";

function ContentModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: "80%",
    // height: "auto",
    bgcolor: "white",
    // border: "2px solid #000",
    boxShadow: 24,
    // p: 3,
    overflowY: "auto",
    padding: "30px 20px",
    // color: "yellow",
  };
  return (
    <div className="singleCard l-2-4 m-4 c-6 col">
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
            <img
              className="modal_img"
              src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F10%2FRapper-Jadakiss-Debuts-Family-Coffee-Line-40-Years-in-the-Making-0.jpg?w=960&cbr=1&q=90&fit=max"
              alt="coffee"
            />
            {/* <img className="modal_img" src={props.src} alt="coffee" /> */}
          </div>

          <div className="l-7 m-7 c-12 col modal_info--container">
            <div className="modal_info">
              <div className="modal_info--main">
                {/* <div className="modal_main--name">{props.name}</div> */}
                <div className="modal_main--name">ORGANIC COFFEE</div>
                <div className="modal_main--price">$21.3</div>
                {/* <div className="modal_main--price">{props.price}</div> */}
                <hr className="modal_main--hr"></hr>
                <div className="modal_main--group">
                  <div className="modal_main--input">
                    <button className="main_btn--item main_btn--minus">
                      -
                    </button>
                    <input
                      type="number"
                      value={1}
                      className="main_btn--input"
                    />
                    <button className="main_btn--item main_btn--plus">+</button>
                  </div>
                  <div className="modal_main--icon">
                    <ShoppingCartCheckoutRoundedIcon className="modal_icon--item modal_main--cart" />
                    {!props.isLoved ? (
                      <FavoriteBorderRoundedIcon className="modal_icon--item modal_main--love" />
                    ) : (
                      <FavoriteRoundedIcon className="modal_icon--item modal_main--loved" />
                    )}
                  </div>
                </div>
              </div>
              <div className="modal_info--description">
                {/* <div className="modal_info--desc">{props.description}</div> */}
                <div className="modal_info--desc">
                  Okapi's artisan-grown Ugandan Specialty Highland Coffee has
                  rich chocolate overtones with bright citrus and floral notes.
                </div>
                {/* {props.story ? (
                  <div className="modal_info--story">
                    <div className="modal_desc--heading">STORY</div>
                    <div className="modal_desc--story">{props.story}</div>
                  </div>
                ) : (
                  <></>
                )} */}
                <div className="modal_info--story">
                  <div className="modal_desc--heading">STORY</div>
                  <div className="modal_desc--story">
                    Okapi's artisan-grown Ugandan Specialty Highland Coffee has
                    rich chocolate overtones with bright citrus and floral
                    notes.
                  </div>
                </div>
                <div className="modal_info--details">
                  <div className="modal_desc--heading">DETAILS</div>
                  <ul className="modal_details--list">
                    <li className="modal_details--item">
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
                    </li>
                    {/* {props.details.map((item, index) => {
                      return (
                        <li key={index} className="modal_details--item">
                          {item}
                        </li>
                      );
                    })} */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ContentModal;
