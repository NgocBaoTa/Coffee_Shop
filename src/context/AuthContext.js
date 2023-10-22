/** @format */

import React, { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";

const LoginContext = createContext();

function LoginProvider({ children }) {
  const [login, setLogin] = useState(
    localStorage.getItem("user") ? Boolean(localStorage.getItem("user")) : false
  );

  // const checkIsLogin = async () => {
  //   console.log("CHECK.");
  //   try {
  //     let data = await axios.get("/customers/check");
  //     console.log(data.data.success);

  //     if (!data.data.success) {
  //       localStorage.removeItem("user");
  //       setLogin(false);
  //       if (
  //         window.location.pathname === "/cart" ||
  //         window.location.pathname === "/wishlist" ||
  //         window.location.pathname === "/orders" ||
  //         window.location.pathname === "/checkout"
  //       ) {
  //         navigate("/");
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setInterval(() => {
  //   checkIsLogin();
  // }, 31000);

  const [wishlist, setWishList] = useState(
    JSON.parse(localStorage.getItem("user"))?.wishlist || []
  );
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("user"))?.cart || []
  );

  const [userID, setUserID] = useState(
    JSON.parse(localStorage.getItem("user"))?.userID
  );

  useEffect(() => {
    setWishList(JSON.parse(localStorage.getItem("user"))?.wishlist);
    setCart(JSON.parse(localStorage.getItem("user"))?.cart);
  }, [login]);


  useEffect(() => {
    if (login && userID.length > 0) {
      const updateData = async () => {
        try {
          const data = await axios.put(
            `https://jealous-gray-chicken.cyclic.app//customers/${userID}`,
            // `/customers/${userID}`,
            {
              cart,
              wishlist,
            }
          );
        } catch (error) {
          console.error("Error:", error);
        }
      };

      setTimeout(() => {
        updateData();
      }, 100);
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
