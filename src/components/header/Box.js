/** @format */

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./box.css";
import Button from "../button/Button";
import { LoginContext } from "../../context/AuthContext";

function Box() {
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  return (
    <div className="box_container wide grid">
      <div className="box_main">
        <div className="box_main--text">
          We’ve got your morning covered with
        </div>
        <div className="box_main--coffee">Coffee</div>
        <div className="box_main--text">
          It is best to start your day with a cup of coffee. Discover the best
          flavours coffee you will ever have. We provide the best for our
          customers.
        </div>
      </div>

      <div
        onClick={() => {
          navigate(login ? "/cart" : "auth/login");
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <Button className="box_button" name="Order Now"></Button>
      </div>
    </div>
  );
}

export default Box;
