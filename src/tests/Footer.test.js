import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { screen } from '@testing-library/react';
import MyProvider from '../context/MyProvider';

describe('Footer Component', () => {
 
  it('Should render the Footer on the Recipes/foods page', () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods');

    const drink = screen.getByTestId('drinks-bottom-btn');
    const food = screen.getByTestId('food-bottom-btn');

    expect(drink).toBeDefined();
    expect(food).toBeDefined();

    userEvent.click(drink);
    expect(history.location.pathname).toBe('/drinks');
    userEvent.click(food);
    expect(history.location.pathname).toBe('/foods');    
  })

  it('Should render the Footer on the Recipes/drinks page', () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks');

    const drink = screen.getByTestId('drinks-bottom-btn');
    const food = screen.getByTestId('food-bottom-btn');

    expect(drink).toBeDefined();
    expect(food).toBeDefined();

    userEvent.click(drink);
    expect(history.location.pathname).toBe('/drinks');
    userEvent.click(food);
    expect(history.location.pathname).toBe('/foods');    
  })

  it('Should render the Footer on the Profile page', () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/profile');

    const drink = screen.getByTestId('drinks-bottom-btn');
    const food = screen.getByTestId('food-bottom-btn');

    expect(drink).toBeDefined();
    expect(food).toBeDefined();

    userEvent.click(drink);
    expect(history.location.pathname).toBe('/drinks');
  })  
  
});
