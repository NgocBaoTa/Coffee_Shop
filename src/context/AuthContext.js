/** @format */

import React, { useState } from "react";
import { createContext } from "react";

const LoginContext = createContext();

function LoginProvider({ children }) {
  //const [signup, setSignup] = useState(true);

  const [login, setLogin] = useState(
    localStorage.getItem("user") ? Boolean(localStorage.getItem("user")) : false
  );

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
