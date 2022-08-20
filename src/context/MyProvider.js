import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  const value = {
    recipes, setRecipes, categories, setCategories,
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
