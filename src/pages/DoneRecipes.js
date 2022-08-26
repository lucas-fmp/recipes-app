import React, { useContext, useEffect, useState } from 'react';
import CardDoneRecipes from '../components/CardDoneRecipes';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function DoneRecipes() {
  const { setTitle, setShowHeader, setSearch } = useContext(MyContext);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));

  const handleFiltersBtn = ({ target }) => {
    const { name } = target;
    setDoneRecipes(doneRecipesList);
    if (name !== 'all') {
      const typeRecipes = doneRecipes.filter((recipe) => recipe.type === name);
      setDoneRecipes(typeRecipes);
    }
  };

  useEffect(() => {
    setShowHeader(true);
    setTitle('Done Recipes');
    setSearch(false);
    setDoneRecipes(doneRecipesList);
  }, []);

  return (
    <div>
      {console.log(doneRecipes)}
      {console.log(doneRecipesList)}

      <Header />
      <div>
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          onClick={ (event) => {
            handleFiltersBtn(event);
            console.log(event.target.name);
          } }
        >
          All
        </button>

        <button
          type="button"
          name="food"
          data-testid="filter-by-food-btn"
          onClick={ (event) => {
            handleFiltersBtn(event);
            console.log(event.target.name);
          } }
        >
          Food
        </button>

        <button
          type="button"
          name="drink"
          data-testid="filter-by-drink-btn"
          onClick={ (event) => {
            handleFiltersBtn(event);
            console.log(event.target.name);
          } }
        >
          Drinks
        </button>
      </div>
      <CardDoneRecipes doneRecipes={ doneRecipes } />
    </div>
  );
}

export default DoneRecipes;
