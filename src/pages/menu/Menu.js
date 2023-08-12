/** @format */

import React, { useContext } from "react";
import "./menu.css";
import Header from "./header/Header";
import CoffeeMenu from "./coffee_menu/CoffeeMenu";
import BestSeller from "./best_seller/BestSeller";
import Pastry from "./pastry/Pastry";
import Footer from "../../components/footer/Footer";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { AlertContext } from "../../context/AlertContext";

function Menu() {
  // const {
  //   openAddCart,
  //   openAlertLogin,
  //   handleCloseAddCart,
  //   handleCloseAlertLogin,
  //   setOpenAlertLogin,
  //   setOpenAddCart,
  // } = useContext(AlertContext);

  return (
    <div className="menu_container">
      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAddCart}
        onClose={handleCloseAddCart}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleCloseAddCart}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product is added to cart!
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
      </Snackbar> */}

      <Header />
      <CoffeeMenu
        // setOpenAddCart={setOpenAddCart}
        // setOpenAlertLogin={setOpenAlertLogin}
      />
      <BestSeller
        // setOpenAddCart={setOpenAddCart}
        // setOpenAlertLogin={setOpenAlertLogin}
      />
      <Pastry
        // setOpenAddCart={setOpenAddCart}
        // setOpenAlertLogin={setOpenAlertLogin}
      />
      <Footer />
    </div>
  );
}

export default Menu;
