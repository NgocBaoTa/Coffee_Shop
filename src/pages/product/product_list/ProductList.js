/** @format */

import React from "react";
import "./product_list.css";
import SingleCard from "../../../components/single_card/SingleCard";

function ProductList(props) {

  return (
    <div className="grid wide">
      <div className="productList_container">
        {props.products.length === 0 && props.showSearch ? (
          <div className="productList_notfound">Product not found!</div>
        ) : (
          props.products.map((item, index) => {
            return (
              <SingleCard
                id={item._id}
                src={item.productImage}
                name={item.productName}
                price={item.productPrice.toFixed(2)}
                key={item._id}
                isLiked={item.isLiked ? item.isLiked : false}
                description={
                  item.productDescription.description
                    ? item.productDescription.description
                    : null
                }
                story={
                  item.productDescription.story
                    ? item.productDescription.story
                    : null
                }
                details={
                  item.productDescription.details
                    ? item.productDescription.details
                    : null
                }
                productQuantity={item.productQuantity}
                productSold={item.productSold}
                handleLikedClick={props.handleLikedClick}
                index={index}
                handleClickCart={props.handleClickCart}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default ProductList;
