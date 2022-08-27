import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import MyProvider from '../context/MyProvider';
import userEvent from '@testing-library/user-event';

describe('The Recipe in Progress page', () => {
  it('contain 6 recomendation cards of foods', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    history.push('/drinks/15997/in-progress');

    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();
  })
})