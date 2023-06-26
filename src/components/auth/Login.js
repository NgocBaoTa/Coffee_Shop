/** @format */

import React, { useState, useContext } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../context/AuthContext";
import MailIcon from "@mui/icons-material/Mail";
import LockSharpIcon from "@mui/icons-material/LockSharp";

function Login() {
  const navigate = useNavigate();
  const { setLogin} = useContext(LoginContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrMessage("");

    try {
      const data = await handleSubmit(email, password);
      if (data.data && data.data.success !== true) {
        setErrMessage(data.data.message);
      } else {
        // console.log("DATA", data.data);
        let user = {
          user_token: data.data.accessToken,
          username: data.data.customerName,
          email: data.data.customerEmail,
          wishlist: data.data.customerWishlist,
          card: data.data.customerCard,
        };
        localStorage.setItem("user", JSON.stringify(user));
        setLogin(true);
        navigate("/");
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
    return axios.post("https://coffee-shops.herokuapp.com/cus_auth/login", {
      email,
      password,
      type: "customer",
    });
  };

  const clickSignup = (e) => {
    navigate("/auth/register");
  };

  const goHomePage = (e) => {
    navigate("/");
  };

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
