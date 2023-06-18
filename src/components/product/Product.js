import React from 'react'
import "./product.css"
import Header from './product_header/Header'
import SearchBar from './search_bar/SearchBar';
import ProductList from './product_list/ProductList';
import Footer from '../footer/Footer';


function Product() {
  return (
    <div className="product_container">
      <Header />
      <SearchBar />
      <ProductList />
      <Footer />
    </div>
  );
}

export default Product