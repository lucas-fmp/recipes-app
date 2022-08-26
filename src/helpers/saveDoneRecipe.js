const saveRecipe = (recipeData, id, path) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) !== null
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];

  const doneRecipesFilter = doneRecipes !== false
    ? doneRecipes.filter((recipe) => recipe.id === id) : [];

  const data = new Date(Date.now());

  if (doneRecipesFilter.length === 0) {
    const doneRecipeObj = {
      id,
      type: path.replace('s', ''),
      nationality: recipeData.strArea ? recipeData.strArea : '',
      category: recipeData.strCategory ? recipeData.strCategory : '',
      alcoholicOrNot: recipeData.strAlcoholic ? recipeData.strAlcoholic : '',
      name: recipeData.strDrink ? recipeData.strDrink : recipeData.strMeal,
      image: recipeData.strDrinkThumb
        ? recipeData.strDrinkThumb : recipeData.strMealThumb,
      doneDate: data,
      tags: recipeData.strTags,
    };

    localStorage
      .setItem('doneRecipes', JSON
        .stringify([...doneRecipes, doneRecipeObj]));
  }
  if (doneRecipesFilter.length !== 0) {
    const removeDOneRecipe = doneRecipes.filter((recipe) => recipe.id !== id);
    localStorage
      .setItem('doneRecipes', JSON
        .stringify(removeDOneRecipe));
  }
};

export default saveRecipe;
