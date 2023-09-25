/** @format */

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import LockSharpIcon from "@mui/icons-material/LockSharp";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = (username, email, password) => {
    return axios.post(
      "https://coffee-shop-5r5c.onrender.com/cus-auth/register",
      // "/cus-auth/register",
      // "https://coffee-shop-ony3.onrender.com/cus_auth/register",
      {
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrMessage("");

    if (password.includes(" ")) {
      setErrMessage("Password should not contain spaces");
    } else if (password.length < 8) {
      setErrMessage("Password must be at least 8 characters");
    } else {
      try {
        const data = await handleSubmit(username, email, password);
        if (data.data && data.data.success !== true) {
          setErrMessage(data.data.message);
        } else {
          navigate("/auth/login");
        }
      } catch (e) {
        if (e.response) {
          if (e.response.data) {
            setErrMessage(e.response.data.message);
          }
        }
      }
    }
  };

  const clickLogin = (e) => {
    navigate("/auth/login");
  };

  const goHomePage = (e) => {
    navigate("/");
  };

   useEffect(() => {
     const handleKeyDown = (event) => {
       if (event.keyCode === 13) {
         handleRegister(event);
       }
     };

     window.addEventListener("keydown", handleKeyDown);

     return () => {
       window.removeEventListener("keydown", handleKeyDown);
     };
   }, [username, email, password]);

  return (
    <div className="register_page--bg">
      <div className="register_page--triangle"></div>
      <div className="register_page--container">
        <div className="register_page--border">
          <img
            src={"https://wallpapercave.com/dwp2x/wp3794531.jpg"}
            alt="Coffee"
            className="register_page--img l-6 m-6 c-0"
          />
          <div className="register_page--form l-6 m-6 c-12">
            <div className="register_form--heading">
              <div className="register_form--brand" onClick={goHomePage}>
                Bean Coffee
              </div>
              <div className="register_form--slogan">
                Smooth out your day, every day.
              </div>
            </div>
            <div className="register_form--main">
              <div className="register_form--item">
                <PersonIcon className="register_form--icon" />
                <input
                  required
                  autoFocus
                  type="text"
                  className="register_form--input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>

              <div className="register_form--item">
                <MailIcon className="register_form--icon" />
                <input
                  required
                  type="email"
                  className="register_form--input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="register_form--item">
                <LockSharpIcon className="register_form--icon" />
                <input
                  required
                  type="password"
                  className="register_form--input"
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
              <button className="register_form--btn" onClick={handleRegister}>
                REGISTER
              </button>
              <div className="register_form--question">
                Already have an account?{" "}
                <span className="register_form--signup" onClick={clickLogin}>
                  LOG IN.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
