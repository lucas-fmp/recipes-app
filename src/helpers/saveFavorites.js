const addFavoriteRecipe = (recipeData, id, path) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

  const favoriteRecipesFilter = favoriteRecipes !== false
    ? favoriteRecipes.filter((recipe) => recipe.id === id) : [];

  if (favoriteRecipesFilter.length === 0) {
    const favoriteRecipeObj = {
      id,
      type: path.replace('s', ''),
      nationality: recipeData.strArea ? recipeData.strArea : '',
      category: recipeData.strCategory ? recipeData.strCategory : '',
      alcoholicOrNot: recipeData.strAlcoholic ? recipeData.strAlcoholic : '',
      name: recipeData.strDrink ? recipeData.strDrink : recipeData.strMeal,
      image: recipeData.strDrinkThumb
        ? recipeData.strDrinkThumb : recipeData.strMealThumb,
    };

    localStorage
      .setItem('favoriteRecipes', JSON
        .stringify([...favoriteRecipes, favoriteRecipeObj]));
  }
  if (favoriteRecipesFilter.length !== 0) {
    const removeFavorite = favoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage
      .setItem('favoriteRecipes', JSON
        .stringify(removeFavorite));
  }
};

export default addFavoriteRecipe;
