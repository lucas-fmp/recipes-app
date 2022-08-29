import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import MyProvider from '../context/MyProvider';
import { wait } from '@testing-library/user-event/dist/utils';

describe ('testes do Header e SearchBar', () => {
  it('send to the profile page when the profile button is clicked', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods');

    const profileBtn = await screen.findByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
  })

  it('redirect to the food detail page when only 1 recipe is filtered', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods');

    const searchIcon = await screen.findByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const nameRadio = await screen.findByText(/Name/i);
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);

    const inputText = await screen.findByTestId('search-input');
    expect(inputText).toBeInTheDocument();
    userEvent.type(inputText, 'Vegan Lasagna');

    const searchBtn = await screen.findByTestId('exec-search-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const recipePhoto = await screen.findByTestId('recipe-photo');

    expect(recipePhoto).toBeInTheDocument();
  });

  it('redirect to the drink detail page when only 1 recipe is filtered', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks');

    const searchIcon = await screen.findByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const nameRadio = await screen.findByText(/Name/i);
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);

    const inputText = await screen.findByTestId('search-input');
    expect(inputText).toBeInTheDocument();
    userEvent.type(inputText, 'ABC');

    const searchBtn = await screen.findByTestId('exec-search-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const recipePhoto = await screen.findByTestId('recipe-photo');

    expect(recipePhoto).toBeInTheDocument();
  });

  it('redirect to the food detail page when only 1 recipe is filtered', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods');

    const searchIcon = await screen.findByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const nameRadio = await screen.findByText(/Name/i);
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);

    const inputText = await screen.findByTestId('search-input');
    expect(inputText).toBeInTheDocument();
    userEvent.type(inputText, 'Vegan Lasagna');

    const searchBtn = await screen.findByTestId('exec-search-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const recipePhoto = await screen.findByTestId('recipe-photo');

    expect(recipePhoto).toBeInTheDocument();
  });

  it('search foods by ingredient correctly', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods');

    const searchIcon = await screen.findByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const radio = await screen.findByText(/ingredient/i);
    expect(radio).toBeInTheDocument();
    userEvent.click(radio);

    const inputText = await screen.findByTestId('search-input');
    expect(inputText).toBeInTheDocument();
    userEvent.type(inputText, 'egg');

    const searchBtn = await screen.findByTestId('exec-search-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const cardName = await screen.findByText('Beef Lo Mein')

    expect(cardName).toBeInTheDocument();
  });

  it('search foods by first letter correctly', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods');

    const searchIcon = await screen.findByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const radio = await screen.findByText(/First Letter/i);
    expect(radio).toBeInTheDocument();
    userEvent.click(radio);

    const inputText = await screen.findByTestId('search-input');
    expect(inputText).toBeInTheDocument();
    userEvent.type(inputText, 'l');

    const searchBtn = await screen.findByTestId('exec-search-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const cardName = await screen.findByText('Lamb tomato and sweet spices')

    expect(cardName).toBeInTheDocument();
  });

  it('search drinks by ingredient correctly', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks');

    const searchIcon = await screen.findByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const radio = await screen.findByText(/ingredient/i);
    expect(radio).toBeInTheDocument();
    userEvent.click(radio);

    const inputText = await screen.findByTestId('search-input');
    expect(inputText).toBeInTheDocument();
    userEvent.type(inputText, 'water');

    const searchBtn = await screen.findByTestId('exec-search-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const cardName = await screen.findByText('Adam Sunrise')

    expect(cardName).toBeInTheDocument();
  });

  it('search drinks by first letter correctly', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks');

    const searchIcon = await screen.findByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const radio = await screen.findByText(/First Letter/i);
    expect(radio).toBeInTheDocument();
    userEvent.click(radio);

    const inputText = await screen.findByTestId('search-input');
    expect(inputText).toBeInTheDocument();
    userEvent.type(inputText, 'w');

    const searchBtn = await screen.findByTestId('exec-search-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const cardName = await screen.findByText('Whisky Mac')

    expect(cardName).toBeInTheDocument();
  });

  it('shows an alert when no foods is found', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/foods');

    const searchIcon = await screen.findByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const nameRadio = await screen.findByText(/Name/i);
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);

    const inputText = await screen.findByTestId('search-input');
    expect(inputText).toBeInTheDocument();
    userEvent.type(inputText, 'xablau');

    const searchBtn = await screen.findByTestId('exec-search-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    // Não consegui testar o alert
  });
})
