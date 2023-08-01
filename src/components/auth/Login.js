/** @format */

import React, { useState, useContext, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../context/AuthContext";
import MailIcon from "@mui/icons-material/Mail";
import LockSharpIcon from "@mui/icons-material/LockSharp";

function Login() {
  const navigate = useNavigate();
  const { setLogin, setUserID } = useContext(LoginContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrMessage("");

    try {
      const data = await handleSubmit(email, password);
      let customerData = data.data;
      if (customerData && customerData.success !== true) {
        setErrMessage(customerData.message);
      } else {
        customerData = data.data.customer;
        let user = {
          userID: customerData._id,
          // user_token: customerData.accessToken,
          username: customerData.username,
          // email: customerData.email,
          wishlist: customerData.wishlist,
          cart: customerData.cart,
          // order: customerData.order,
          // boughtProduct: customerData.boughtProduct,
          checkoutProduct: []
        };
        localStorage.setItem("user", JSON.stringify(user));
        setUserID(customerData._id);
        setLogin(true);
        navigate(`/`);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          setErrMessage(e.response.data.message);
        }
      }
    }
  };

  const handleSubmit = (email, password) => {
    // https://coffee-shop-ony3.onrender.com/cus_auth/login
    return axios.post(
      "/cus-auth/login",
      {
        email,
        password,
        type: "customer",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const clickSignup = (e) => {
    navigate("/auth/register");
  };

  const goHomePage = (e) => {
    navigate("/");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        handleLogin(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, password]);

  return (
    <div className="login_page--bg">
      <div className="login_page--triangle"></div>
      <div className="login_page--container">
        <div className="login_page--border">
          <img
            src={"https://wallpapercave.com/dwp2x/wp3794531.jpg"}
            alt="Coffee"
            className="login_page--img l-6 m-6 c-0"
          />
          <div className="login_page--form l-6 m-6 c-12">
            <div className="login_form--heading">
              <div className="login_form--brand" onClick={goHomePage}>
                Bean Coffee
              </div>
              <div className="login_form--slogan">
                Smooth out your day, every day.
              </div>
            </div>
            <div className="login_form--main">
              <div className="login_form--item">
                <MailIcon className="login_form--icon" />
                <input
                  required
                  autoFocus
                  type="email"
                  className="login_form--input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value.trim());
                  }}
                />
              </div>

              <div className="login_form--item">
                <LockSharpIcon className="login_form--icon" />
                <input
                  required
                  type="password"
                  className="login_form--input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              {errMessage !== "" ? (
                <div className="login_form--errorMsg">{errMessage}</div>
              ) : (
                <></>
              )}

              <button className="login_form--btn" onClick={handleLogin}>
                LOGIN
              </button>
              <div className="login_form--question">
                Don't have an account?{" "}
                <span className="login_form--signup" onClick={clickSignup}>
                  SIGN UP.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
