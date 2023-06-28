/** @format */

import React, { useState, useEffect, useContext } from "react";
import "./product.css";
import Header from "./product_header/Header";
import SearchBar from "./search_bar/SearchBar";
import ProductList from "./product_list/ProductList";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { LoginContext } from "../../context/AuthContext";

function Product() {
  const [searchText, setSearchText] = useState("");

  const { wishlist, setWishList } = useContext(LoginContext);
  const [products, setProducts] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      let data = await axios.get(
        "https://coffee-shop-ony3.onrender.com/products?categoryName=Product"
      );

      if (user) {
        let productArr = data.data;
        wishlist.forEach((item) => {
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
      console.log("create account");
    }
  };

  const searchProduct = async () => {
    try {
      const data = await axios.get(
        `https://coffee-shop-ony3.onrender.com/products/search?searchText=${searchText}`
      );

      if (user) {
        let productArr = data.data;
        wishlist.forEach((item) => {
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
      // setSearchText("");
    } else {
      fetchData();
    }
  };

  return (
    <div className="product_container">
      <Header />
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        submitSearch={submitSearch}
      />
      <ProductList products={products} handleLikedClick={handleLikedClick} />
      <Footer />
    </div>
  );
}

export default Product;
