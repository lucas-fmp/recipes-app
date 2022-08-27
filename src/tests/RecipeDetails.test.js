import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import MyProvider from '../context/MyProvider';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import userEvent from '@testing-library/user-event';

describe('The Recipes Details page', () => {
  it('contain 6 recomendation cards of foods', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks/17222');

    const recomendationCards = await screen.findAllByTestId(/-recomendation-card/i);
    expect(recomendationCards).toHaveLength(6);
  });

  it('contain 6 recomendation cards of drinks', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods/52977');

    const recomendationCards = await screen.findAllByTestId(/-recomendation-card/i);
    expect(recomendationCards).toHaveLength(6);
  })

  it('changes the favorite button icon', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods/52977');

    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', whiteHeart);
    userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', blackHeart);
  });

  it('start a recipe correctly', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods/52977');

    const startButton = await screen.findByTestId('start-recipe-btn');
    expect(startButton).toBeInTheDocument();
    userEvent.click(startButton);
    expect(history.location.pathname).toBe('/foods/52977/in-progress');
  });

  it('copy the text correctly', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    history.push('/foods/52977');

    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    userEvent.click(shareButton);
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52977');
  });
});