import React from 'react'
import "./singleItem.css"

function SingleItem(props) {
  return (
    <div className="singleItem l-2-4 m-4 c-6 c-2-6 col">
      <div className="singleItem_container">
        <img className="singleItem_img" src={props.src} alt="coffee" />
        <div className="singleItem_main">
          <div className="singleItem_main--name">{props.name}</div>
          <div className="singleItem_main--description">{props.description}</div>
          <div className="singleItem_main--price">${props.price}</div>
        </div>
      </div>
    </div>
  );
}

export default SingleItem