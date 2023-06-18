import React from 'react'
import "./singleItem.css"

function SingleItem(props) {
  return (
      <div className='singleItem_container'>
          <img className='singleItem_img' src={props.src} alt="coffee" />
          <div className='singleItem_main'>
              <div className='singleItem_main--name'>{props.name}</div>
              <div className='singleItem_main--description'>{props.description}</div>
              <div className='singleItem_main--price'>${props.price}</div>
          </div>
    </div>
  )
}

export default SingleItem