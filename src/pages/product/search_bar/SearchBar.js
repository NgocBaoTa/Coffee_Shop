/** @format */

import React from "react";
import "./search_bar.css";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar(props) {
  return (
    <div className="grid wide">
      <div className="search_bar--container">
        <form onSubmit={props.submitSearch}>
          <input
            className="search_bar--input"
            placeholder="Search..."
            value={props.searchText}
            onChange={(e) => props.setSearchText(e.target.value)}
          />
        </form>

        <div className="search_bar--icon-ctn">
          <SearchIcon
            className="search_bar--icon"
            sx={{ fontSize: 30 }}
            onClick={props.submitSearch}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
