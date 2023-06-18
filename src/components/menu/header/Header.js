import React from 'react'
import "./header.css"
import Nav from '../../home_page/header/Nav'

function Header() {
  return (
    <div className='menu_header--img'>
      <div className='menu_header--nav'>
        <Nav />
        </div>
    </div>
  )
}

export default Header