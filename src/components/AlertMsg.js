/** @format */

import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { AlertContext } from "../context/AlertContext";

function AlertMsg() {
  const {
    openAddCard,
    openAlertLogin,
    handleCloseAddCard,
    handleCloseAlertLogin,
  } = useContext(AlertContext);
  
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAddCard}
        onClose={handleCloseAddCard}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleCloseAddCard}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product is added to card!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAlertLogin}
        onClose={handleCloseAlertLogin}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleCloseAlertLogin}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Please login to continue!
        </Alert>
      </Snackbar>
    </>
  );
}

export default AlertMsg;
