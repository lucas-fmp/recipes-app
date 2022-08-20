import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Switch>
      <Route path="/foods" component={ Recipes } />
      <Route path="/drinks" component={ Recipes } />
    </Switch>
  );
}

export default App;
