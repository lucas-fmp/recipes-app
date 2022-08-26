export const verifyingDoneRecipes = (id) => {
  const doneRecipes = JSON
    .parse(localStorage.getItem('doneRecipes')) !== null
    && JSON.parse(localStorage.getItem('doneRecipes'));

  const doneRecipesFilter = doneRecipes !== false
    ? doneRecipes.filter((recipe) => recipe.id === id) : [];

  return doneRecipesFilter.length === 0;
};

export const verifyingInProgressRecipes = (id, path) => {
  const inProgressRecipes = JSON
    .parse(localStorage.getItem('inProgressRecipes')) !== null
  && JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (path === 'foods') {
    const inProgressRecipesObj = inProgressRecipes !== false
      ? inProgressRecipes.meals : {};
    const verifyId = !!inProgressRecipesObj[id];
    return verifyId;
  }

  if (path === 'drinks') {
    const inProgressRecipesObj = inProgressRecipes !== false
      ? inProgressRecipes.cocktails : {};
    const verifyId = !!inProgressRecipesObj[id];
    return verifyId;
  }
};

export const verifyingFavoriteRecipes = (id) => {
  const favoriteRecipes = JSON
    .parse(localStorage.getItem('favoriteRecipes')) !== null
    && JSON.parse(localStorage.getItem('favoriteRecipes'));

  const favoriteRecipesFilter = favoriteRecipes !== false
    ? favoriteRecipes.filter((recipe) => recipe.id === id) : [];

  return favoriteRecipesFilter.length !== 0;
};
