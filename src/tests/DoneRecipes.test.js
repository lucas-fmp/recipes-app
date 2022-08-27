import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import MyProvider from '../context/MyProvider';

describe('The Done Recipes page', () => {
  it('', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks/17222');

    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();
    userEvent.click(startRecipeBtn);

    const checkboxs = await screen.findAllByTestId(/-checkbox/i);
    userEvent.click(checkboxs[0]);
    userEvent.click(checkboxs[1]);
    userEvent.click(checkboxs[2]);
    userEvent.click(checkboxs[3]);
    
    const finishRecipeBtn = await screen.findByTestId('finish-recipe-btn');
    userEvent.click(finishRecipeBtn);

    const img = await screen.findByTestId('0-horizontal-image');
    expect(img).toBeInTheDocument();

    const filterByFoodBtn = await screen.findByTestId('filter-by-food-btn');
    userEvent.click(filterByFoodBtn);
    expect(img).not.toBeInTheDocument();

    const filterByDrinkBtn = await screen.findByTestId('filter-by-drink-btn');
    expect(filterByDrinkBtn).toBeInTheDocument();
    userEvent.click(filterByDrinkBtn);

    const allBtn = await screen.findByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
  });
});