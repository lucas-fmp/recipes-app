import Recipes from "../pages/Recipes";
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('The Recipes page', () => {
  it('should have 6 buttons', () => {
    render(<Recipes />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(6);
  })
})