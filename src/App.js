import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/foods" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route path="/foods/{id-da-receita}" />
      <Route path="/drinks/{id-da-receita}" />
      <Route exact path="/" component={ Login } />
      <Route path="/foods/{id-da-receita}/in-progress" />
      <Route path="/drinks/{id-da-receita}/in-progress" />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/foods/52772/in-progress" component={ RecipeInProgress } />
    </Switch>
  );
}

export default App;
