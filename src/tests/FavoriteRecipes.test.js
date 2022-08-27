import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import MyProvider from '../context/MyProvider';
import userEvent from '@testing-library/user-event';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

describe('The Favorite Recipes page', () => {
  it('contain the expected fields', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods/52977');

    const favoriteButton = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteButton);

    history.push('/favorite-recipes');

    const img = await screen.findByTestId('0-horizontal-image');
    expect(img).toBeInTheDocument();

    const filterByDrinkBtn = await screen.findByTestId('filter-by-drink-btn');
    userEvent.click(filterByDrinkBtn);
    expect(img).not.toBeInTheDocument();

    const filterByFoodBtn = await screen.findByTestId('filter-by-food-btn');
    expect(filterByFoodBtn).toBeInTheDocument();
    userEvent.click(filterByFoodBtn);

    const allBtn = await screen.findByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
  });

  it('unfavorite a food recipe correctly', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/favorite-recipes');

    const img = await screen.findByTestId('0-horizontal-image');
    expect(img).toBeInTheDocument();

    const favoriteButton = await screen.findByTestId('0-horizontal-favorite-btn');

    userEvent.click(favoriteButton);
    expect(img).not.toBeInTheDocument();
  });

  it('copy a food recipe path correctly', async () => {
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

    const favoriteButton = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteButton);

    history.push('/favorite-recipes');

    const shareButton = await screen.findByTestId('0-horizontal-share-btn')
    expect(shareButton).toBeInTheDocument();
    userEvent.click(shareButton);
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52977');
  });

  it('unfavorite a drink recipe correctly', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks/15997');

    const favoriteButton = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteButton);

    history.push('/favorite-recipes');

    const img = await screen.findByTestId('1-horizontal-image');
    expect(img).toBeInTheDocument();

    const specificFavoriteButton = await screen.findByTestId('1-horizontal-favorite-btn');

    userEvent.click(specificFavoriteButton);
    expect(img).not.toBeInTheDocument();
  });

  it('copy a drink recipe path correctly', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks/15997');

    const favoriteButton = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteButton);

    history.push('/favorite-recipes');

    const shareButton = await screen.findByTestId('1-horizontal-share-btn')
    expect(shareButton).toBeInTheDocument();
    userEvent.click(shareButton);
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/15997');
  });
});