export const requestFoodById = async (id) => {
  const responseFoods = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const dataFoods = await responseFoods.json();
  return dataFoods.meals[0];
};

export const requestAllFoods = async () => {
  const responseFoods = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const dataFoods = await responseFoods.json();
  return dataFoods.meals;
};

export const requestDrinkById = async (id) => {
  const responseDrinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const dataDrinks = await responseDrinks.json();
  return dataDrinks.drinks[0];
};

export const requestAllDrinks = async () => {
  const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const dataDrinks = await responseDrinks.json();
  return dataDrinks.drinks;
};
