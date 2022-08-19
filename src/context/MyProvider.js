import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchedFoods, setSearchedFoods] = useState([]);

  const value = {
    recipes,
    setRecipes,
    categories,
    setCategories,
    filteredRecipes,
    setFilteredRecipes,
    setSearchedFoods,
    searchedFoods,
  };

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
