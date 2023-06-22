/** @format */

import React, { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";

const LoginContext = createContext();

function LoginProvider({ children }) {
  //const [signup, setSignup] = useState(true);

  const [login, setLogin] = useState(
    localStorage.getItem("user") ? Boolean(localStorage.getItem("user")) : false
  );

  if (login) {
  }
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (login) {
      const updateData = async () => {
        try {
          let data = await axios.put(
            "https://coffee-shops.herokuapp.com/customers/",
            {
              wishlist: user.wishlist,
            }
          );

          // console.log(data.data);
        } catch (error) {
          console.log(error.message);
        }
      };

      updateData();
    }
  }, [login]);

  return (
    <div>
      <LoginContext.Provider
        value={{
          login,
          setLogin: (value) => setLogin(value),
          //signup,
          //setSignup,
        }}
      >
        {children}
      </LoginContext.Provider>
    </div>
  );
}

export { LoginContext, LoginProvider };
