import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Recipes from './pages/Recipes';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route path="/foods" component={ Recipes } />
      <Route path="/drinks" component={ Recipes } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
