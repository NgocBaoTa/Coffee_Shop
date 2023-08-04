/** @format */

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import "./chance.css";
import { LoginContext } from "../../../context/AuthContext";

function Chance() {
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  return (
    <div className="chance_container ">
      <div className="chance_bg--img">
        <div className="chance_bg"></div>
      </div>
      <div className="chance_main grid wide row">
        <div className="chance_left l-6 m-6 c-6">
          <div className="chance_heading">
            Get a chance to have an Amazing morning
          </div>
          <div className="chance_text">
            We are giving you are one time opportunity to experience a better
            life with coffee.
          </div>
          <div
            className="chance_btn"
            onClick={() => {
              navigate(login ? "/cart" : "auth/login");
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <Button name="Order Now" />
          </div>
        </div>
        <div className="chance_right l-6 m-6 c-6">
          <div className="chance_coffee--bean"></div>
          <div className="chance_coffee--cup"></div>
        </div>
      </div>
    </div>
  );
}

export default Chance;
