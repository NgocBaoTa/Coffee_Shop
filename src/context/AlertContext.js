/** @format */

import React, { useState } from "react";
import { createContext } from "react";

const AlertContext = createContext();

function AlertProvider({ children }) {
  const [openAddCard, setOpenAddCard] = useState(false);
  const [openAlertLogin, setOpenAlertLogin] = useState(false);

  const handleCloseAddCard = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAddCard(false);
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
          openAddCard,
          openAlertLogin,
          handleCloseAddCard,
          handleCloseAlertLogin,
          setOpenAddCard,
          setOpenAlertLogin,
        }}
      >
        {children}
      </AlertContext.Provider>
    </div>
  );
}

export { AlertContext, AlertProvider };
