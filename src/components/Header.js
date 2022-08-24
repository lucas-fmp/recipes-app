import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const {
    title, search, showHeader,
  } = useContext(MyContext);
  const newTitle = title.length > 0 ? title[0].toUpperCase() + title.substr(1) : '';
  const history = useHistory();
  const sendProfile = () => {
    history.push('/profile');
  };

  return (
    <div>
      { showHeader && (
        <div>
          <h1 data-testid="page-title">{ newTitle }</h1>
          <button
            type="button"
            onClick={ sendProfile }
            alt="icone de perfil"
          >
            <img src={ profileIcon } data-testid="profile-top-btn" alt="profile-icon" />
          </button>
          {
            search && (
              <button
                type="button"
                onClick={ () => setShowSearchBar(!showSearchBar) }
                alt="icone de pesquisa"
              >
                <img data-testid="search-top-btn" src={ searchIcon } alt="search-icon" />
              </button>
            )
          }
        </div>
      )}
      { showSearchBar && <SearchBar /> }
    </div>
  );
}

export default Header;
