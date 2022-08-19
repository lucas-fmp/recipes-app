import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import SearchBar from './SeachBar';

function Header(title, search) {
  const sendProfile = () => {
    <Redirect to="/profile" />;
  };

  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div>
      <h1 data-testid="page-title">{ title }</h1>
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ sendProfile }
      >
        <img
          src="src/images/profileIcon.svg"
          alt="icone de perfil"
        />
      </button>
      { search && (
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ setShowSearchBar(!showSearchBar) }
        >
          <img
            src="src/images/searchIcon.svg"
            alt="icone de perfil"
          />
        </button>
      )}
      { showSearchBar && <SearchBar title={ title } /> }
    </div>
  );
}

export default Header;
