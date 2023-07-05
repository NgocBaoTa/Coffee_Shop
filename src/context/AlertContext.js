/** @format */

import React, { useState } from "react";
import { createContext } from "react";

const AlertContext = createContext();

function AlertProvider({ children }) {
  const [openAddCart, setOpenAddCart] = useState(false);
  const [openAlertLogin, setOpenAlertLogin] = useState(false);

  const handleCloseAddCart = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAddCart(false);
  };

  const handleCloseAlertLogin = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertLogin(false);
  };

  return (
    <div>
      <AlertContext.Provider
        value={{
          openAddCart,
          openAlertLogin,
          handleCloseAddCart,
          handleCloseAlertLogin,
          setOpenAddCart,
          setOpenAlertLogin,
        }}
      >
        {children}
      </AlertContext.Provider>
    </div>
  );
}

export { AlertContext, AlertProvider };
