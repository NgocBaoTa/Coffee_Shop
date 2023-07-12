/** @format */

import React, { useState, useEffect, useContext } from "react";
import "./product.css";
import Header from "./product_header/Header";
import SearchBar from "./search_bar/SearchBar";
import ProductList from "./product_list/ProductList";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { LoginContext } from "../../context/AuthContext";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { AlertContext } from "../../context/AlertContext";

function Product() {
  // ALERT  -  start
  // const [openAddCart, setOpenAddCart] = useState(false);
  // const [openAlertLogin, setOpenAlertLogin] = useState(false);

  // const handleCloseAddCart = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpenAddCart(false);
  // };

  // const handleCloseAlertLogin = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpenAlertLogin(false);
  // };
  // ALERT  -  end

  const {
    openAddCart,
    openAlertLogin,
    handleCloseAddCart,
    handleCloseAlertLogin,
    setOpenAlertLogin,
    setOpenAddCart,
  } = useContext(AlertContext);

  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { setWishList, setCart, cart, wishlist } = useContext(LoginContext);
  const [products, setProducts] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      let data = await axios.get(
        "https://127.0.0.1:5000/products"
        // "https://coffee-shop-ony3.onrender.com/products?categoryName=Product"
      );

      if (user) {
        let productArr = data.data;
        user.wishlist.forEach((item) => {
          const product = productArr.find((p) => p._id === item);
          if (product) {
            product.isLiked = true;
          }
        });

        productArr.forEach((item) => {
          if (!item.isLiked) {
            item.isLiked = false;
          }
        });
        setProducts(productArr);
      } else {
        setProducts(data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLikedClick = (id, index) => {
    if (user) {
      setWishList((prevWishlist) => {
        const newWishlist = [...prevWishlist];
        const newLikedProducts = [...products];

        if (newLikedProducts[index].isLiked === false) {
          newLikedProducts[index].isLiked = true;
          newWishlist.push(id);
        } else {
          newLikedProducts[index].isLiked = false;
          const indexToRemove = newWishlist.indexOf(id);
          if (indexToRemove !== -1) {
            newWishlist.splice(indexToRemove, 1);
          }
        }

        const updatedUser = { ...user, wishlist: newWishlist };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setProducts(newLikedProducts);

        return newWishlist;
      });
    } else {
      setOpenAlertLogin(true);
    }
  };

  // const handleLikedClick = (id, index) => {
  //   if (user) {
  //     const newWishlist = wishlist;
  //     const newLikedProducts = [...products];
  //     if (newLikedProducts[index].isLiked === false) {
  //       newLikedProducts[index].isLiked = true;
  //       newWishlist.push(id);
  //       setWishList(newWishlist);
  //     } else {
  //       newLikedProducts[index].isLiked = false;
  //       newWishlist.forEach((item, idx) => {
  //         if (item === id) {
  //           newWishlist.splice(idx, 1);
  //           return;
  //         }
  //       });
  //       setWishList(newWishlist);
  //     }
  //     const updatedUser = { ...user, wishlist: newWishlist };
  //     localStorage.setItem("user", JSON.stringify(updatedUser));
  //     setProducts(newLikedProducts);
  //     console.log(newLikedProducts[index].isLiked);
  //   } else {
  //     console.log("create account");
  //   }
  // };

  const searchProduct = async () => {
    try {
      const data = await axios.get(
        `https://coffee-shop-ony3.onrender.com/products/search?searchText=${searchText}`
      );

      if (user) {
        let productArr = data.data;
        user.wishlist.forEach((item) => {
          const product = productArr.find((p) => p._id === item);
          if (product) {
            product.isLiked = true;
          }
        });

        productArr.forEach((item) => {
          if (!item.isLiked) {
            item.isLiked = false;
          }
        });
        setProducts(productArr);
      } else {
        setProducts(data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (searchText.length > 0) {
      searchProduct();
      setShowSearch(true);
      // setSearchText("");
    } else {
      fetchData();
    }
  };

  const handleClickCart = (id, noItem) => {
    if (user) {
      setCart((prevCart) => {
        const newCart = [...prevCart];

        let index = -1;
        newCart.forEach((item, idx) => {
          if (item.productID === id) {
            index = idx;
            return;
          }
        });
        if (index !== -1) {
          newCart[index].no += noItem;
        } else {
          let newProduct = {};
          newProduct.productID = id;
          newProduct.no = noItem;
          newCart.push(newProduct);
        }

        const updatedUser = { ...user, cart: newCart };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        return newCart;
      });

      setOpenAddCart(true);
    } else {
      setOpenAlertLogin(true);
    }
  };

  // const handleClickCart = (id, noItem) => {
  //   if (user) {
  //     const newCart = cart;

  //     let index = -1;
  //     newCart.forEach((item, idx) => {
  //       if (item.productID === id) {
  //         index = idx;
  //         return;
  //       }
  //     });
  //     if (index !== -1) {
  //       newCart[index].no += noItem;
  //     } else {
  //       let newProduct = {};
  //       newProduct.productID = id;
  //       newProduct.no = noItem;
  //       newCart.push(newProduct);
  //     }

  //     const updatedUser = { ...user, cart: newCart };
  //     localStorage.setItem("user", JSON.stringify(updatedUser));
  //     setCart([...newCart]);

  //     setOpenAddCart(true);
  //   } else {
  //     setOpenAlertLogin(true);
  //   }
  // };

  return (
    <div className="product_container">
      <Snackbar
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
      </Snackbar>

      <Header />
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        submitSearch={submitSearch}
      />
      <ProductList
        products={products}
        handleLikedClick={handleLikedClick}
        handleClickCart={handleClickCart}
        showSearch={showSearch}
      />
      <Footer />
    </div>
  );
}

export default Product;
