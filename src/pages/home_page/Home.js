/** @format */

import React, { useContext } from "react";
import "./home.css";
import Header from "../../components/header/Header";
import Discover from "./discover_part/Discover";
import Style from "./coffee_style/Style";
import Recommended from "./recommended/Recommended";
import Chance from "./chance_part/Chance";
import Footer from "../../components/footer/Footer";
import { AlertContext } from "../../context/AlertContext";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import AlertMsg from "../../components/AlertMsg";
import { Support } from "../../Support";

function Home() {
  const {
    openAddCart,
    openAlertLogin,
    handleCloseAddCart,
    handleCloseAlertLogin,
    setOpenAlertLogin,
    setOpenAddCart,
  } = useContext(AlertContext);
  //  const {
  //    handleChangeCart,
  //    handleCloseAddCart,
  //    handleCloseAlertLogin,
  //    handleDeleteProduct,
  //    handleClickCart,
  //    handleLikedClick,
  //    openAddCart,
  //    openAlertLogin,
  //  } = Support();

  return (
    <div className="home_page">
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
      <Discover />
      <Style
        // setOpenAddCart={setOpenAddCart}
        // setOpenAlertLogin={setOpenAlertLogin}
      />
      <Recommended
        // setOpenAddCart={setOpenAddCart}
        // setOpenAlertLogin={setOpenAlertLogin}
      />
      <Chance />
      <Footer />
    </div>
  );
}

export default Home;
