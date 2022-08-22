import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route path="/foods" />
      <Route path="/drinks" />
      <Route path="foods{id-da-receita}" />
      <Route path="/drinks/{id-da-receita}" />
      <Route path="/foods/{id-da-receita}/in-progress" />
      <Route path="/drinks/{id-da-receita}/in-progress" />
      <Route path="/profile" />
      <Route path="/done-recipes" />
      <Route path="/favorite-recipes" />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
