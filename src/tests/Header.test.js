import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import MyProvider from '../context/MyProvider';

describe ('testes do Header e SearchBar', () => {
  test('se o header tem tudo e se a pesquisa por letra funciona', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, 'senhateste');
    userEvent.click(submitButton);

    const title = screen.getAllByRole('heading', { name: /foods/i });
    expect(title).toBeDefined();

    const profileBUtton = screen.getByTestId(/profile-top-btn/i);
    expect(profileBUtton).toBeDefined();

    const showSearchBar = screen.getByTestId(/search-top-btn/i);
    expect(showSearchBar).toBeDefined();

    userEvent.click(showSearchBar);
    const SearchBar = screen.getByTestId(/search-input/i);
    expect(SearchBar).toBeDefined();

    const radioIngredient = screen.getByTestId(/ingredient-search-radio/i);
    const radioName = screen.getByTestId(/name-search-radio/i);
    const radioLetter = screen.getByTestId(/first-letter-search-radio/i);
    expect(radioIngredient).toBeDefined();
    expect(radioName).toBeDefined();
    expect(radioLetter).toBeDefined();

    const searchButton = screen.getByTestId(/exec-search-btn/i);
    expect(searchButton).toBeDefined();

    userEvent.click(radioLetter);
    userEvent.type('p', SearchBar);
    userEvent.click(searchButton);

    const mealCard = await screen.findByTestId('0-card-img');
    expect(mealCard).toBeDefined();
  })
})

test('botão da pagina de perfil', () => {
  const { history } = renderWithRouter(
    <MyProvider>
      <App />
    </MyProvider>
  );

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitButton = screen.getByTestId('login-submit-btn');

  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, 'senhateste');
  userEvent.click(submitButton);

  const profileButton = screen.getByTestId(/profile-top-btn/i)
  userEvent.click(profileButton)
  expect(history.location.pathname).toBe('/profile')
})

test('pesquisa por nome', async () => {
  const { history } = renderWithRouter(
    <MyProvider>
      <App />
    </MyProvider>
  );

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitButton = screen.getByTestId('login-submit-btn');

  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, 'senhateste');
  userEvent.click(submitButton);

  const showSearchBar = screen.getByTestId(/search-top-btn/i);

  userEvent.click(showSearchBar);
  const SearchBar = screen.getByTestId(/search-input/i);

  const radioName = screen.getByTestId(/name-search-radio/i);

  const searchButton = screen.getByTestId(/exec-search-btn/i);

  userEvent.click(radioName);
  userEvent.type('Chicken', SearchBar);
  userEvent.click(searchButton);

  const meal = await screen.findByTestId('0-card-img');
  expect(meal).toBeDefined();
})

test('pesquisa pelo Ingrediente', async () => {
  const { history } = renderWithRouter(
    <MyProvider>
      <App />
    </MyProvider>
  );

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitButton = screen.getByTestId('login-submit-btn');

  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, 'senhateste');
  userEvent.click(submitButton);

  const showSearchBar = screen.getByTestId(/search-top-btn/i);

  userEvent.click(showSearchBar);
  const SearchBar = screen.getByTestId(/search-input/i);

  const radioIngredient = screen.getByTestId(/ingredient-search-radio/i);

  const searchButton = screen.getByTestId(/exec-search-btn/i);

  userEvent.click(radioIngredient);
  userEvent.type('pepper', SearchBar);
  userEvent.click(searchButton);

  const mealCard = await screen.findByTestId('0-card-img');
  expect(mealCard).toBeDefined();
})

test('pagina de drinks por ingredientes', async () => {
  const { history } = renderWithRouter(
    <MyProvider>
      <App />
    </MyProvider>
  );

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitButton = screen.getByTestId('login-submit-btn');

  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, 'senhateste');
  userEvent.click(submitButton);

  const drinkLink = screen.getByTestId(/drinks-bottom-btn/i)
  userEvent.click(drinkLink);

  const showSearchBar = screen.getByTestId(/search-top-btn/i);
  userEvent.click(showSearchBar);

  const SearchBar = screen.getByTestId(/search-input/i);

  const radioIngredient = screen.getByTestId(/ingredient-search-radio/i);

  const searchButton = screen.getByTestId(/exec-search-btn/i);

  userEvent.click(radioIngredient);
  userEvent.type('lemon', SearchBar);
  userEvent.click(searchButton);

  const meal = await screen.findByTestId('0-card-img');
  expect(meal).toBeDefined();
})