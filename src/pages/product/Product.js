/** @format */

import React, { useState, useEffect } from "react";
import "./product.css";
import SearchBar from "./search_bar/SearchBar";
import ProductList from "./product_list/ProductList";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { Support } from "../../Support";
import AlertMsg from "../../components/AlertMsg";
import Nav from "../../components/header/Nav";

function Product() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));

  const {
    handleCloseAddCart,
    handleCloseAlertLogin,
    handleClickCart,
    handleLikedClick,
    openAddCart,
    openAlertLogin,
  } = Support();

  const fetchData = async () => {
    try {
      let data = await axios.get(
        "https://coffee-shop-5r5c.onrender.com/products?categoryName=Product"
        // "/products?categoryName=Product"
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

  const searchProduct = async () => {
    try {
      const data = await axios.get(
        `https://coffee-shop-5r5c.onrender.com/products/search?searchText=${searchText}`
        // `/products/search?searchText=${searchText}`
        // `https://coffee-shop-ony3.onrender.com/products/search?searchText=${searchText}`
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
    } else {
      fetchData();
    }
  };

  return (
    <div className="product_container">
      <AlertMsg
        openAddCart={openAddCart}
        openAlertLogin={openAlertLogin}
        handleCloseAddCart={handleCloseAddCart}
        handleCloseAlertLogin={handleCloseAlertLogin}
      />

      <div className="product_header--img">
        <div className="product_header--nav">
          <Nav />
        </div>
      </div>

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
        setProducts={setProducts}
      />
      <Footer />
    </div>
  );
}

export default Product;
