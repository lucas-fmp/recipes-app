const addDoneRecipe = (recipeData, id, path, doneRecipes) => {
  const doneRecipeObj = {
    id,
    type: path.replace('s', ''),
    nationality: recipeData.strArea ? recipeData.strArea : '',
    category: recipeData.strCategory ? recipeData.strCategory : '',
    alcoholicOrNot: recipeData.strAlcoholic ? recipeData.strAlcoholic : '',
    name: recipeData.strDrink ? recipeData.strDrink : recipeData.strMeal,
    image: recipeData.strDrinkThumb
      ? recipeData.strDrinkThumb : recipeData.strMealThumb,
    doneDate: new Date(Date.now()),
    tags: recipeData.strTags ? recipeData.strTags.split(',') : [],
  };

  localStorage
    .setItem('doneRecipes', JSON
      .stringify([...doneRecipes, doneRecipeObj]));
};

const rmvDoneRecipe = (doneRecipes, id) => {
  const removeDoneRecipe = doneRecipes.filter((recipe) => recipe.id !== id);
  localStorage
    .setItem('doneRecipes', JSON
      .stringify(removeDoneRecipe));
};

const saveRecipe = (recipeData, id, path) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) !== null
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];

  const doneRecipesFilter = doneRecipes !== false
    ? doneRecipes.filter((recipe) => recipe.id === id) : [];

  if (doneRecipesFilter.length === 0) {
    addDoneRecipe(recipeData, id, path, doneRecipes);
  }
  if (doneRecipesFilter.length !== 0) {
    rmvDoneRecipe(doneRecipes, id);
  }
};

export default saveRecipe;
