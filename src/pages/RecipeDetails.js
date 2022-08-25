import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import {
  requestAllDrinks, requestAllFoods, requestDrinkById, requestFoodById,
} from '../helpers/requestAPI';
import {
  verifyingDoneRecipes, verifyingFavoriteRecipes, verifyingInProgressRecipes,
} from '../helpers/verifyLocalStorage';
import '../styles/recipeDetails.css';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const pathWithBars = pathname.replace(/[0-9]/g, ''); // Substitui o que é número por uma string vazia;
  const path = pathWithBars.replace(/[/]/g, ''); // Substitui as barras por string vazia;
  const id = pathname.replace(/\D/g, ''); // Substitui o que não é número por uma string vazia;
  const maxRecipes = 6;

  const {
    recipeData, setRecipeData, recomendationRecipes,
    setRecomendationRecipes, urlVideo, setUrlVideo,
  } = useContext(MyContext);

  const [linkCopied, setLinkCopied] = useState(false);
  const [renderButton, setRenderButton] = useState(true);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      if (path === 'foods') {
        const dataFood = await requestFoodById(id);
        const dataDrinks = await requestAllDrinks();
        setRecipeData(dataFood);
        setUrlVideo(dataFood.strYoutube.replace('watch?v=', 'embed/ '));
        setRecomendationRecipes(dataDrinks.slice(0, maxRecipes));
      }

      if (path === 'drinks') {
        const dataDrink = await requestDrinkById(id);
        const dataFoods = await requestAllFoods();
        setRecipeData(dataDrink);
        setRecomendationRecipes(dataFoods.slice(0, maxRecipes));
      }
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const verifyLocalStorage = () => {
      setRenderButton(verifyingDoneRecipes(id));
      setInProgressRecipe(verifyingInProgressRecipes(id, path));
      setIsFavorited(verifyingFavoriteRecipes(id));
    };
    verifyLocalStorage();
  }, [recipeData]);

  const recomendationCards = () => {
    if (path === 'foods') {
      return (
        recomendationRecipes.map((recomendation, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              src={ recomendation.strDrinkThumb }
              alt={ recomendation.strDrink }
              width={ 180 }
            />
            <h4
              data-testid={ `${index}-recomendation-title` }
            >
              {recomendation.strDrink}
            </h4>
            <p>{recomendation.strAlcoholic}</p>
          </div>
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
              width={ 180 }
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
        <img src={ thumb } data-testid="recipe-photo" alt={ name } width={ 400 } />
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
        <div className="recomendations-container">
          <div className="teste">
            {
              recomendationCards()
            }
          </div>
        </div>
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
