import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import MyProvider from '../context/MyProvider';
import userEvent from '@testing-library/user-event';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

describe('The Recipe in Progress page', () => {
  it('contain the correct name of the recipe of drink', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks/15997/in-progress');

    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();
  });

  it('contain the correct name of the recipe of food', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods/52977/in-progress');

    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();
  });

  it('copy the URL of a food correctly', async () => {
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

    history.push('/foods/52977/in-progress');

    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    userEvent.click(shareButton);
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52977');
  });

  it('check and uncheck correctly when the checkbox is clicked in a food page', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods/52977/in-progress');

    const checkbox = await screen.findByTestId('0-checkbox');
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it('changes the favorite food button icon', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods/52977/in-progress');

    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', whiteHeart);
    userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', blackHeart);
  });

  it('finish a recipe correctly', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks/12734/in-progress');

    const checkbox = await screen.findAllByTestId(/-checkbox/i);
    userEvent.click(checkbox[0]);
    userEvent.click(checkbox[1]);
    userEvent.click(checkbox[2]);

    const finishRecipe = await screen.findByTestId('finish-recipe-btn');
    userEvent.click(finishRecipe);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('copy the URL of a drink correctly', async () => {
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

    history.push('/drinks/12734/in-progress');

    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    userEvent.click(shareButton);
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/12734');
  });

  it('changes the favorite drink button icon', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks/12734/in-progress');

    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', whiteHeart);
    userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', blackHeart);
  });

  it('check and uncheck correctly when the checkbox is clicked in a drink page', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks/12734/in-progress');

    const checkbox = await screen.findByTestId('0-checkbox');
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});