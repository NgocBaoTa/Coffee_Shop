/** @format */

import React, { useContext, useState } from "react";
import "./order_item.css";
import CheckoutItem from "../../checkout_page/checkout_item/CheckoutItem";
import { LoginContext } from "../../../context/AuthContext";
import { Support } from "../../../Support";
import AlertMsg from "../../../components/AlertMsg";

function OrderItem(props) {
  let user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState(props.products);
  const {
    handleCloseAddCart,
    handleCloseAlertLogin,
    handleClickCart,
    openAddCart,
    openAlertLogin,
    setOpenAlertLogin,
  } = Support();

  const { setWishList } = useContext(LoginContext);

  const handleLikedClick = (id, index) => {
    if (user) {
      setWishList((prevWishlist) => {
        const newWishlist = [...prevWishlist];
        const newProductList = [...products];

        if (newProductList[index].productID.isLiked === false) {
          newProductList[index].productID.isLiked = true;
          newWishlist.push(id);
        } else {
          newProductList[index].productID.isLiked = false;
          const indexToRemove = newWishlist.indexOf(id);
          if (indexToRemove !== -1) {
            newWishlist.splice(indexToRemove, 1);
          }
        }

        const updatedUser = { ...user, wishlist: newWishlist };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setProducts(newProductList);

        return newWishlist;
      });
    } else {
      setOpenAlertLogin(true);
    }
  };

  return (
    <>
      <AlertMsg
        openAddCart={openAddCart}
        openAlertLogin={openAlertLogin}
        handleCloseAddCart={handleCloseAddCart}
        handleCloseAlertLogin={handleCloseAlertLogin}
      />

      <div className="order_item--container">
        <div className="l-3 m-4 c-12">
          <div className="order_item--info col">
            <div className="order_item--heading">Shipping Information</div>
            <div className="order_item--main">
              <div className="order_info--name">{props.receiver}</div>
              <div>{props.phone}</div>
              <div>
                {props.address}, {props.postalCode}
              </div>
            </div>
          </div>
        </div>

        <div className="l-9 m-8 c-12">
          <div className="order_product--list col">
            {products.map((item, index) => {
              return (
                <CheckoutItem
                  key={item.productID._id}
                  src={item.productID.productImage}
                  name={item.productID.productName}
                  quantity={item.noOfItems}
                  id={item.productID._id}
                  price={item.productID.productPrice.toFixed(2)}
                  isLiked={
                    item.productID.isLiked ? item.productID.isLiked : false
                  }
                  description={
                    item.productID.productDescription.description
                      ? item.productID.productDescription.description
                      : null
                  }
                  story={
                    item.productID.productDescription.story
                      ? item.productID.productDescription.story
                      : null
                  }
                  details={
                    item.productID.productDescription.details
                      ? item.productID.productDescription.details
                      : null
                  }
                  productQuantity={item.productID.productQuantity}
                  productSold={item.productID.productSold}
                  handleLikedClick={handleLikedClick}
                  index={index}
                  handleClickCart={handleClickCart}
                  products={products}
                  setProducts={setProducts}
                />
              );
            })}
            <div className="order_total">
              <span style={{ fontWeight: 600 }}>Total: &nbsp;</span> $
              {(props.subtotal * 1.13).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderItem;
