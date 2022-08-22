import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import SearchBar from './SeachBar';
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
            data-testid="profile-top-btn"
            onClick={ sendProfile }
            src={ profileIcon }
            alt="icone de perfil"
          >
            Profile
          </button>
          {
            search && (
              <button
                type="button"
                data-testid="search-top-btn"
                onClick={ () => setShowSearchBar(!showSearchBar) }
                src={ searchIcon }
                alt="icone de pesquisa"
              >
                Search
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
