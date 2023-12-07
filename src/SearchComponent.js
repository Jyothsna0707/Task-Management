// SearchComponent.js
import React, { useEffect, useState } from 'react';
import './SearchComponent.css'; // Import your CSS file for styling

const SearchComponent = ({onChangeText = () => {}}) => {
  return (
    <div className={`search-container`}>
      {/* <img src='https://cdn-icons-png.flaticon.com/128/149/149852.png' className="search-icon" onClick={handleIconClick} /> */}
      {/* {isExpanded && ( */}

        <input
          type="text"
          id='myInput'
          className="search-input"
          placeholder="Search Task"
        />
      {/* )} */}
    </div>
  );
};

export default SearchComponent;
