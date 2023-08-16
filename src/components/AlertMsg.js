/** @format */

import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function AlertMsg(props) {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.openAddCart}
        onClose={props.handleCloseAddCart}
        autoHideDuration={6000}
      >
        <Alert
          onClose={props.handleCloseAddCart}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product is added to cart!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.openAlertLogin}
        onClose={props.handleCloseAlertLogin}
        autoHideDuration={5000}
      >
        <Alert
          onClose={props.handleCloseAlertLogin}
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
