import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import MyProvider from '../context/MyProvider';

describe('The Recipes Details page', () => {
  it('', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks/17222');

    const recomendationCards = await screen.findAllByTestId(/-recomendation-card/i);
    expect(recomendationCards).toHaveLength(6);
  });

  it('', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods/52977');

    const recomendationCards = await screen.findAllByTestId(/-recomendation-card/i);
    expect(recomendationCards).toHaveLength(6);
  })

  it('', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods/52977');

    const favoriteButton = await screen.findByTestId(/favorite-btn/i);
    expect(favoriteButton).toBeInTheDocument()
  })
});