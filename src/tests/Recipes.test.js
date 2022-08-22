import Recipes from "../pages/Recipes";
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import MyProvider from '../context/MyProvider';

describe('The Recipes page', () => {
  it('on the foods page, should have 12 cards', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods');

    const cards = await screen.findAllByTestId(/recipe-card/i);
    expect(cards).toHaveLength(12);
  });

  it('on the drinks page, should have 12 cards', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks');

    const cards = await screen.findAllByTestId(/recipe-card/i);
    expect(cards).toHaveLength(12);
  });

  it('should redirect to the details page when a meal was clicked', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods');

    const mealCard = await screen.findByTestId('0-card-img');
    userEvent.click(mealCard);
    expect(history.location.pathname).toBe('/foods/52977');
  });

  it('should redirect to the details page when a drink was clicked', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks');

    const drinkCard = await screen.findByTestId('0-card-img');
    userEvent.click(drinkCard)
    expect(history.location.pathname).toBe('/drinks/15997');
  });

  it('should have 6 button filters', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods');

    const filterButtons = await screen.findAllByTestId(/category-filter/i);
    expect(filterButtons).toHaveLength(6);
  });

  it('should filter a meal when a filter button is clicked', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods');

    const filterButton = await screen.findByTestId('Chicken-category-filter');
    userEvent.click(filterButton);
    const recipe = await screen.findByAltText(/ayam percik/i);
    expect(recipe).toBeInTheDocument();

    userEvent.click(filterButton);
    expect(recipe).not.toBeInTheDocument();

    const filterButtonAll = await screen.findByTestId('All-category-filter');
    userEvent.click(filterButtonAll);
    expect(await screen.findByAltText(/corba/i)).toBeInTheDocument();
  });

  it('should filter a drink when a filter button is clicked', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks');

    const filterButton = await screen.findByTestId('Cocktail-category-filter');
    userEvent.click(filterButton);
    const recipe = await screen.findByAltText(/155 belmont/i);
    expect(recipe).toBeInTheDocument();

    userEvent.click(filterButton);
    expect(recipe).not.toBeInTheDocument();
  });

})