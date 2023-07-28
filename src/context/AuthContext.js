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

  const [userID, setUserID] = useState("");

  useEffect(() => {
    setWishList(JSON.parse(localStorage.getItem("user"))?.wishlist);
    setCart(JSON.parse(localStorage.getItem("user"))?.cart);
    // console.log(wishlist)
  }, [login]);
  // console.log(wishlist);
  useEffect(() => {
    if (login && userID.length > 0) {
      const updateData = async () => {
        try {
          let data = await axios.put(
            `/customers/${userID}`,
            // "https://coffee-shop-ony3.onrender.com/customers",
            {
              cart,
              wishlist,
            }
            // {
            //   headers: {
            //     Authorization: `Bearer ${
            //       JSON.parse(localStorage.getItem("user")).user_token
            //     }`,
            //   },
            // }
          );
          console.log("DATA: ", data)
        } catch (error) {
          console.log(error);
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
          userID,
          setUserID,
        }}
      >
        {children}
      </LoginContext.Provider>
    </div>
  );
}

export { LoginContext, LoginProvider };
