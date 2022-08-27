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
  const [recipeData, setRecipeData] = useState([]);
  const [urlVideo, setUrlVideo] = useState('');
  const [recomendationRecipes, setRecomendationRecipes] = useState([]);
  const [renderButton, setRenderButton] = useState(true);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [recipeId, setRecipeId] = useState('');
  const [doneRecipes, setDoneRecipes] = useState([]);

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
    recipeData,
    setRecipeData,
    urlVideo,
    setUrlVideo,
    recomendationRecipes,
    setRecomendationRecipes,
    renderButton,
    setRenderButton,
    inProgressRecipe,
    setInProgressRecipe,
    isFavorited,
    setIsFavorited,
    recipeId,
    setRecipeId,
    doneRecipes,
    setDoneRecipes,
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
