/** @format */

import React from "react";
import "./search_bar.css";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  return (
    <div className="grid wide">
      <div className="search_bar--container">
        <input className="search_bar--input" placeholder="Search..." />

        <div className="search_bar--icon-ctn">
          <SearchIcon className="search_bar--icon" sx={{ fontSize: 30 }} />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
