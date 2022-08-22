import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
<<<<<<< HEAD
  const [searchedFoods, setSearchedFoods] = useState([]);
=======
>>>>>>> 27fe9f8 (Recipes Page - completed)

  const value = {
    recipes,
    setRecipes,
    categories,
    setCategories,
<<<<<<< HEAD
    filteredRecipes,
    setFilteredRecipes,
=======
<<<<<<< HEAD
>>>>>>> 27fe9f8 (Recipes Page - completed)
    setSearchedFoods,
    searchedFoods,
=======
    filteredRecipes,
    setFilteredRecipes,
>>>>>>> fdc2bb5 (Recipes Page - completed)
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
