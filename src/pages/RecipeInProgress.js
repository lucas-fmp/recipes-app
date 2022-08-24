import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/RecipeInProgress.css';
import clipboardCopy from 'clipboard-copy';

function RecipeInProgress() {
  const history = useHistory();
  const path = history.location.pathname.split('/');
  const typeFood = path[1];
  const id = path[2];
  const [requestedFood, setRequestedFood] = useState([]);
  const [ingredientsFiltreds, setIngredients] = useState([]);
  const [measureFiltreds, setMeasures] = useState([]);
  const [checkedCheckboxes, setCheckedBoxs] = useState([]);
  const [habilitaFinish, setFinish] = useState(true);

  const habilitaButton = () => {
    const array = localStorage.getItem('inProgressRecipes');
    const arrayJsonLength = JSON.parse(array);
    if (arrayJsonLength.length === ingredientsFiltreds.length - 1) {
      setFinish(false);
    } else {
      setFinish(true);
    }
  };
  const returnEndpoint = () => {
    if (typeFood === 'foods') { return (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`); }
    if (typeFood === 'drinks') { return (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`); }
  };
  useEffect(() => {
    async function requestForId() {
      const endpoint = returnEndpoint();
      const response = await fetch(endpoint);
      const data = await response.json();
      if (typeFood === 'foods') {
        setRequestedFood(data.meals);
      }
      if (typeFood === 'drinks') {
        setRequestedFood(data.drinks);
      }
    }
    requestForId();
    const array = localStorage.getItem('inProgressRecipes');
    const arrayParsed = JSON.parse(array);
    if (array === null) {
      setCheckedBoxs([]);
    } else if (array !== null) {
      setCheckedBoxs(arrayParsed);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify([]));
  }, [id]);
  const getIngredients = async () => {
    if (requestedFood[0] === undefined) {
      console.log('sei la');
    } else if (requestedFood[0] !== undefined) {
      const entradas = Object.entries(requestedFood[0]);
      const ingredients = entradas.filter(
        (e) => e[0].includes('strIngredient') && (e[1] !== null && e[1].length > 1),
      );
      const measureIngredie = entradas.filter(
        (e) => e[0].includes('strMeasure') && (e[1] !== null && e[1].length > 0),
      );
      const filterIng = ingredients.map((e) => e[1]);
      const filterMeasure = measureIngredie.map((e) => e[1]);
      setIngredients(filterIng);
      setMeasures(filterMeasure);
    }
  };
  const saveOnClipBoard = () => {
    clipboardCopy(history.location.pathname);
    alert('Link copied!');
  };
  const finalizaRecipe = () => { history.push('/done-recipe'); };
  useEffect(() => {
    getIngredients();
  }, [requestedFood]);
  const checkboxClick = ({ target }) => {
    const itens = document.getElementsByName(target.id);
    if (target.checked === true) {
      itens[0].className = 'cutted';
      if (checkedCheckboxes.includes(target.id)) {
        const removeBox = checkedCheckboxes.filter((e) => e !== target.id);
        setCheckedBoxs(removeBox);
      } else {
        setCheckedBoxs([...checkedCheckboxes, target.id]);
      }
    } else if (target.checked === false) {
      itens[0].className = '';
      const removeBox = checkedCheckboxes.filter((e) => e !== target.id);
      setCheckedBoxs(removeBox);
    }
  };
  const createPage = () => {
    if (ingredientsFiltreds[0] !== undefined) {
      if (typeFood === 'foods') {
        return (
          <div>
            <h2 data-testid="recipe-title">{ requestedFood[0].strMeal }</h2>
            <img
              data-testid="recipe-photo"
              src={ requestedFood[0].strMealThumb }
              alt="foto da comida"
              width="300px"
            />
            <p data-testid="recipe-category">
              {`categoria: ${requestedFood[0].strCategory}`}
            </p>
            <ul>
              {
                ingredientsFiltreds.map(
                  (e, index) => (
                    <li key={ e } data-testid={ `${index}-ingredient-step` }>
                      <input
                        type="checkbox"
                        onChange={ () => habilitaButton() }
                        id={ index }
                        onClick={ (event) => checkboxClick(event) }
                      />
                      <p name={ index } className="">
                        {
                          `${measureFiltreds[index]}, ${e}`
                        }
                      </p>
                    </li>),
                )
              }
            </ul>
            <p data-testid="instructions">{ requestedFood[0].strInstructions }</p>
            <button
              data-testid="share-btn"
              onClick={ () => saveOnClipBoard() }
              type="button"
            >
              Compartilhar
            </button>
            <button
              data-testid="favorite-btn"
              type="button"
            >
              Favoritar
            </button>
            <button
              data-testid="finish-recipe-btn"
              type="button"
              disabled={ habilitaFinish }
              onClick={ () => finalizaRecipe() }
            >
              Finish Recipe
            </button>
          </div>
        );
      } if (typeFood === 'drinks') {
        const verificaAlchool = () => {
          if (requestedFood[0].strAlcoholic === 'Alcoholic') {
            return `${requestedFood[0].strCategory}/Alcoholic`;
          }
          return typeFood;
        };
        return (
          <div>
            <h2 data-testid="recipe-title">{ requestedFood[0].strDrink }</h2>
            <img
              data-testid="recipe-photo"
              src={ requestedFood[0].strDrinkThumb }
              alt="foto da bebida"
              width="300px"
            />
            <p data-testid="recipe-category">{`categoria: ${verificaAlchool()}`}</p>
            <ul>
              {
                ingredientsFiltreds.map(
                  (e, index) => (
                    <li key={ index } data-testid={ `${index}-ingredient-step` }>
                      <input
                        type="checkbox"
                        onChange={ () => habilitaButton() }
                        id={ index }
                        onClick={ (event) => checkboxClick(event) }
                      />
                      <p name={ index }>
                        {`${measureFiltreds[index]}, ${e}`}
                      </p>
                    </li>
                  ),
                )
              }
            </ul>
            <p data-testid="instructions">{requestedFood[0].strInstructions}</p>
            <button
              data-testid="share-btn"
              type="button"
              onClick={ () => saveOnClipBoard() }
            >
              Compartilhar
            </button>
            <button
              data-testid="favorite-btn"
              type="button"
            >
              Favoritar
            </button>
            <button
              data-testid="finish-recipe-btn"
              type="button"
              disabled={ habilitaFinish }
              onClick={ () => finalizaRecipe() }
            >
              Finish Recipe
            </button>
          </div>
        );
      }
    }
  };
  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(checkedCheckboxes));
  }, [checkedCheckboxes]);
  useEffect(() => {
    const checks = localStorage.getItem('inProgressRecipes');
    const arrayJson = JSON.parse(checks);
    if (arrayJson[0] !== undefined || arrayJson[0] !== null) {
      arrayJson.forEach((e) => {
        const item = document.getElementById(e);
        item.checked = true;
      });
    }
  }, [ingredientsFiltreds]);

  return (
    <div>
      { createPage() }
    </div>
  );
}
export default RecipeInProgress;
