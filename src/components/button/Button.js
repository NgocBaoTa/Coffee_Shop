import React from 'react'
import "./button.css"

function Button(props) {
  return (
      <button className='button_format'>{props.name}</button>
  )
}

export default Button