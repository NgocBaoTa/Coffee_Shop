/** @format */

import React, { useState, useEffect } from "react";
import "./order.css";
import Nav from "../../components/header/Nav";
import axios from "axios";
import OrderItem from "./order_item/OrderItem";

function Order() {
  const [orders, setOrders] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      let data = await axios.get(`/orders/search?customerID=${user.userID}`);

      let orderList = data.data;
      orderList.forEach((order) => {
        let products = order.orderProducts;
        user.wishlist.forEach((item) => {
          const product = products.find((p) => p.productID._id === item);
          if (product) {
            product.productID.isLiked = true;
          }
        });

        products.forEach((item) => {
          if (!item.productID.isLiked) {
            item.productID.isLiked = false;
          }
        });
      });
      setOrders(orderList);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="order_header">
        <Nav />
      </div>
      <div className="order_container grid wide">
        <div
          className="order_heading"
          onClick={() => console.log("ORDER: ", orders)}
        >
          Your Orders
        </div>
        <div className="order_main">
          {orders.map((item) => {
            return (
              <OrderItem
                key={item._id}
                address={item.orderAddress}
                phone={item.orderPhone}
                receiver={item.orderReceiver}
                postalCode={item.orderPostalCode}
                subtotal={item.orderSubtotal}
                products={item.orderProducts}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Order;
