/** @format */

import React, {useEffect, useRef} from "react";
import "./search_bar.css";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar(props) {
  const inputRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 13 && document.activeElement === inputRef.current) {
        props.submitSearch(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.searchText]);
  return (
    <div className="grid wide">
      <div className="search_bar--container">
        <form onSubmit={props.submitSearch}>
          <input
            ref={inputRef}
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
