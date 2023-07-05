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
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("user"))?.cart || []
  );

  useEffect(() => {
    setWishList(JSON.parse(localStorage.getItem("user"))?.wishlist);
    setCart(JSON.parse(localStorage.getItem("user"))?.cart);
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
              cart,
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
  }, [login, wishlist, cart]);

  return (
    <div>
      <LoginContext.Provider
        value={{
          login,
          setLogin: (value) => setLogin(value),
          wishlist,
          setWishList,
          cart,
          setCart,
        }}
      >
        {children}
      </LoginContext.Provider>
    </div>
  );
}

export { LoginContext, LoginProvider };
