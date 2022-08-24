import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import clipboardCopy from 'clipboard-copy';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const pathWithBars = pathname.replace(/[0-9]/g, ''); // Substitui o que é número por uma string vazia;
  const path = pathWithBars.replace(/[/]/g, ''); // Substitui as barras por string vazia;
  const id = pathname.replace(/\D/g, ''); // Substitui o que não é número por uma string vazia;
  const maxRecipes = 6;

  const { recipeData, setRecipeData } = useContext(MyContext);

  const [urlVideo, setUrlVideo] = useState('');
  const [recomendationRecipes, setRecomendationRecipes] = useState([]);
  const [renderButton, setRenderButton] = useState(true);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const fetchFoods = async () => {
    const responseFoods = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const dataFoods = await responseFoods.json();
    setRecipeData(dataFoods.meals[0]);
    setUrlVideo(dataFoods.meals[0].strYoutube.replace('watch?v=', 'embed/ '));

    const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const dataDrinks = await responseDrinks.json();
    const slicedArrayDrinks = dataDrinks.drinks.slice(0, maxRecipes);
    setRecomendationRecipes(slicedArrayDrinks);
  };

  const fetchDrinks = async () => {
    const responseDrinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const dataDrinks = await responseDrinks.json();
    setRecipeData(dataDrinks.drinks[0]);

    const responseFoods = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const dataFoods = await responseFoods.json();
    const slicedArrayFoods = dataFoods.meals.slice(0, maxRecipes);
    setRecomendationRecipes(slicedArrayFoods);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      if (path === 'foods') {
        fetchFoods();
      }

      if (path === 'drinks') {
        fetchDrinks();
      }
    };
    fetchAPI();
  }, []);

  const verifyingDoneRecipes = () => {
    const doneRecipes = JSON
      .parse(localStorage.getItem('doneRecipes')) !== null
      && JSON.parse(localStorage.getItem('doneRecipes'));

    const doneRecipesFilter = doneRecipes !== false
      ? doneRecipes.filter((recipe) => recipe.id === id) : [];

    if (doneRecipesFilter.length !== 0) {
      setRenderButton(false);
    }
  };

  const verifyingInProgressRecipes = () => {
    const inProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes')) !== null
    && JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (path === 'foods') {
      const inProgressRecipesObj = inProgressRecipes !== false
        ? inProgressRecipes.meals : {};
      const verifyId = !!inProgressRecipesObj[id];
      setInProgressRecipe(verifyId);
    }

    if (path === 'drinks') {
      const inProgressRecipesObj = inProgressRecipes !== false
        ? inProgressRecipes.cocktails : {};
      const verifyId = !!inProgressRecipesObj[id];
      setInProgressRecipe(verifyId);
    }
  };

  const verifyingFavoriteRecipes = () => {
    const favoriteRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes')) !== null
      && JSON.parse(localStorage.getItem('favoriteRecipes'));

    const favoriteRecipesFilter = favoriteRecipes !== false
      ? favoriteRecipes.filter((recipe) => recipe.id === id) : [];

    if (favoriteRecipesFilter.length !== 0) {
      setIsFavorited(true);
    }
  };

  useEffect(() => {
    verifyingDoneRecipes();
    verifyingInProgressRecipes();
    verifyingFavoriteRecipes();
  }, [recipeData]);

  const recomendationCards = () => {
    if (path === 'foods') {
      return (
        recomendationRecipes.map((recomendation, index) => (
          <Carousel.Item
            key={ index }
            data-testid={ `${index}-recomendation-card` }
            className="teste"
          >
            <img
              src={ recomendation.strDrinkThumb }
              alt={ recomendation.strDrink }
              className="d-block w-20"
            />
            <h4
              data-testid={ `${index}-recomendation-title` }
            >
              {recomendation.strDrink}
            </h4>
            <p>{recomendation.strAlcoholic}</p>
          </Carousel.Item>
        ))
      );
    }
    if (path === 'drinks') {
      return (
        recomendationRecipes.map((recomendation, index) => (
          <div key={ index } data-testid={ `${index}-recomendation-card` }>
            <img
              src={ recomendation.strMealThumb }
              alt={ recomendation.strMeal }
              className="d-block w-20"
            />
            <h4
              data-testid={ `${index}-recomendation-title` }
            >
              {recomendation.strMeal}
            </h4>
            <p>{recomendation.strCategory}</p>
          </div>
        ))
      );
    }
  };

  const addFavoriteRecipe = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
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
  };

  const recipeDetailsContent = () => {
    const thumb = recipeData
      .strMealThumb ? recipeData.strMealThumb : recipeData.strDrinkThumb;
    const name = recipeData.strMeal ? recipeData.strMeal : recipeData.strDrink;
    const info = recipeData
      .strAlcoholic ? recipeData.strAlcoholic : recipeData.strCategory;

    const entriesAPI = Object.entries(recipeData);

    const ingredientsWithNull = entriesAPI
      .filter((entry) => entry[0].includes('strIngredient'));
    const ingredients = ingredientsWithNull.filter((entry) => entry[1]);

    const measuresWithNull = entriesAPI
      .filter((entry) => entry[0].includes('strMeasure'));
    const measure = measuresWithNull.filter((entry) => entry[1]);

    const instructions = recipeData.strInstructions;

    return (
      <>
        <img src={ thumb } data-testid="recipe-photo" alt={ name } />
        <h1 data-testid="recipe-title">{name}</h1>
        <h4 data-testid="recipe-category">{info}</h4>
        <ul>
          {
            ingredients.map((ingredient, index) => (
              <li
                key={ ingredient }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient[1]}
                {measure[index] && measure[index][1]}
              </li>
            ))
          }
        </ul>
        <p data-testid="instructions">{instructions}</p>
        {
          linkCopied === true && <p>Link copied!</p>
        }
        <button
          type="button"
          onClick={ () => {
            clipboardCopy(`http://localhost:3000${pathname}`);
            setLinkCopied(true);
          } }
        >
          <img src={ shareIcon } alt="share icon" data-testid="share-btn" />
        </button>
        <button
          type="button"
          onClick={ () => {
            setIsFavorited(!isFavorited);
            addFavoriteRecipe();
          } }
        >
          {
            isFavorited === false ? (
              <img src={ whiteHeart } alt="favorite icon" data-testid="favorite-btn" />
            ) : (
              <img src={ blackHeart } alt="favorite icon" data-testid="favorite-btn" />
            )
          }
        </button>
        {
          path === 'foods' && (
            <iframe
              title={ urlVideo }
              width="420"
              height="315"
              src={ urlVideo }
              data-testid="video"
            />
          )
        }
        <Carousel>
          {
            recomendationCards()
          }
        </Carousel>
        {
          renderButton === true && (
            <button
              type="button"
              className="fixed-bottom"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/${path}/${id}/in-progress`) }
            >
              {
                inProgressRecipe === true ? 'Continue Recipe' : 'Start Recipe'
              }
            </button>
          )
        }
      </>
    );
  };

  return (
    <div>
      {
        recipeDetailsContent()
      }
    </div>
  );
}

export default RecipeDetails;
