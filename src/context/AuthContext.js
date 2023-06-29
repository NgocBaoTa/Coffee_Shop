/** @format */

import React, { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";

const LoginContext = createContext();

function LoginProvider({ children }) {
  const [login, setLogin] = useState(
    localStorage.getItem("user") ? Boolean(localStorage.getItem("user")) : false
  );

  const [wishlist, setWishList] = useState(
    JSON.parse(localStorage.getItem("user"))?.wishlist || []
  );
  const [card, setCard] = useState(
    JSON.parse(localStorage.getItem("user"))?.card || []
  );

  useEffect(() => {
    setWishList(JSON.parse(localStorage.getItem("user"))?.wishlist);
    setCard(JSON.parse(localStorage.getItem("user"))?.card);
    // console.log(wishlist)
  }, [login]);
  // console.log(wishlist);
  useEffect(() => {
    if (login) {
      const updateData = async () => {
        try {
          let data = await axios.put(
            "https://coffee-shop-ony3.onrender.com/customers",
            {
              card,
              wishlist,
            },
            {
              headers: {
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("user")).user_token
                }`,
              },
            }
          );
          // console.log(data);
        } catch (error) {
          console.log(error.message);
        }
      };

      updateData();
    }
  }, [login, wishlist, card]);

  return (
    <div>
      <LoginContext.Provider
        value={{
          login,
          setLogin: (value) => setLogin(value),
          wishlist,
          setWishList,
          card,
          setCard,
        }}
      >
        {children}
      </LoginContext.Provider>
    </div>
  );
}

export { LoginContext, LoginProvider };
