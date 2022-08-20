import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';

function Recipes() {
  const history = useHistory();
  const path = history.location.pathname;
  const { recipes, setRecipes, categories, setCategories } = useContext(MyContext);
  const maxRecipes = 12;
  const maxCategories = 5;

  useEffect(() => {
    const fetchAPI = async () => {
      if (path === '/foods') {
        const responseFoods = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const dataFoods = await responseFoods.json();
        const slicedArrayFoods = dataFoods.meals.slice(0, maxRecipes);
        setRecipes(slicedArrayFoods);

        const responseCategories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const dataCategories = await responseCategories.json();
        const slicedArrayCategories = dataCategories.meals.slice(0, maxCategories);
        setCategories(slicedArrayCategories);
      }
      if (path === '/drinks') {
        const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const dataDrinks = await responseDrinks.json();
        const slicedArrayDrinks = dataDrinks.drinks.slice(0, maxRecipes);
        setRecipes(slicedArrayDrinks);

        const responseCategories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const dataCategories = await responseCategories.json();
        const slicedArrayCategories = dataCategories.drinks.slice(0, maxCategories);
        setCategories(slicedArrayCategories);
      }
    };
    fetchAPI();
  }, []);

  return (
    <div>
      <button type="button">All</button>
      {
        categories.map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>
        ))
      }
      {
        recipes.map((recipe, index) => {
          const thumb = recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb;
          const name = recipe.strMeal ? recipe.strMeal : recipe.strDrink;
          return (
            <div data-testid={ `${index}-recipe-card` } key={ name }>
              <img src={ thumb } alt={ name } data-testid={ `${index}-card-img` } />
              <p data-testid={ `${index}-card-name` }>{name}</p>
            </div>
          );
        })
      }
    </div>
  );
}

export default Recipes;
