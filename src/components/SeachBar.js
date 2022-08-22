import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext';

function verificaData(data, title) {
  if (data.length === 1 && title === 'Foods') {
    <Redirect to={ `foods/${data[0].id}` } />;
  } else if (data.length === 1 && title === 'Drinks') {
    <Redirect to={ `drinks/${data[0].id}` } />;
  }
}

function noFoods(data) {
  if (data.length === 0) {
    alert('Sorry, we haven\'t found any recipes for these filters.\'');
  }
}

function SearchBar(title) {
  const [searchInput, setSearchInput] = useState('');
  const [radioName, setRadioName] = useState('');
  const { setSearchedFoods } = useContext(MyContext);

  async function searchFoods() {
    if (radioName === 'Ingredient') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      const data = response.json();
      setSearchedFoods(data);
      noFoods(data);
      verificaData(data, title);
    }
    if (radioName === 'Name') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
      const data = response.json();
      setSearchedFoods(data);
      noFoods(data);
      verificaData(data, title);
    }
    if (radioName === 'first letter' && searchInput.length > 1) {
      alert('Your search must have only 1 (one) character');
    }
    if (radioName === 'First letter' && searchInput.length === 1) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
      const data = response.json();
      setSearchedFoods(data);
      noFoods(data);
      verificaData(data, title);
    }
  }
  async function searchDrinks() {
    if (radioName === 'Ingredient') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      const data = response.json();
      setSearchedFoods(data);
      noFoods(data);
      verificaData(data, title);
    }
    if (radioName === 'Name') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
      const data = response.json();
      setSearchedFoods(data);
      noFoods(data);
      verificaData(data, title);
    }
    if (radioName === 'first letter' && searchInput.length > 1) {
      alert('Your search must have only 1 (one) character');
    }
    if (radioName === 'First letter' && searchInput.length === 1) {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
      const data = response.json();
      setSearchedFoods(data);
      noFoods(data);
      verificaData(data, title);
    }
  }

  function SearchItems() {
    if (title === 'Foods') {
      searchFoods();
    } else if (title === 'Drinks') {
      searchDrinks();
    }
  }

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ (e) => setSearchInput(e.target.value) }
        value={ searchInput }
      />
      <label htmlFor="ingredient">
        ingredient
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="Ingredient"
          onClick={ (e) => setRadioName(e.target.name) }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          name="Name"
          onClick={ (e) => setRadioName(e.target.name) }
        />
      </label>
      <label htmlFor="First Letter">
        First Letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="First letter"
          onClick={ (e) => setRadioName(e.target.name) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => SearchItems() }
      >
        Seach
      </button>
    </div>
  );
}

export default SearchBar;
