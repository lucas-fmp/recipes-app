import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const value = {
    recipes,
    setRecipes,
    categories,
    setCategories,
    filteredRecipes,
    setFilteredRecipes,
    title,
    setTitle,
    search,
    setSearch,
    showHeader,
    setShowHeader,
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
